'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Indica se o slide atual (consumidor) está ativo na tela
const StoryActiveContext = createContext(true);
export const useStoryActive = () => useContext(StoryActiveContext);

interface StoriesProps {
  slides: React.ReactNode[];
}

export default function Stories({ slides }: StoriesProps) {
  const [index, setIndex] = useState(0);
  const n = slides.length;
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const go = (delta: number) =>
    setIndex((prev) => Math.min(n - 1, Math.max(0, prev + delta)));
  const goTo = (i: number) => setIndex(Math.min(n - 1, Math.max(0, i)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    // Só conta como navegação se for um swipe horizontal claro
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    }
    touchX.current = null;
    touchY.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-10 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Barras de progresso (estilo stories) */}
      <div className="absolute top-0 left-0 right-0 z-30 flex gap-1.5 px-3 pt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-1 flex-1 rounded-full bg-white/25 overflow-hidden"
            aria-label={`Ir para o ${i + 1}`}
          >
            <span
              className="block h-full bg-white transition-all duration-500"
              style={{ width: i <= index ? '100%' : '0%' }}
            />
          </button>
        ))}
      </div>

      {/* Trilho horizontal (transição estilo stories) */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full h-full flex-shrink-0 overflow-y-auto"
            aria-hidden={i !== index}
          >
            <div className="min-h-full w-full flex flex-col items-center justify-center px-5 pt-16 pb-20">
              <StoryActiveContext.Provider value={i === index}>
                {slide}
              </StoryActiveContext.Provider>
            </div>
          </div>
        ))}
      </div>

      {/* Navegação lateral */}
      {index > 0 && (
        <button
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {index < n - 1 && (
        <button
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition animate-pulse"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
