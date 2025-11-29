'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  color: string;
  duration: number;
}

export default function PetalEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetal = () => {
      const newPetal: Petal = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50, // Começar acima da tela
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 0.6 + Math.random() * 0.4,
        color: ['#ff6b9d', '#ffa8cc', '#ff9999', '#ffb3ba', '#ff8fa3'][Math.floor(Math.random() * 5)],
        duration: 4 + Math.random() * 3 // 4-7 segundos para cair
      };
      
      setPetals(prev => [...prev, newPetal]);
      
      // Remove a pétala após sua duração
      setTimeout(() => {
        setPetals(prev => prev.filter(p => p.id !== newPetal.id));
      }, newPetal.duration * 1000);
    };

    // Criar pétalas continuamente
    const interval = setInterval(() => {
      createPetal();
    }, 800 + Math.random() * 1200); // A cada 0.8-2 segundos

    // Criar algumas pétalas iniciais
    for (let i = 0; i < 5; i++) {
      setTimeout(createPetal, i * 500);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-continuous-fall"
          style={{
            left: petal.x,
            top: petal.y,
            transform: `rotate(${petal.rotation}deg) scale(${petal.scale})`,
            opacity: petal.opacity,
            color: petal.color,
            animationDuration: `${petal.duration}s`,
            fontSize: '20px'
          }}
        >
          🌸
        </div>
      ))}
      
      <style jsx>{`
        .animate-continuous-fall {
          animation: continuousPetalFall ease-in-out forwards;
          filter: drop-shadow(0 0 4px rgba(255, 182, 193, 0.5));
        }
        
        @keyframes continuousPetalFall {
          0% {
            transform: rotate(0deg) translateY(-50px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: rotate(90deg) translateY(25vh) translateX(-20px);
          }
          50% {
            transform: rotate(180deg) translateY(50vh) translateX(15px);
          }
          75% {
            transform: rotate(270deg) translateY(75vh) translateX(-10px);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) translateY(100vh) translateX(5px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}