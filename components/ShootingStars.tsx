'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStar = () => {
      const newStar: Star = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.4), // Só na parte superior
        size: 1 + Math.random() * 2,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2
      };
      
      setStars(prev => [...prev, newStar]);
      
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== newStar.id));
      }, (newStar.duration + newStar.delay) * 1000);
    };

    // Criar uma estrela a cada 3-8 segundos
    const interval = setInterval(() => {
      createStar();
    }, 3000 + Math.random() * 5000);

    // Criar algumas estrelas iniciais
    setTimeout(createStar, 1000);
    setTimeout(createStar, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shooting-star"
          style={{
            left: star.x,
            top: star.y,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            fontSize: `${star.size}px`,
          }}
        >
          ⭐
        </div>
      ))}
      
      <style jsx>{`
        .animate-shooting-star {
          animation: shootingStar linear forwards;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
        }
        
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px) translateY(100px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}