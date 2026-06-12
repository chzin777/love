'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  /** Data alvo no formato ISO, ex: '2026-12-11T00:00:00' */
  target: string;
  title: string;
  subtitle?: string;
  emoji?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  reached: boolean;
}

const calc = (target: string): TimeLeft => {
  const diff = new Date(target).getTime() - new Date().getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, reached: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    reached: false,
  };
};

export default function Countdown({ target, title, subtitle, emoji = '🏡' }: CountdownProps) {
  // Inicia null para evitar mismatch de hidratação (servidor x cliente)
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calc(target));
    const interval = setInterval(() => setTime(calc(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = time
    ? [
        { label: 'dias', value: time.days },
        { label: 'horas', value: time.hours },
        { label: 'min', value: time.minutes },
        { label: 'seg', value: time.seconds },
      ]
    : [];

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 w-full border border-white/10 shadow-2xl">
      <div className="text-center mb-6">
        <span className="text-4xl">{emoji}</span>
        <h3 className="text-2xl font-bold text-white mt-2 mb-1">{title}</h3>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>

      {time?.reached ? (
        <p className="text-center text-red-300 text-xl font-bold py-4">Chegou o grande dia! 🥳❤️</p>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {units.map((u) => (
            <div
              key={u.label}
              className="bg-gradient-to-b from-red-900/40 to-black/40 rounded-2xl py-4 border border-red-400/10"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums text-center">
                {time ? u.value.toString().padStart(2, '0') : '--'}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider text-center mt-1">
                {u.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
