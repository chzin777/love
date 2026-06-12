'use client';

import Image from "next/image";
import { useState, useRef, useMemo } from "react";
import { Heart, Sparkles } from "lucide-react";
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
import { generateReasons } from "../utils/reasons";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showFeather, setShowFeather] = useState(true);
  const [visibleReasons, setVisibleReasons] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const START_AT = 15; // música começa em 0:15

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.currentTime = START_AT;
      setCurrentTime(START_AT);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipPrevious = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = START_AT;
      setCurrentTime(START_AT);
    }
  };

  const skipNext = () => {
    // Simulação - em um player real, mudaria para a próxima música
    if (audioRef.current) {
      audioRef.current.currentTime = START_AT;
      setCurrentTime(START_AT);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
   
    }}>
      {/* Fundo Dark Veil animado, fixo cobrindo todo o site, em vermelho */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-60">
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
        {/* Escurece um pouco para legibilidade do conteúdo */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Audio element - você pode adicionar uma fonte de áudio aqui */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/sound/sound.mp3" type="audio/mpeg" />
      </audio>

      <Stories slides={[
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

          <div className="scroll-hint mt-20 text-white/50 flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em]">toque para avançar</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </section>,
        /* Player */
        <div key="player" className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-white/10">
          {/* Album Art */}
          <div className="relative mb-6">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/1.jpeg"
                alt="Album Cover"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback para quando a imagem não existir
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.background = 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)';
                  target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white"><svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg></div>';
                }}
              />
            </div>
          </div>

          {/* Song Info */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-1 truncate">Mudei Demais</h2>
            <p className="text-gray-400 text-sm truncate">Luiz Henrique e Léo</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #7f1d1d 0%, #7f1d1d ${(currentTime / (duration || 100)) * 100}%, #4a5568 ${(currentTime / (duration || 100)) * 100}%, #4a5568 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            {/* Shuffle */}
            <button className="text-gray-400 hover:text-white transition-colors p-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.83 13.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13zM14.5 4l2.04 2.04L13.41 9.17l1.41 1.41L17.96 7.46 20 9.5V4h-5.5zm-9.96 9.96L6.17 12.41 4.04 10.04 6.5 8H1v5.5l2.04-2.04 3.13 3.13 1.41-1.41z"/>
              </svg>
            </button>

            {/* Previous */}
            <button 
              onClick={skipPrevious}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="bg-red-800 text-white rounded-full p-3 hover:scale-105 hover:bg-red-900 transition-all shadow-lg"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Next */}
            <button 
              onClick={skipNext}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>

            {/* Repeat */}
            <button className="text-gray-400 hover:text-white transition-colors p-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
              </svg>
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between">
            {/* Like */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-colors p-1 ${isLiked ? 'text-red-700' : 'text-gray-400 hover:text-red-600'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>

            {/* Volume */}
            <div className="flex items-center space-x-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #7f1d1d 0%, #7f1d1d ${volume * 100}%, #4a5568 ${volume * 100}%, #4a5568 100%)`
                }}
              />
            </div>
          </div>
        </div>,
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
        /* Rodapé */
        <footer key="footer" className="text-center">
          <p className="font-script text-4xl sm:text-5xl text-red-200 mb-3">Te amo, hoje e sempre</p>
          <p className="text-white/40 text-xs inline-flex items-center gap-1">Feito com <Heart className="heartbeat w-3.5 h-3.5 text-red-500 fill-red-500" /> só para você</p>
        </footer>,
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
