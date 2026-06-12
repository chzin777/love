'use client';

import { useState, useRef, useMemo, useEffect } from "react";
import { Heart, Sparkles, Music, Volume2 } from "lucide-react";
import DarkVeil from "../components/DarkVeil";
import FallingFeather from "../components/FallingFeather";
import PetalEffect from "../components/PetalEffect";
import SplitText from "../components/SplitText";
import Stack from "../components/Stack";
import TogetherCounter from "../components/TogetherCounter";
import Countdown from "../components/Countdown";
import Timeline from "../components/Timeline";
import Reveal from "../components/Reveal";
import Stories from "../components/Stories";
import WordGame from "../components/WordGame";
import FinalStory from "../components/FinalStory";
import { generateReasons } from "../utils/reasons";

export default function Home() {
  const [showFeather, setShowFeather] = useState(true);
  const [visibleReasons, setVisibleReasons] = useState(50);
  const [storyIndex, setStoryIndex] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const photos = useMemo(() => Array.from({ length: 17 }, (_, i) => i + 1), []);
  // Memoizado: o contador re-renderiza a cada 1s; sem isso o Stack reiniciaria sempre
  const stackCards = useMemo(
    () =>
      photos.map((num) => (
        <img
          key={num}
          src={`/images/${num}.jpeg`}
          alt={`Momento ${num}`}
          className="w-full h-full object-cover pointer-events-none"
        />
      )),
    [photos]
  );
  const reasons = useMemo(() => generateReasons(), []);

  // ---- Música por story, com crossfade ----
  const VOL = 0.85;
  // Offset de início (em segundos) por número da faixa
  const START_OFFSETS: Record<number, number> = { 1: 15, 2: 13, 3: 6, 4: 42, 5: 40, 7: 50, 8: 13, 9: 14 };
  const trackFor = (i: number) => `/sound/${i + 1}.mp3`;
  const offsetFor = (i: number) => START_OFFSETS[i + 1] ?? 0;

  const FADE_S = 1.5; // duração do crossfade em segundos

  // Engine de áudio: 2 canais, ramp contínuo (rAF) com curva equal-power
  const engineRef = useRef<{
    audios: HTMLAudioElement[];
    gains: number[]; // 0..1 por canal
    tracks: (number | null)[];
    desired: number | null;
    raf: number | null;
    last: number;
  } | null>(null);

  const initEngine = () => {
    if (engineRef.current || typeof Audio === 'undefined') return engineRef.current;
    const mk = () => {
      const a = new Audio();
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0;
      return a;
    };
    engineRef.current = {
      audios: [mk(), mk()],
      gains: [0, 0],
      tracks: [null, null],
      desired: null,
      raf: null,
      last: 0,
    };
    return engineRef.current;
  };

  const tickRef = useRef<(now: number) => void>(() => {});
  tickRef.current = (now: number) => {
    const e = engineRef.current;
    if (!e) return;
    const dt = e.last ? (now - e.last) / 1000 : 0;
    e.last = now;
    const rate = FADE_S > 0 ? dt / FADE_S : 1;
    let busy = false;
    for (let i = 0; i < e.audios.length; i++) {
      const target = e.tracks[i] !== null && e.tracks[i] === e.desired ? 1 : 0;
      if (e.gains[i] < target) e.gains[i] = Math.min(target, e.gains[i] + rate);
      else if (e.gains[i] > target) e.gains[i] = Math.max(target, e.gains[i] - rate);
      if (e.gains[i] !== target) busy = true;
      // curva equal-power evita queda de volume no meio do crossfade
      e.audios[i].volume = Math.sin((e.gains[i] * Math.PI) / 2) * VOL;
      if (e.gains[i] <= 0.0005 && e.tracks[i] !== e.desired && !e.audios[i].paused) {
        e.audios[i].pause();
      }
    }
    if (busy) e.raf = requestAnimationFrame(tickRef.current);
    else {
      e.raf = null;
      e.last = 0;
    }
  };

  const playTrack = (track: number) => {
    const e = initEngine();
    if (!e) return;
    e.desired = track;
    let idx = e.tracks.findIndex((t) => t === track);
    if (idx === -1) {
      // carrega no canal mais silencioso (evita corte em canal audível)
      idx = e.gains[0] <= e.gains[1] ? 0 : 1;
      const a = e.audios[idx];
      e.tracks[idx] = track;
      e.gains[idx] = 0;
      a.volume = 0;
      // pausa antes de trocar a fonte: resolve o play() pendente e evita AbortError
      a.pause();
      a.src = trackFor(track);
      const off = offsetFor(track);
      const seek = () => {
        try {
          a.currentTime = off;
        } catch {
          /* noop */
        }
      };
      if (a.readyState >= 1) seek();
      else a.addEventListener('loadedmetadata', seek, { once: true });
      // play síncrono (preserva o gesto do usuário no 1º áudio)
      a.play().catch(() => {});
    } else {
      e.audios[idx].play().catch(() => {});
    }
    if (e.raf === null) {
      e.last = 0;
      e.raf = requestAnimationFrame(tickRef.current);
    }
  };

  // Ativa o áudio no gesto do usuário (botão), tocando a faixa do story atual
  const enableAudio = () => {
    if (audioOn) return;
    initEngine();
    playTrack(storyIndex);
    setAudioOn(true);
  };

  // Troca a faixa ao mudar de story (após áudio ativado)
  useEffect(() => {
    if (!audioOn) return;
    playTrack(storyIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex]);

  // Limpeza ao desmontar
  useEffect(() => {
    return () => {
      const e = engineRef.current;
      if (e) {
        if (e.raf) cancelAnimationFrame(e.raf);
        e.audios.forEach((a) => a.pause());
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
   
    }}>
      {/* Fundo Dark Veil animado, fixo cobrindo todo o site, em vermelho */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={1.4}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
        </div>
        {/* Tinta vermelha: força o tom vermelho sobre o veil */}
        <div className="absolute inset-0 bg-[#dc2626] mix-blend-color" />
        {/* Escurece para um fundo mais sutil e legível */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Stories
        index={storyIndex}
        onIndexChange={setStoryIndex}
        durations={[
          10000, // hero
          null,  // nossos momentos (interativo)
          10000, // juntos há
          6000,  // countdown
          45000, // nossa história (texto longo)
          45000, // linha do tempo
          null,  // razões (interativo)
          null,  // jogo de palavras (interativo)
          null,  // final (chuva de fotos)
        ]}
        slides={[
        /* Hero */
        <section key="hero" className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <SplitText
            text="Para o amor da minha vida"
            tag="h1"
            className="font-script text-white text-5xl sm:text-7xl leading-tight"
            delay={50}
            duration={1.1}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-50px"
            textAlign="center"
          />

          {/* Ativar áudio (gesto necessário para o navegador liberar som) */}
          <button
            onClick={enableAudio}
            className={`mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border transition ${
              audioOn
                ? 'border-green-400/30 text-green-200 bg-green-500/10'
                : 'border-red-400/40 text-white bg-red-500/20 hover:bg-red-500/30 animate-pulse'
            }`}
          >
            {audioOn ? (
              <>
                <Volume2 className="w-5 h-5" /> Som ativado
              </>
            ) : (
              <>
                <Music className="w-5 h-5" /> Ativar áudio
              </>
            )}
          </button>

          <div className="scroll-hint mt-12 text-white/50 flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em]">toque para avançar</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </section>,
        /* Nossos momentos */
        <Reveal key="momentos" className="w-full flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-1 font-serif-display">Nossos momentos</h3>
          <p className="text-white/50 text-xs mb-6 inline-flex items-center gap-1">arraste ou toque para passar <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /></p>
          <div style={{ width: 'min(86vw, 380px)', height: 'min(86vw, 380px)' }}>
            <Stack
              sensitivity={160}
              sendToBackOnClick
              cards={stackCards}
            />
          </div>
        </Reveal>,
        /* Juntos há */
        <TogetherCounter key="counter" />,
        /* Countdown */
        <Reveal key="countdown" className="w-full max-w-sm">
          <Countdown
            target="2026-12-11T00:00:00"
            title="Nosso apartamento"
            subtitle="11 de dezembro de 2026, nosso primeiro lar"
          />
        </Reveal>,
        /* Nossa História */
        <div key="historia" className="w-full max-w-2xl px-4">
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-serif-display">Nossa História</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
              </div>
              
              <div className="space-y-6 text-white/90 leading-relaxed">
                <p className="text-lg">
                  A nossa história começou muito antes de percebermos. Já nos conhecíamos há quase um ano, cruzando caminhos e compartilhando pequenos momentos, mas sem nos falarmos de verdade. Até que, em um dia comum, começamos a conversar… e tudo mudou.
                </p>
                
                <p className="text-lg">
                  O nosso amor floresceu de um jeito rápido, leve e incrível. Foi natural, foi verdadeiro, parecia que estávamos apenas deixando acontecer algo que já era nosso por destino.
                </p>
                
                <p className="text-lg">
                  No primeiro encontro, já conversávamos como se nos conhecêssemos há anos. Companheirismo, risadas, paz. Chegamos até a escolher o nome dos nossos futuros filhos: <span className="text-red-300 font-semibold">Henrique e Melissa</span>. Algo simples, mas que mostrou o quanto nossa conexão era profunda desde o início.
                </p>
                
                <p className="text-lg">
                  Hoje, seguimos caminhando juntos, planejando nossa vida: já compramos o nosso apartamento, sonhando com nosso casamento, imaginando a casa com nossos móveis, nossas histórias e nossos sonhos.
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-red-300">
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                  <span className="text-sm font-medium">Com amor, seu futuro marido</span>
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </div>
              </div>
            </div>
          </div>,
        /* Linha do Tempo */
        <div key="timeline" className="w-full max-w-3xl px-2 sm:px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-serif-display">Nossa Linha do Tempo</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto" />
            <p className="text-white/60 text-sm mt-3">Cada momento que nos trouxe até aqui</p>
          </Reveal>
          <Timeline />
        </div>,
        /* Razões de te amar */
        <div key="razoes" className="w-full max-w-2xl px-4">
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-serif-display">Razões de te amar</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-400/50 scrollbar-track-transparent">
              {reasons.slice(0, visibleReasons).map((razao, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer flex-shrink-0"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="text-red-400 fill-red-400 w-5 h-5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-white/90 group-hover:text-white transition-colors duration-300 text-sm">{razao}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center space-y-4">
              <div className="text-red-200">
                <p className="font-bold text-lg">{visibleReasons.toLocaleString()} de {reasons.length.toLocaleString()} razões mostradas</p>
                <p className="text-sm opacity-75 inline-flex items-center gap-1">Cada uma única e verdadeira <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /></p>
              </div>
              
              {visibleReasons < reasons.length && (
                <button
                  onClick={() => setVisibleReasons(prev => Math.min(prev + 100, reasons.length))}
                  className="bg-red-500/20 hover:bg-red-500/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 border border-red-400/20 hover:border-red-400/40 inline-flex items-center gap-2"
                >
                  Ver mais razões <Heart className="w-4 h-4 text-red-400 fill-red-400" /> (+100)
                </button>
              )}
              
              {visibleReasons >= reasons.length && (
                <div className="text-center">
                  <p className="text-red-200 font-medium text-lg inline-flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" /> Todas as 5.000 razões reveladas! <Sparkles className="w-5 h-5 text-yellow-300" />
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    E ainda assim, não são suficientes para expressar todo meu amor...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>,
        /* Jogo de palavras */
        <WordGame key="wordgame" />,
        /* Rodapé */
        <FinalStory key="final" photos={photos} />,
      ]} />

      {/* Efeitos visuais */}
      <PetalEffect />

      {/* Pena caindo no carregamento */}
      {showFeather && (
        <FallingFeather onComplete={() => setShowFeather(false)} />
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .vinyl {
          animation: vinylSpin 14s linear infinite;
        }

        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Melhor área de toque para mobile */
        @media (hover: none) {
          .slider {
            height: 8px;
          }
          
          .slider::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
          }
          
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
}
