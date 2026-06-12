'use client';

import Reveal from './Reveal';

interface Milestone {
  date: string;
  title: string;
  description: string;
  emoji: string;
}

// 👉 Edite livremente datas e textos abaixo
const milestones: Milestone[] = [
  {
    date: '2024',
    title: 'Nossos caminhos se cruzaram',
    description: 'Já nos conhecíamos há quase um ano, dividindo pequenos momentos sem nos falarmos de verdade.',
    emoji: '✨',
  },
  {
    date: 'Início de 2025',
    title: 'A primeira conversa',
    description: 'Num dia comum, começamos a conversar… e tudo mudou.',
    emoji: '💬',
  },
  {
    date: '8 de abril de 2025',
    title: 'Começamos a namorar',
    description: 'Nosso amor floresceu rápido, leve e verdadeiro. Era nosso por destino.',
    emoji: '❤️',
  },
  {
    date: 'Primeiro encontro',
    title: 'Como se já nos conhecêssemos há anos',
    description: 'Companheirismo, risadas e paz. Até escolhemos os nomes dos nossos filhos: Henrique e Melissa.',
    emoji: '🥰',
  },
  {
    date: 'Hoje',
    title: 'Construindo nossa vida',
    description: 'Escolhendo apartamento, sonhando com o casamento, imaginando nossa casa e nossas histórias.',
    emoji: '💍',
  },
  {
    date: '11 de dezembro de 2026',
    title: 'Nosso apartamento',
    description: 'O começo do nosso lar, do nosso espaço, da nossa vida juntos.',
    emoji: '🏡',
  },
];

export default function Timeline() {
  return (
    <div className="relative w-full">
      {/* Linha vertical central */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400/0 via-red-400/40 to-red-400/0 sm:-translate-x-1/2" />

      <div className="space-y-8 sm:space-y-12">
        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Reveal key={i} from={isLeft ? 'right' : 'left'} delay={60}>
              <div
                className={`relative flex items-start sm:items-center ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Ponto na linha */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-900 border-2 border-white/20 shadow-lg shadow-red-900/40 text-sm">
                  {m.emoji}
                </div>

                {/* Card */}
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                  <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-5 border border-white/10 shadow-xl hover:border-red-400/30 hover:bg-black/40 transition-all duration-300">
                    <span className="inline-block text-xs font-semibold text-red-300 bg-red-500/10 rounded-full px-3 py-1 mb-2">
                      {m.date}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-1">{m.title}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>

                {/* Espaçador do outro lado (desktop) */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
