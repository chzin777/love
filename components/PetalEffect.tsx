'use client';

import { useEffect, useState } from 'react';

// Girassol desenhado em SVG (sem emoji)
function Sunflower() {
  const petals = Array.from({ length: 12 });
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 3px rgba(250, 204, 21, 0.5))' }}>
      <g transform="translate(12 12)">
        {petals.map((_, i) => (
          <ellipse
            key={i}
            rx="2.1"
            ry="5"
            cy="-6"
            fill="#facc15"
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle r="4" fill="#7c2d12" />
        <circle r="2.4" fill="#a16207" />
      </g>
    </svg>
  );
}

interface Petal {
  id: number;
  x: number;
  scale: number;
  opacity: number;
  drift: number;
  tilt: number;
  duration: number;
}

export default function PetalEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetal = () => {
      const newPetal: Petal = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.5 + Math.random() * 0.4,
        drift: -20 + Math.random() * 40, // leve deriva horizontal
        tilt: -8 + Math.random() * 16, // pequena inclinacao
        duration: 9 + Math.random() * 5, // 9-14s, queda lenta
      };

      setPetals(prev => [...prev, newPetal]);

      setTimeout(() => {
        setPetals(prev => prev.filter(p => p.id !== newPetal.id));
      }, newPetal.duration * 1000);
    };

    // Poucos girassois: novo a cada ~3-4.5s
    const interval = setInterval(() => {
      createPetal();
    }, 3000 + Math.random() * 1500);

    // Alguns iniciais espalhados
    for (let i = 0; i < 3; i++) {
      setTimeout(createPetal, i * 1500);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute rain-fall"
          style={{
            left: petal.x,
            top: -40,
            opacity: petal.opacity,
            animationDuration: `${petal.duration}s`,
            ['--drift' as string]: `${petal.drift}px`,
            ['--tilt' as string]: `${petal.tilt}deg`,
          }}
        >
          <div style={{ transform: `scale(${petal.scale})` }}>
            <Sunflower />
          </div>
        </div>
      ))}

      <style jsx>{`
        .rain-fall {
          animation-name: rainFall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        @keyframes rainFall {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            transform: translateY(108vh) translateX(var(--drift)) rotate(var(--tilt));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}