"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Music, Disc, Globe, Heart } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { icon: <Disc className="w-5 h-5" />, value: 48, suffix: "", label: "Songs Released" },
  { icon: <Music className="w-5 h-5" />, value: 850, suffix: "M", label: "Global Streams" },
  { icon: <Globe className="w-5 h-5" />, value: 35, suffix: "", label: "Countries Performed" },
  { icon: <Award className="w-5 h-5" />, value: 12, suffix: "+", label: "Awards Won" },
  { icon: <Heart className="w-5 h-5" />, value: 4, suffix: "M+", label: "Fan Community" },
];



function CountUp({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const incrementTime = 40;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// Separate state component import since we need useState/useEffect inside CountUp
import { useState, useEffect } from "react";

export default function About() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const bioRef = useRef<HTMLDivElement | null>(null);
  const bioInView = useInView(bioRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      {/* Background lyrics overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-5 font-serif-lux italic text-5xl md:text-8xl text-foreground flex flex-col justify-around overflow-hidden pl-10">
        <div className="transform translate-x-[-10%]">“Lost inside a stellar dream, echoing forever...”</div>
        <div className="transform translate-x-[20%]">“The synthetic warmth is all we need to breathe...”</div>
        <div className="transform translate-x-[-5%]">“Drifting slowly to the edge of the sky...”</div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">ABOUT THE ARTIST</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            The Story Behind the Voice
          </h3>
        </div>

        {/* Narrative & Floating Collage Grid */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Biography text */}
          <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed font-light text-sm md:text-base text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Prathmesh Singh is an artist who refuses to reside inside conventional boundaries. Born in Florence, Italy, and trained in classical opera, he broke away from traditional theaters to explore the experimental depths of underground electronic synthesizers in Berlin.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              His style combines the structural majesty of orchestrations with gritty, low-frequency sub-bass and futuristic vocal layering. As a creative director, he designs his concerts as comprehensive narrative events—integrating sound, light wave lasers, and digital interactive technology to create an environment rather than just a stage.
            </motion.p>

            {/* SVG Signature Reveal */}
            <div className="pt-4 flex flex-col items-start gap-1 select-none">
              <span className="text-[10px] tracking-wider text-white/40 uppercase">Handwritten Signature</span>
              <svg 
                width="180" 
                height="60" 
                viewBox="0 0 180 60" 
                className="text-gold"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Simulated handwritten name "Prathmesh Singh" */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={bioInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2.0, delay: 0.4, ease: "easeInOut" }}
                  d="M15,45 C25,25 35,5 40,25 C45,45 50,45 60,35 C70,25 80,10 75,30 C70,50 85,35 95,25 C105,15 110,40 120,30 C130,20 135,15 140,28 C145,40 150,30 160,20"
                />
                {/* Cross loops */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={bioInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.2, delay: 1.8, ease: "easeInOut" }}
                  d="M30,30 L165,22 M148,22 C148,10 155,10 156,22"
                />
              </svg>
            </div>
          </div>

          {/* Floating Image Collage */}
          <div className="lg:col-span-5 relative h-[350px] flex items-center justify-center">
            {/* Card 1: Backing Blur shadow */}
            <div className="absolute w-56 h-72 rounded-2xl bg-gradient-to-tr from-purple/30 to-gold/30 blur-2xl opacity-60 pointer-events-none" />

            {/* Card 2: Main Portrait Frame */}
            <motion.div
              initial={{ opacity: 0, rotate: -4, x: -20 }}
              animate={bioInView ? { opacity: 1, rotate: -6, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="absolute w-56 h-72 rounded-2xl glass p-3 border border-white/10 shadow-2xl flex flex-col justify-between"
              data-cursor="view"
            >
              {/* Geometric Portrait Canvas placeholder */}
              <div className="w-full h-[80%] rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple/40 to-zinc-950 opacity-80" />
                <Globe className="w-12 h-12 text-gold animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <div className="text-[10px] text-center tracking-widest text-white/50 uppercase">
                STUDIO PROFILE // BRLN
              </div>
            </motion.div>

            {/* Card 3: Overlapping Detail Frame */}
            <motion.div
              initial={{ opacity: 0, rotate: 6, x: 30, y: 40 }}
              animate={bioInView ? { opacity: 1, rotate: 8, x: 20, y: 30 } : {}}
              transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.15 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="absolute w-44 h-56 rounded-2xl glass p-2.5 border border-white/10 shadow-2xl flex flex-col justify-between"
              data-cursor="view"
            >
              <div className="w-full h-[75%] rounded-lg bg-zinc-850 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 to-zinc-950 opacity-90" />
                <Award className="w-8 h-8 text-gold animate-bounce" />
              </div>
              <div className="text-[8px] text-center tracking-widest text-gold uppercase font-bold">
                LIVE STAGE 2026
              </div>
            </motion.div>
          </div>

        </div>

        {/* Streaming / Experience Statistics Counter grid */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 border-y border-white/5 py-12 mb-24 text-center"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold mb-3 border border-white/5">
                {stat.icon}
              </div>
              <span className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">
                <CountUp value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
