'use client';

import { useEffect, useState } from 'react';
import { Feather } from 'lucide-react';

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
          <Feather
            className="feather-svg"
            width={90}
            height={90}
            color="white"
            strokeWidth={1.5}
          />
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