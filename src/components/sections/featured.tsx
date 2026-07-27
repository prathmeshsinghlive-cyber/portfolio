"use client";

import { useAudio, Track } from "@/components/providers/audio-context";
import { motion } from "framer-motion";
import { Play, Pause, Flame, Heart, Share2 } from "lucide-react";
import { useState } from "react";

interface WaveformBarProps {
  heights: number[];
  progress: number;
  activeColor: string;
  isPlaying: boolean;
  onBarClick: (percent: number) => void;
}

function WaveformBars({ heights, progress, activeColor, isPlaying, onBarClick }: WaveformBarProps) {
  return (
    <div 
      className="flex items-end gap-[2px] h-12 w-full cursor-pointer relative"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        onBarClick(percent);
      }}
    >
      {heights.map((h, idx) => {
        const barPercent = (idx / heights.length) * 100;
        const isPassed = progress > barPercent;
        
        return (
          <motion.div
            key={idx}
            className="flex-1 rounded-t-[1px] transition-all duration-300"
            style={{
              height: `${h}%`,
              backgroundColor: isPassed 
                ? activeColor 
                : "rgba(255, 255, 255, 0.15)",
              boxShadow: isPassed && isPlaying
                ? `0 0 8px ${activeColor}`
                : "none"
            }}
            animate={isPlaying && isPassed ? {
              scaleY: [1, 1.15, 1]
            } : { scaleY: 1 }}
            transition={{
              duration: 0.5,
              repeat: isPlaying && isPassed ? Infinity : 0,
              delay: idx * 0.02
            }}
          />
        );
      })}
    </div>
  );
}

export default function Featured() {
  const { isPlaying, togglePlay, selectTrack, currentTrackIndex, progress, tracks } = useAudio();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate static waveforms (represented as height percentages from 20 to 100)
  const [waveformHeights] = useState<number[][]>(() => {
    return tracks.map(() => 
      Array.from({ length: 45 }, () => Math.floor(Math.random() * 80) + 20)
    );
  });

  const handlePlayToggle = (index: number) => {
    if (currentTrackIndex === index) {
      togglePlay();
    } else {
      selectTrack(index);
      if (!isPlaying) togglePlay();
    }
  };

  const handleSeek = (percent: number) => {
    // Simulated seek - in our procedural engine, we can update elapsed timers or print logs
    console.log("Waveform seeked to:", Math.floor(percent * 100) + "%");
  };

  // Popularity percentage simulator
  const popularityScores = [96, 88, 75, 92];

  return (
    <section 
      id="featured" 
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-5xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">FEATURED MUSIC</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Interactive Singles
          </h3>
        </div>

        {/* Music Cards Stack */}
        <div className="space-y-6">
          {tracks.map((track, idx) => {
            const isCurrent = currentTrackIndex === idx;
            const isHovered = hoveredIndex === idx;
            const accentColor = track.color;
            const score = popularityScores[idx];

            return (
              <motion.div
                key={track.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="w-full rounded-2xl glass p-4 md:p-6 border border-white/10 relative transition-all duration-500 overflow-hidden flex flex-col gap-5"
                style={{
                  boxShadow: isHovered 
                    ? `0 15px 35px ${accentColor}10, inset 0 0 10px ${accentColor}05`
                    : "none",
                  borderColor: isHovered ? `${accentColor}30` : "rgba(255, 255, 255, 0.08)"
                }}
              >
                {/* Background glow highlights */}
                <div 
                  className="absolute inset-y-0 left-0 w-1 transition-all duration-500"
                  style={{
                    backgroundColor: accentColor,
                    height: isHovered || isCurrent ? "100%" : "40%",
                    top: isHovered || isCurrent ? "0%" : "30%"
                  }}
                />

                {/* Left Side: Index, Play Control, Titles */}
                <div className="flex items-center gap-4 text-left">
                  {/* Play circle */}
                  <button
                    onClick={() => handlePlayToggle(idx)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-black hover:scale-105 transition-all shadow-md cursor-pointer shrink-0"
                    style={{ backgroundColor: accentColor }}
                    data-cursor="magnetic"
                  >
                    {isCurrent && isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="flex flex-col select-none">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono opacity-30">0{idx + 1}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70 text-[9px] uppercase tracking-wider">
                        {track.genre}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-white tracking-wider uppercase mt-1">
                      {track.title}
                    </span>
                    <span className="text-xs text-white/50">
                      Album: {track.album}
                    </span>
                  </div>
                </div>

                {/* Center Waveform Player (Visual Slider) */}
                <div className="flex-1 w-full flex flex-col justify-center">
                  <WaveformBars
                    heights={waveformHeights[idx]}
                    progress={isCurrent ? progress : 0}
                    activeColor={accentColor}
                    isPlaying={isCurrent && isPlaying}
                    onBarClick={(p) => isCurrent && handleSeek(p)}
                  />
                  <div className="flex justify-between items-center text-[9px] text-white/40 tracking-wider font-mono mt-2">
                    <span>{isCurrent && isPlaying ? "PLAYING AUDIO PREVIEW" : "PREVIEW TRACK"}</span>
                    <span>{track.duration}</span>
                  </div>
                </div>

                {/* Right Side: Popularity and Actions */}
                <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
                  {/* Popularity indicator */}
                  <div className="flex flex-col text-left md:text-right">
                    <span className="text-[8px] text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1 justify-start md:justify-end">
                      <Flame className="w-3 h-3 text-gold" /> Popularity
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Micro progress bar */}
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden hidden md:block">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${score}%`,
                            backgroundColor: accentColor
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-white/80">{score}%</span>
                    </div>
                  </div>

                  {/* Icon Actions */}
                  <div className="flex gap-2 text-white/55">
                    <button className="p-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
