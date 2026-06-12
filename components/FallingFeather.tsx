'use client';

import { useEffect, useState } from 'react';

// Pena (Font Awesome "feather", CC BY 4.0), branca
function FeatherShape() {
  return (
    <svg
      className="feather-svg"
      width="100"
      height="100"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="white"
        d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57-57 68 0c49.7 0 97.9-14.4 139-41c11.1-7.2 5.5-23-7.8-23c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l81-24.3c2.5-.8 4.8-2.1 6.7-4l22.4-22.4c10.1-10.1 2.9-27.3-11.3-27.3l-32.2 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l112-33.6c4-1.2 7.4-3.9 9.3-7.7C506.4 207.6 512 184.1 512 160c0-41-16.3-80.3-45.3-109.3l-5.5-5.5C432.3 16.3 393 0 352 0s-80.3 16.3-109.3 45.3L139 149C91 197 64 262.1 64 330l0 55.3L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z"
      />
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