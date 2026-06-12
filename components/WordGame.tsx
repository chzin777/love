'use client';

import { useMemo, useState } from 'react';
import { Heart, Shuffle, Check } from 'lucide-react';

interface Puzzle {
  answer: string;
  hint: string;
}

const PUZZLES: Puzzle[] = [
  { answer: 'AMOR', hint: 'O que a gente sente um pelo outro' },
  { answer: 'MELISSA', hint: 'O nome da nossa futura filha' },
  { answer: 'HENRIQUE', hint: 'O nome do nosso futuro filho' },
  { answer: 'FACULDADE', hint: 'Onde tudo começou' },
  { answer: 'APARTAMENTO', hint: 'Nosso primeiro lar' },
  { answer: 'CASAMENTO', hint: 'Nosso próximo grande passo' },
];

const scramble = (word: string): string => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const out = arr.join('');
  return out === word ? scramble(word) : out;
};

const norm = (s: string) => s.toUpperCase().replace(/[^A-ZÀ-Ú]/g, '');

export default function WordGame() {
  const [i, setI] = useState(0);
  const [val, setVal] = useState('');
  const [seed, setSeed] = useState(0);

  const puzzle = PUZZLES[i];
  // seed força novo embaralhamento ao clicar em "embaralhar"
  const scrambled = useMemo(() => scramble(puzzle.answer), [i, seed]);
  const solved = norm(val) === puzzle.answer;
  const isLast = i === PUZZLES.length - 1;
  const finished = solved && isLast;

  const next = () => {
    setVal('');
    setI((p) => Math.min(PUZZLES.length - 1, p + 1));
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white/10 shadow-2xl text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-serif-display">Jogo de palavras</h2>
      <p className="text-white/60 text-sm mb-6">Desembaralhe a palavra</p>

      {/* Dica */}
      <p className="text-red-200 text-sm mb-4">
        <span className="opacity-70">Dica:</span> {puzzle.hint}
      </p>

      {/* Letras embaralhadas */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {scrambled.split('').map((c, idx) => (
          <span
            key={idx}
            className="w-9 h-11 sm:w-10 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-b from-red-900/50 to-black/50 border border-red-400/20 text-white font-bold text-lg uppercase"
          >
            {c}
          </span>
        ))}
      </div>

      {!finished ? (
        <>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Digite aqui"
            className={`w-full text-center uppercase tracking-widest rounded-xl px-4 py-3 bg-white/5 border text-white placeholder-white/30 outline-none transition ${
              solved ? 'border-green-400/60' : 'border-white/15 focus:border-red-400/50'
            }`}
          />

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition"
            >
              <Shuffle className="w-4 h-4" /> Embaralhar
            </button>

            {solved && (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white px-5 py-2 rounded-xl border border-red-400/30 transition"
              >
                <Check className="w-4 h-4 text-green-400" /> Próxima
              </button>
            )}
          </div>

          {solved && (
            <p className="mt-4 text-green-300 font-medium inline-flex items-center gap-2 justify-center">
              <Check className="w-4 h-4" /> Acertou!
            </p>
          )}
        </>
      ) : (
        <div className="py-2">
          <p className="text-red-200 text-lg font-semibold inline-flex items-center gap-2 justify-center">
            Você acertou todas! <Heart className="w-5 h-5 text-red-400 fill-red-400" />
          </p>
          <p className="text-white/60 text-sm mt-2">Tão esperta quanto linda.</p>
        </div>
      )}

      <p className="text-white/40 text-xs mt-6">
        {i + 1} de {PUZZLES.length}
      </p>
    </div>
  );
}
