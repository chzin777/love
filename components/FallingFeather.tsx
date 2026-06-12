'use client';

import { useEffect, useState } from 'react';

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
          {/* Silhueta de pena (pluma de ganso), branca */}
          <svg
            className="feather-svg"
            width="80"
            height="150"
            viewBox="0 0 120 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pluma */}
            <path
              d="M60 6
                 C 84 40, 98 86, 90 128
                 C 86 150, 75 166, 63 176
                 L 63 214
                 L 57 214
                 L 57 176
                 C 45 166, 34 150, 30 128
                 C 22 86, 36 40, 60 6 Z"
              fill="white"
            />
            {/* Haste central, leve sombra para dar profundidade */}
            <path
              d="M60 18 L60 176"
              stroke="rgba(0,0,0,0.10)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Barbas: pequenas separacoes diagonais */}
            <g stroke="rgba(0,0,0,0.08)" strokeWidth="1.4" strokeLinecap="round">
              <path d="M60 40 L42 54" />
              <path d="M60 40 L78 54" />
              <path d="M60 64 L38 80" />
              <path d="M60 64 L82 80" />
              <path d="M60 90 L36 106" />
              <path d="M60 90 L84 106" />
              <path d="M60 116 L40 130" />
              <path d="M60 116 L80 130" />
              <path d="M60 140 L46 152" />
              <path d="M60 140 L74 152" />
            </g>
          </svg>
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