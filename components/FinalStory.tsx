'use client';

import { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { useStoryActive } from './Stories';

interface Drop {
  id: number;
  num: number;
  left: number;
  delay: number;
  dur: number;
  size: number;
  rot: number;
}

export default function FinalStory({ photos }: { photos: number[] }) {
  const active = useStoryActive();
  const [phase, setPhase] = useState<'text' | 'rain'>('text');

  useEffect(() => {
    if (!active) {
      setPhase('text');
      return;
    }
    const t = setTimeout(() => setPhase('rain'), 2600);
    return () => clearTimeout(t);
  }, [active]);

  // Chuva contínua: vários pingos ciclando todas as fotos
  const drops = useMemo<Drop[]>(() => {
    const count = Math.max(36, photos.length * 3);
    const list: Drop[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        num: photos[i % photos.length],
        left: Math.random() * 96,
        delay: Math.random() * 6,
        dur: 5 + Math.random() * 5,
        size: 56 + Math.random() * 70,
        rot: -22 + Math.random() * 44,
      });
    }
    return list;
  }, [photos]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Texto */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-1000 ${
          phase === 'rain' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-script text-4xl sm:text-6xl text-red-200 mb-3">Te amo, hoje e sempre</p>
        <p className="text-white/40 text-xs inline-flex items-center gap-1">
          Feito com <Heart className="heartbeat w-3.5 h-3.5 text-red-500 fill-red-500" /> só para você
        </p>
      </div>

      {/* Chuva de fotos */}
      {phase === 'rain' && (
        <div className="absolute inset-0">
          {drops.map((d) => (
            <img
              key={d.id}
              src={`/images/${d.num}.jpeg`}
              alt=""
              className="photo-drop absolute rounded-xl object-cover shadow-2xl border border-white/15"
              style={{
                left: `${d.left}%`,
                width: d.size,
                height: d.size,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.dur}s`,
                ['--r' as string]: `${d.rot}deg`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .photo-drop {
          top: -160px;
          opacity: 0;
          animation-name: photoFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes photoFall {
          0% {
            transform: translateY(0) rotate(var(--r));
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(calc(var(--r) * -1));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
