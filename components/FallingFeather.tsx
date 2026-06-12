'use client';

import { useEffect, useState } from 'react';

// Pena desenhada com haste + barbas varridas para a ponta (nao parece folha)
function FeatherShape() {
  const cx = 60;
  const topY = 22; // ponta
  const vaneBottom = 182; // fim das barbas
  const quillBottom = 236; // fim do calamo
  const maxLen = 36;

  const barbs: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let y = topY + 6; y <= vaneBottom; y += 4.5) {
    const p = (y - topY) / (vaneBottom - topY); // 0 ponta -> 1 base
    const len = maxLen * Math.pow(Math.sin(Math.min(p, 1) * Math.PI), 0.6);
    const upY = y - len * 0.55; // varre em direcao a ponta
    barbs.push({ x1: cx, y1: y, x2: cx - len, y2: upY });
    barbs.push({ x1: cx, y1: y, x2: cx + len, y2: upY });
  }

  return (
    <svg
      className="feather-svg"
      width="80"
      height="160"
      viewBox="0 0 120 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="white" strokeLinecap="round">
        {/* Barbas */}
        <g strokeWidth="1.6">
          {barbs.map((b, i) => (
            <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
          ))}
        </g>
        {/* Haste + calamo */}
        <line x1={cx} y1={topY} x2={cx} y2={quillBottom} strokeWidth="2.6" />
      </g>
    </svg>
  );
}

interface FeatherProps {
  onComplete?: () => void;
}

export default function FallingFeather({ onComplete }: FeatherProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Remove a pena após a animação
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 6000); // 6 segundos de animação

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Pena caindo */}
      <div className="feather-container">
        <div className="feather">
          <FeatherShape />
        </div>
      </div>

      <style jsx>{`
        .feather-container {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          animation: fall 6s ease-in-out forwards;
        }

        .feather {
          animation: sway 2s ease-in-out infinite alternate, rotate 4s linear infinite;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }

        .feather-svg {
          animation: flutter 0.8s ease-in-out infinite alternate;
        }

        @keyframes fall {
          0% {
            top: -100px;
            left: 50%;
          }
          25% {
            top: 20vh;
            left: 45%;
          }
          50% {
            top: 40vh;
            left: 55%;
          }
          75% {
            top: 60vh;
            left: 40%;
          }
          100% {
            top: 100vh;
            left: 50%;
            opacity: 0;
          }
        }

        @keyframes sway {
          0% {
            transform: translateX(-15px) rotate(-5deg);
          }
          100% {
            transform: translateX(15px) rotate(5deg);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes flutter {
          0% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            transform: scale(1.05) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}