"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Play, Pause, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatarColor: string;
  voiceDuration: string;
}

const ITEMS: Testimonial[] = [
  {
    id: "fan-1",
    name: "Clara Vance",
    location: "Berlin, DE",
    quote: "Seeing Prathmesh Singh live was a religious experience. The way the lasers intersected with the orchestral strings during Nebula was absolutely breathtaking.",
    avatarColor: "from-purple to-pink",
    voiceDuration: "0:24"
  },
  {
    id: "fan-2",
    name: "Marcus Kane",
    location: "London, UK",
    quote: "His web visualizer synthesizer is pure genius. I spent hours playing notes inside the browser. Prathmesh Singh is truly pushing music into the web future.",
    avatarColor: "from-gold to-orange-500",
    voiceDuration: "0:15"
  },
  {
    id: "fan-3",
    name: "Saki Nakamura",
    location: "Tokyo, JP",
    quote: "Prathmesh Singh blends classical vocals and aggressive synths like no one else. His lyrics feel like poetry from a parallel dimension.",
    avatarColor: "from-blue to-purple",
    voiceDuration: "0:32"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ITEMS.length);
    setPlayingVoiceId(null);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
    setPlayingVoiceId(null);
  };

  const togglePlayVoice = (id: string) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(id);
      // Simulate auto stop after 3 seconds
      setTimeout(() => {
        setPlayingVoiceId((prev) => (prev === id ? null : prev));
      }, 4000);
    }
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-center">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">FAN TESTIMONIALS</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Voices of the Community
          </h3>
        </div>

        {/* 3D Stacked Cards Carousel Container */}
        <div className="relative w-full h-[360px] flex items-center justify-center select-none">
          {ITEMS.map((item, idx) => {
            // Calculate 3D offset placement relative to active index
            let offset = idx - activeIndex;
            if (offset < -1) offset += ITEMS.length;
            if (offset > 1) offset -= ITEMS.length;

            const isActive = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            let x = 0;
            let scale = 1;
            let rotate = 0;
            let zIndex = 10;
            let opacity = 1;

            if (isActive) {
              x = 0;
              scale = 1.0;
              rotate = 0;
              zIndex = 30;
            } else if (isPrev) {
              x = -220;
              scale = 0.85;
              rotate = -6;
              zIndex = 20;
              opacity = 0.55;
            } else if (isNext) {
              x = 220;
              scale = 0.85;
              rotate = 6;
              zIndex = 20;
              opacity = 0.55;
            } else {
              opacity = 0;
              zIndex = 0;
            }

            const isVoicePlaying = playingVoiceId === item.id;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x,
                  scale,
                  rotate,
                  zIndex,
                  opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 18
                }}
                onClick={() => {
                  if (!isActive) setActiveIndex(idx);
                }}
                className={`absolute w-full max-w-[380px] rounded-3xl glass p-6 md:p-8 border border-white/10 shadow-2xl flex flex-col justify-between cursor-pointer ${
                  isActive ? "cursor-default" : "pointer-events-auto"
                }`}
                style={{ originY: 0.5 }}
              >
                {/* Quotation icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-gold/30" />
                  <span className="text-[9px] font-mono text-white/40 tracking-wider">FAN TRANSMISSION</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-white/90 font-light leading-relaxed text-left italic mb-6">
                  “{item.quote}”
                </p>

                {/* Simulated voice message note */}
                <div className="bg-black/30 rounded-2xl p-3 border border-white/5 flex items-center justify-between gap-4 mb-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isActive) togglePlayVoice(item.id);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-black transition-all ${
                      isActive ? "hover:scale-105 active:scale-95" : "opacity-50 pointer-events-none"
                    }`}
                    style={{ backgroundColor: isVoicePlaying ? "#FF69B4" : "#D4AF37" }}
                  >
                    {isVoicePlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current animate-pulse" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Micro equalizers simulating audio playback */}
                  <div className="flex-1 flex items-center gap-[2.5px] h-6 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <motion.span
                        key={i}
                        animate={isVoicePlaying ? {
                          height: [3, Math.floor(Math.random() * 16) + 4, 3]
                        } : { height: 3 }}
                        transition={{
                          duration: 0.4 + i * 0.05,
                          repeat: isVoicePlaying ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                        className="w-[2px] bg-white/40 rounded-full"
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-white/40 tracking-wider">
                    {item.voiceDuration}
                  </span>
                </div>

                {/* Profile info */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  {/* Floating Avatar circle */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarColor} shrink-0 shadow-inner`} />
                  
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                      {item.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full glass border border-white/10 hover:border-gold text-foreground hover:text-gold transition-colors cursor-pointer"
            data-cursor="magnetic"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-mono text-white/40 tracking-widest">
            0{activeIndex + 1} / 0{ITEMS.length}
          </span>

          <button 
            onClick={handleNext}
            className="p-3 rounded-full glass border border-white/10 hover:border-gold text-foreground hover:text-gold transition-colors cursor-pointer"
            data-cursor="magnetic"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
