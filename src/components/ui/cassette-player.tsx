"use client";

import { useAudio } from "@/components/providers/audio-context";
import { motion } from "framer-motion";
import { RotateCw, Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function CassettePlayer() {
  const { isPlaying, togglePlay, nextTrack, prevTrack, progress, tracks, currentTrackIndex } = useAudio();
  const activeTrack = tracks[currentTrackIndex];

  // Colors
  const accentColor = activeTrack.color;

  return (
    <div className="w-80 p-6 rounded-2xl glass border border-white/10 shadow-2xl relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div 
        className="absolute -top-16 -left-16 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: accentColor }}
      />
      
      {/* Cassette Label Header */}
      <div className="flex justify-between items-center mb-4 text-white/50 text-[10px] tracking-widest uppercase">
        <span>CH A: Dolby NR</span>
        <span>CrO2 / Type II</span>
      </div>

      {/* 1. CASSETTE TAPE BODY */}
      <div 
        className="w-full h-40 rounded-xl bg-zinc-900 border border-zinc-800 relative flex flex-col justify-between p-3 cursor-pointer shadow-inner"
        onClick={togglePlay}
        data-cursor="play"
      >
        {/* Cassette Sticker Label */}
        <div 
          className="w-full h-[65%] rounded-md border border-black/40 p-2 flex flex-col justify-between relative overflow-hidden transition-colors duration-500"
          style={{
            background: `linear-gradient(to bottom, #18181b 15%, ${accentColor}25 50%, #18181b 85%)`
          }}
        >
          {/* Decorative lines */}
          <div className="absolute top-2 left-0 right-0 h-[2px] bg-white/5" />
          <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-white/5" />

          {/* Album Title */}
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-bold text-white tracking-wider truncate max-w-[150px]">
              {activeTrack.album}
            </span>
            <span className="text-[9px] font-mono text-white/70">
              NR-90
            </span>
          </div>

          {/* Track Name */}
          <div className="flex justify-between items-end z-10">
            <span className="text-xs font-semibold text-white/95 truncate max-w-[170px] uppercase tracking-wide">
              {activeTrack.title}
            </span>
            <span className="text-[9px] font-mono text-white/70">
              A-{currentTrackIndex + 1}
            </span>
          </div>
        </div>

        {/* 2. CENTER WINDOW (TAPE REELS & TAPE ROLL EFFECTS) */}
        <div className="absolute top-[40%] left-[12%] right-[12%] h-[30%] bg-black/90 rounded border border-zinc-800 flex items-center justify-between px-6 overflow-hidden">
          {/* Left Reel & Tape Roll */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Dynamic Left Tape Roll (shrinks as track plays) */}
            <motion.div 
              className="absolute rounded-full bg-zinc-800/80 border border-zinc-700/60"
              style={{
                width: `${32 - (progress * 0.12)}px`,
                height: `${32 - (progress * 0.12)}px`,
              }}
              transition={{ ease: "linear" }}
            />
            {/* Spinning Reel Gear */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={isPlaying ? { repeat: Infinity, duration: 2.5, ease: "linear" } : { duration: 0.5 }}
              className="z-10 text-white/70"
            >
              <RotateCw className="w-5 h-5 stroke-[2]" />
            </motion.div>
          </div>

          {/* Center transparent window gap */}
          <div className="w-16 h-3 bg-zinc-950/80 rounded border border-zinc-900/60 text-[6px] text-zinc-600 font-mono flex items-center justify-center tracking-widest">
            {Math.floor(progress)}%
          </div>

          {/* Right Reel & Tape Roll */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Dynamic Right Tape Roll (grows as track plays) */}
            <motion.div 
              className="absolute rounded-full bg-zinc-800/80 border border-zinc-700/60"
              style={{
                width: `${20 + (progress * 0.12)}px`,
                height: `${20 + (progress * 0.12)}px`,
              }}
              transition={{ ease: "linear" }}
            />
            {/* Spinning Reel Gear */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={isPlaying ? { repeat: Infinity, duration: 2.5, ease: "linear" } : { duration: 0.5 }}
              className="z-10 text-white/70"
            >
              <RotateCw className="w-5 h-5 stroke-[2]" />
            </motion.div>
          </div>
        </div>

        {/* Trapezoid bottom base piece */}
        <div className="w-1/2 h-3 bg-zinc-800 rounded-b mx-auto border-t border-zinc-950 flex justify-around px-4">
          <div className="w-1 h-1 rounded-full bg-zinc-900" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
          <div className="w-1 h-1 rounded-full bg-zinc-900" />
        </div>
      </div>

      {/* 3. PHYSICAL DECK CONTROLS */}
      <div className="mt-5 flex justify-between items-center bg-zinc-950/60 rounded-xl p-2 border border-white/5">
        <button 
          onClick={prevTrack} 
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95"
          title="Previous Track"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button 
          onClick={togglePlay} 
          className="p-3 rounded-full hover:scale-105 active:scale-95 transition-all text-black"
          style={{ backgroundColor: accentColor }}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button 
          onClick={nextTrack} 
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95"
          title="Next Track"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Track info display */}
      <div className="mt-4 text-center">
        <span className="text-[10px] text-white/40 tracking-wider font-mono">
          CURRENTLY ACTIVE PREVIEW
        </span>
      </div>
    </div>
  );
}
