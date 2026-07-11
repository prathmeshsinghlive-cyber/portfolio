"use client";

import { motion } from "framer-motion";
import { Award, Zap, BookOpen, Quote, Sparkles } from "lucide-react";
import { useState } from "react";

interface Honor {
  year: string;
  award: string;
  category: string;
  glowingColor: string;
}

const HONORS: Honor[] = [
  { year: "2024", award: "Grammy Award", category: "Best Vocal Album - 'Stellar Echoes'", glowingColor: "rgba(212, 175, 55, 0.4)" }, // Gold
  { year: "2023", award: "Billboard Music Award", category: "Top Electronic Vocalist", glowingColor: "rgba(0, 112, 243, 0.3)" }, // Blue
  { year: "2022", award: "Grammy Award", category: "Best New Artist Nominee", glowingColor: "rgba(138, 43, 226, 0.4)" }, // Purple
  { year: "2021", award: "Platinum Plaque", category: "Single 'Nebula' - 2M Units Sold", glowingColor: "rgba(255, 105, 180, 0.3)" } // Pink
];

interface Press {
  publication: string;
  quote: string;
  date: string;
  rating: string;
}

const PRESS_LOGS: Press[] = [
  { publication: "VOGUE", quote: "Prathmesh Singh is redefining luxury music. His shows feel like high-end fashion shows set inside a cyber cathedral.", date: "Feb 2026", rating: "★★★★★" },
  { publication: "ROLLING STONE", quote: "A stunning vocal performance that blends technical opera mastery with the grittiest synthesisers of the decade.", date: "Jan 2026", rating: "4.8/5" },
  { publication: "WIRED", quote: "Prathmesh Singh's collaborative Web Audio engines represent a massive leap in how fans interact with composition.", date: "Nov 2025", rating: "9.5/10" }
];

export default function AchievementsMedia() {
  const [hoveredAward, setHoveredAward] = useState<number | null>(null);

  return (
    <section 
      id="achievements" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Animated Award Wall */}
        <div className="lg:col-span-6 flex flex-col text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">HONORS & TROPHIES</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic mb-10">
            Aura Award Wall
          </h3>

          <div className="space-y-6">
            {HONORS.map((hon, idx) => {
              const isHovered = hoveredAward === idx;
              
              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredAward(idx)}
                  onMouseLeave={() => setHoveredAward(null)}
                  className="rounded-2xl glass p-5 border border-white/10 relative transition-all duration-500 overflow-hidden flex items-center justify-between"
                  style={{
                    boxShadow: isHovered 
                      ? `0 15px 30px ${hon.glowingColor}` 
                      : "none",
                    borderColor: isHovered 
                      ? "rgba(212, 175, 55, 0.4)" 
                      : "rgba(255, 255, 255, 0.08)"
                  }}
                >
                  {/* Glowing core behind trophy */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 10% center, ${hon.glowingColor} 0%, transparent 60%)`
                    }}
                  />

                  <div className="flex items-center gap-4">
                    {/* Glowing Trophy Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold shadow-md shrink-0 transition-transform duration-500"
                      style={{
                        transform: isHovered ? "rotate(10deg) scale(1.05)" : "none"
                      }}
                    >
                      <Award className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                        {hon.year} // GLOBAL ACCOLADE
                      </span>
                      <span className="text-sm font-bold text-white tracking-wide uppercase mt-0.5">
                        {hon.award}
                      </span>
                      <span className="text-xs text-white/60 font-light mt-0.5">
                        {hon.category}
                      </span>
                    </div>
                  </div>

                  <Sparkles 
                    className={`w-4 h-4 text-gold/40 shrink-0 transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-20"
                    }`} 
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Media Coverage & Newspaper reveal */}
        <div className="lg:col-span-6 flex flex-col text-left justify-center">
          <span className="text-[10px] tracking-[0.35em] font-bold text-purple uppercase mb-2">PRESS COVERAGE</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic mb-10">
            Critical Reception
          </h3>

          <div className="space-y-8">
            {PRESS_LOGS.map((press, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                className="relative pl-6 border-l border-white/10 flex flex-col items-start gap-3"
              >
                {/* Glowing quote indicator */}
                <div className="absolute left-[-2.5px] top-0 bottom-0 w-[5px] bg-purple/30 rounded-full" />
                
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black tracking-widest text-white">
                    {press.publication}
                  </span>
                  <span className="text-[9px] font-mono text-gold px-2 py-0.5 rounded bg-gold/5 border border-gold/10">
                    {press.rating}
                  </span>
                </div>

                <p className="font-serif-lux italic text-sm md:text-base text-white/80 leading-relaxed max-w-md">
                  “{press.quote}”
                </p>

                <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>REVIEW LOGGED: {press.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
export type { Honor, Press };
