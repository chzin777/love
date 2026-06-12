'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import CountUp from './CountUp';
import Reveal from './Reveal';
import { useStoryActive } from './Stories';

const START = new Date('2025-04-08T00:00:00');

// Componente isolado: dono do seu próprio intervalo de 1s.
// Mantém o re-render por segundo aqui dentro, sem repintar a página toda.
export default function TogetherCounter() {
  const [clock, setClock] = useState('');
  const [days, setDays] = useState(0);
  const active = useStoryActive();

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - START.getTime();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      const p = (n: number) => n.toString().padStart(2, '0');
      setClock(`${p(h)}:${p(m)}:${p(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Reveal className="mt-8 w-full max-w-sm">
      <p className="text-center font-script text-3xl sm:text-4xl text-red-200 mb-5 leading-tight">
        NOSSO AMOR É PAPO DE UMDAIA!
      </p>
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 w-full border border-white/10 shadow-2xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-3 font-serif-display">Juntos há</h3>
          <div className="flex items-end justify-center gap-2 mb-1">
            {days > 0 && (
              <CountUp
                to={days}
                duration={2.2}
                separator="."
                startWhen={active}
                className="text-white font-sans font-bold text-6xl tabular-nums leading-none"
              />
            )}
            <span className="text-red-200/80 text-lg font-semibold mb-1">dias</span>
          </div>
          <p className="text-red-300/90 text-lg font-mono tracking-wide mt-2">{clock}</p>
          <p className="text-gray-400 text-xs mt-3 inline-flex items-center gap-1">Desde 8 de abril de 2025 <Heart className="w-3 h-3 text-red-400 fill-red-400" /></p>
        </div>
      </div>
    </Reveal>
  );
}
