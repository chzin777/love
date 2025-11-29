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
          {/* SVG da pena baseado na imagem */}
          <svg 
            width="80" 
            height="120" 
            viewBox="0 0 40 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="feather-svg"
          >
            {/* Haste central */}
            <line 
              x1="20" 
              y1="5" 
              x2="20" 
              y2="55" 
              stroke="white" 
              strokeWidth="1"
              opacity="0.9"
            />
            
            {/* Fibras da pena - lado esquerdo */}
            <path
              d="M20 10 Q15 12 12 15 Q14 16 16 17 Q18 16 20 15"
              fill="white"
              opacity="0.8"
            />
            <path
              d="M20 15 Q14 17 10 21 Q12 22 15 23 Q18 21 20 20"
              fill="white"
              opacity="0.7"
            />
            <path
              d="M20 20 Q13 22 8 27 Q11 28 14 29 Q17 27 20 25"
              fill="white"
              opacity="0.6"
            />
            <path
              d="M20 25 Q12 27 6 33 Q9 34 13 35 Q17 32 20 30"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M20 30 Q11 32 5 38 Q8 39 12 40 Q16 37 20 35"
              fill="white"
              opacity="0.4"
            />
            <path
              d="M20 35 Q10 37 4 43 Q7 44 11 45 Q15 42 20 40"
              fill="white"
              opacity="0.3"
            />
            
            {/* Fibras da pena - lado direito */}
            <path
              d="M20 10 Q25 12 28 15 Q26 16 24 17 Q22 16 20 15"
              fill="white"
              opacity="0.8"
            />
            <path
              d="M20 15 Q26 17 30 21 Q28 22 25 23 Q22 21 20 20"
              fill="white"
              opacity="0.7"
            />
            <path
              d="M20 20 Q27 22 32 27 Q29 28 26 29 Q23 27 20 25"
              fill="white"
              opacity="0.6"
            />
            <path
              d="M20 25 Q28 27 34 33 Q31 34 27 35 Q23 32 20 30"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M20 30 Q29 32 35 38 Q32 39 28 40 Q24 37 20 35"
              fill="white"
              opacity="0.4"
            />
            <path
              d="M20 35 Q30 37 36 43 Q33 44 29 45 Q25 42 20 40"
              fill="white"
              opacity="0.3"
            />
            
            {/* Ponta da pena */}
            <circle cx="20" cy="5" r="2" fill="white" opacity="0.9"/>
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