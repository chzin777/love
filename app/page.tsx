'use client';

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import DarkVeil from "../components/DarkVeil";
import FallingFeather from "../components/FallingFeather";
import PetalEffect from "../components/PetalEffect";
import SplitText from "../components/SplitText";
import Stack from "../components/Stack";
import CountUp from "../components/CountUp";
import Countdown from "../components/Countdown";
import Timeline from "../components/Timeline";
import Reveal from "../components/Reveal";
import { generateReasons } from "../utils/reasons";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [timeCounter, setTimeCounter] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [showPhotos, setShowPhotos] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFeather, setShowFeather] = useState(true);
  const [showStory, setShowStory] = useState(true);
  const [visibleReasons, setVisibleReasons] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const photos = useMemo(() => [1, 2, 3, 4, 5], []);
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

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const skipNext = () => {
    // Simulação - em um player real, mudaria para a próxima música
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  // Contador de tempo desde 8 de abril de 2025
  useEffect(() => {
    const updateCounter = () => {
      const startDate = new Date('2025-04-08T00:00:00');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTotalDays(totalDays);
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setTimeCounter(timeString);
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  // Slideshow automático
  useEffect(() => {
    if (!showPhotos) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [showPhotos, photos.length]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
   
    }}>
      {/* Fundo Dark Veil animado como overlay */}
      <div className="absolute inset-0 opacity-30">
        <DarkVeil 
          hueShift={247}
          noiseIntensity={0.1}
          scanlineIntensity={0.05}
          speed={0.3}
          scanlineFrequency={0.02}
          warpAmount={0.1}
          resolutionScale={1}
        />
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

      <div className="flex flex-col items-center justify-center p-4 px-6 relative z-10">
        {/* Hero romântico */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <SplitText
            text="Para o amor da minha vida"
            tag="p"
            className="font-script text-2xl sm:text-3xl text-red-200/90 mb-4"
            delay={40}
            duration={1}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-50px"
            textAlign="center"
          />

          <SplitText
            text="Você é o meu lar"
            tag="h1"
            className="hero-gradient-text font-serif-display font-bold text-5xl sm:text-7xl leading-tight mb-6"
            delay={70}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="center"
          />

          <Reveal delay={900}>
            <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed font-serif-display italic">
              Cada batida do meu coração tem o seu nome. Role para baixo e venha
              reviver, comigo, a nossa história. <span className="inline-block heartbeat">❤️</span>
            </p>
          </Reveal>

          <div className="scroll-hint mt-16 text-white/50 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em]">deslize</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Player Card */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-white/10">
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
                  target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-6xl">🎵</div>';
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
        </div>

        {/* Pilha de fotos arrastáveis */}
        <Reveal className="mt-12 w-full flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-1 font-serif-display">Nossos momentos</h3>
          <p className="text-white/50 text-xs mb-6">arraste ou toque para passar 💞</p>
          <div style={{ width: 256, height: 256 }}>
            <Stack
              randomRotation
              sensitivity={160}
              sendToBackOnClick
              autoplay
              autoplayDelay={3500}
              pauseOnHover
              mobileClickOnly
              cards={stackCards}
            />
          </div>
        </Reveal>

        {/* Segunda foto */}
        <div className="mt-12 w-full max-w-sm">
          <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/2.jpeg"
              alt="Nossa Foto"
              width={400}
              height={400}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback para quando a imagem não existir
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.style.background = 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)';
                target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-6xl">💕</div>';
              }}
            />
          </div>
        </div>

        {/* Contador de tempo */}
        <Reveal className="mt-8 w-full max-w-sm">
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 w-full border border-white/10 shadow-2xl">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-3 font-serif-display">Juntos há</h3>
              <div className="flex items-end justify-center gap-2 mb-1">
                <CountUp
                  to={totalDays}
                  duration={2.2}
                  separator="."
                  className="hero-gradient-text font-serif-display font-bold text-6xl tabular-nums leading-none"
                />
                <span className="text-red-200/80 text-lg font-semibold mb-1">dias</span>
              </div>
              <p className="text-red-300/90 text-lg font-mono tracking-wide mt-2">{timeCounter}</p>
              <p className="text-gray-400 text-xs mt-3">Desde 8 de abril de 2025 💞</p>
            </div>
          </div>
        </Reveal>

        {/* Countdown para o apartamento */}
        <Reveal className="mt-8 w-full max-w-sm">
          <Countdown
            target="2026-12-11T00:00:00"
            title="Nosso apartamento"
            subtitle="11 de dezembro de 2026 · nosso primeiro lar"
            emoji="🏡"
          />
        </Reveal>

        {/* Slideshow de fotos */}
        <div ref={slideshowRef} className="mt-8 w-full max-w-md px-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-black/20">
              {/* Imagens do slideshow */}
              {photos.map((num, index) => (
                <div
                  key={num}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={`/images/${num}.jpeg`}
                    alt={`Nossa foto ${num}`}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.background = 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)';
                      target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-6xl">💕</div>';
                    }}
                  />
                </div>
              ))}
              
              {/* Indicadores de slide */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white shadow-lg'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              
              {/* Controles de navegação */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % photos.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
            
            {/* Contador de slides */}
            <div className="mt-4 text-center">
              <p className="text-white/60 text-sm">
                {currentSlide + 1} de {photos.length}
              </p>
            </div>
          </div>

        {/* Nossa História */}
        <div ref={storyRef} className="mt-8 w-full max-w-2xl px-4">
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
                  O nosso amor floresceu de um jeito rápido, leve e incrível. Foi natural, foi verdadeiro — parecia que estávamos apenas deixando acontecer algo que já era nosso por destino.
                </p>
                
                <p className="text-lg">
                  No primeiro encontro, já conversávamos como se nos conhecêssemos há anos. Companheirismo, risadas, paz. Chegamos até a escolher o nome dos nossos futuros filhos: <span className="text-red-300 font-semibold">Henrique e Melissa</span>. Algo simples, mas que mostrou o quanto nossa conexão era profunda desde o início.
                </p>
                
                <p className="text-lg">
                  Hoje, seguimos caminhando juntos, planejando nossa vida: escolhendo apartamento, sonhando com nosso casamento, imaginando a casa com nossos móveis, nossas histórias e nossos sonhos.
                </p>
                
                <p className="text-lg font-medium text-red-200">
                  Nosso namoro é leve. A gente sorri muito. Somos a paz um do outro.
                </p>
                
                <p className="text-lg text-center font-semibold text-white mt-8">
                  E agora seguimos, de mãos dadas, rumo a construir a vida que sempre desejamos.
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-red-300">
                  <span className="text-2xl">💕</span>
                  <span className="text-sm font-medium">Com amor seu futuro marido❤️</span>
                  <span className="text-2xl">💕</span>
                </div>
              </div>
            </div>
          </div>

        {/* Linha do Tempo */}
        <div className="mt-16 w-full max-w-3xl px-2 sm:px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-serif-display">Nossa Linha do Tempo</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto" />
            <p className="text-white/60 text-sm mt-3">Cada momento que nos trouxe até aqui</p>
          </Reveal>
          <Timeline />
        </div>

        {/* Razões de te amar */}
        <div className="mt-8 w-full max-w-2xl px-4">
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
                    <span className="text-red-400 text-xl group-hover:scale-125 transition-transform duration-300">❤️</span>
                    <p className="text-white/90 group-hover:text-white transition-colors duration-300 text-sm">{razao}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center space-y-4">
              <div className="text-red-200">
                <p className="font-bold text-lg">{visibleReasons.toLocaleString()} de {reasons.length.toLocaleString()} razões mostradas</p>
                <p className="text-sm opacity-75">Cada uma única e verdadeira 💕</p>
              </div>
              
              {visibleReasons < reasons.length && (
                <button
                  onClick={() => setVisibleReasons(prev => Math.min(prev + 100, reasons.length))}
                  className="bg-red-500/20 hover:bg-red-500/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 border border-red-400/20 hover:border-red-400/40"
                >
                  Ver mais razões ❤️ (+100)
                </button>
              )}
              
              {visibleReasons >= reasons.length && (
                <div className="text-center">
                  <p className="text-red-200 font-medium text-lg">
                    ✨ Todas as 5.000 razões reveladas! ✨
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    E ainda assim, não são suficientes para expressar todo meu amor...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <footer className="mt-16 mb-10 text-center">
          <p className="font-script text-3xl text-red-200 mb-2">Te amo, hoje e sempre</p>
          <p className="text-white/40 text-xs">Feito com <span className="heartbeat inline-block">❤️</span> só para você</p>
        </footer>
      </div>

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
