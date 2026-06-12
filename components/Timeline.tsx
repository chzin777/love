'use client';

import { Sandwich, Heart, Gem, Users, Plane, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

// 👉 Edite livremente datas e textos abaixo
const milestones: Milestone[] = [
  {
    date: '13 de março de 2025',
    title: 'Nosso primeiro piquenique',
    description: 'Onde tudo começou a florescer, com risadas, conversa e a paz de estar perto de você. Aqui escolhemos até os nomes dos nossos filhos, bom vc já tinha escolhido, eu só concordei kkkkk.',
    icon: Sandwich,
  },
  {
    date: '8 de abril de 2025',
    title: 'Começo do namoro',
    description: 'O dia em que nos tornamos um. Nosso amor, oficial e verdadeiro. Um dos dias mais felizes da minha vida.',
    icon: Heart,
  },
  {
    date: '8 de maio de 2025',
    title: 'Alianças e o pedido oficial',
    description: 'Um sim de coração, um compromisso para a vida.',
    icon: Gem,
  },
  {
    date: '15 de junho de 2025',
    title: 'Conheci seus pais',
    description: 'Fui recebido pela sua família, mais um passo importante na nossa jornada juntos.',
    icon: Users,
  },
  {
    date: '18 de outubro de 2025',
    title: 'Nossa primeira viagem juntos',
    description: 'Novos lugares, mesma sintonia. Levamos nosso amor estrada afora.',
    icon: Plane,
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
          const Icon = m.icon;
          return (
            <Reveal key={i} from={isLeft ? 'right' : 'left'} delay={60}>
              <div
                className={`relative flex items-start sm:items-center ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Ponto na linha */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-900 border-2 border-white/20 shadow-lg shadow-red-900/40">
                  <Icon className="w-4 h-4 text-white" strokeWidth={2} />
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
