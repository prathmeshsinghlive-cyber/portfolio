"use client";

import { useAudio } from "@/components/providers/audio-context";
import { motion } from "framer-motion";
import { useState } from "react";

interface VinylPlayerProps {
  coverUrl?: string;
  size?: "sm" | "md" | "lg";
}

export default function VinylPlayer({ coverUrl, size = "md" }: VinylPlayerProps) {
  const { isPlaying, togglePlay, tracks, currentTrackIndex } = useAudio();
  const [isHovered, setIsHovered] = useState(false);

  const activeTrack = tracks[currentTrackIndex];

  // Dimensional presets
  const dimensions = {
    sm: { jacket: "w-28 h-28", record: "w-24 h-24", label: "w-8 h-8 font-size-[6px]" },
    md: { jacket: "w-52 h-52", record: "w-48 h-48", label: "w-16 h-16 font-size-[10px]" },
    lg: { jacket: "w-72 h-72", record: "w-64 h-64", label: "w-24 h-24 font-size-[12px]" },
  };

  const currentSize = dimensions[size];

  // Custom styling colors based on current track
  const accentColor = activeTrack.color;

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. ALBUM SLEEVE / JACKET */}
      <motion.div
        className={`relative ${currentSize.jacket} rounded-lg overflow-hidden glass shadow-2xl z-20 cursor-pointer flex flex-col justify-between p-4 border border-white/10`}
        onClick={togglePlay}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        data-cursor="play"
      >
        {/* Album Cover Poster Image with Dark Gradients for Text Readability */}
        {activeTrack.coverUrl ? (
          <>
            <img 
              src={activeTrack.coverUrl} 
              alt={activeTrack.album} 
              className="absolute inset-0 z-0 w-full h-full object-cover transition-all duration-500" 
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/30 to-black/70 opacity-90" />
          </>
        ) : (
          /* Abstract Artistic Background on Sleeve */
          <div 
            className="absolute inset-0 z-0 opacity-40 blur-md transition-all duration-700"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${accentColor} 0%, transparent 60%), radial-gradient(circle at 80% 80%, #000000 0%, transparent 70%)`
            }}
          />
        )}

        {/* Branding on jacket */}
        <div className="relative z-10 flex justify-between items-start w-full">
          <span className="text-[9px] tracking-widest text-white/50 uppercase">Originals</span>
          <span />
        </div>

        {/* Spacer to push branding and track title to top/bottom */}
        <div className="my-auto" />

        {/* Track Title banner */}
        <div className="relative z-10 w-full flex justify-between items-end gap-4">
          <span className="text-xs font-semibold text-white tracking-wider text-left">
            {activeTrack.title}
          </span>
          <div className="text-[9px] text-white/60 font-mono shrink-0">{activeTrack.duration}</div>
        </div>
      </motion.div>

      {/* 2. THE VINYL RECORD */}
      <motion.div
        className={`absolute ${currentSize.record} rounded-full bg-[#111] border border-[#222] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center cursor-pointer`}
        animate={{
          x: isHovered || isPlaying ? (size === "lg" ? 90 : size === "md" ? 60 : 40) : 0,
          rotate: isPlaying ? 360 : 0,
        }}
        onClick={togglePlay}
        transition={{
          x: { type: "spring", stiffness: 120, damping: 15 },
          rotate: isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 1.5, ease: "easeOut" }
        }}
      >
        {/* Vinyl grooved circles */}
        <div className="absolute inset-2 rounded-full border border-black/80 opacity-60" />
        <div className="absolute inset-4 rounded-full border border-black/70 opacity-40" />
        <div className="absolute inset-8 rounded-full border border-black/80 opacity-55" />
        <div className="absolute inset-12 rounded-full border border-black/70 opacity-40" />
        <div className="absolute inset-16 rounded-full border border-black/80 opacity-60" />
        
        {/* Vinyl reflection overlay */}
        <div className="absolute inset-0 rounded-full vinyl-reflection opacity-40 pointer-events-none" />

        {/* Center label */}
        <div 
          className={`relative ${currentSize.label} rounded-full flex flex-col items-center justify-center text-center p-1 text-[9px] text-black font-semibold`}
          style={{ backgroundColor: accentColor }}
        >
          {/* Label vinyl hole */}
          <div className="absolute w-2 h-2 rounded-full bg-black/90 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/20" />
          <span className="text-[8px] font-bold tracking-tight truncate max-w-[80%] uppercase z-10 text-black">
            {activeTrack.title}
          </span>
          <span className="text-[6px] tracking-tight opacity-70 z-10 text-black">
            SIDE A
          </span>
        </div>
      </motion.div>

      {/* 3. TONEARM NEEDLE */}
      {size !== "sm" && (
        <motion.div
          className="absolute right-[-20px] top-[-30px] w-24 h-32 pointer-events-none z-30 transform-gpu"
          style={{ originX: 0.75, originY: 0.15 }}
          animate={{
            rotate: isPlaying ? 22 : 0, // swings needle arm onto vinyl groove when playing
          }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          {/* Tonearm graphic built using premium CSS */}
          {/* Base pivot */}
          <div className="absolute right-4 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-600 shadow-md flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-zinc-500" />
          </div>
          {/* Arm metallic bar */}
          <div className="absolute right-[22px] top-[24px] w-2 h-20 bg-gradient-to-r from-zinc-400 to-zinc-300 rounded shadow-sm transform rotate-[5deg] origin-top" />
          {/* Cartridge headshell */}
          <div className="absolute right-[22px] top-[95px] w-4 h-6 bg-zinc-800 rounded-sm border border-zinc-700 shadow-md transform rotate-[25deg]">
            <div className="w-1 h-3 bg-gold/80 mx-auto mt-2 rounded-sm" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
