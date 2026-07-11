"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { motion } from "framer-motion";
import VinylPlayer from "@/components/ui/vinyl-player";
import AudioVisualizer from "@/components/ui/audio-visualizer";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";

export default function Hero() {
  const { isPlaying, togglePlay, nextTrack, prevTrack, tracks, currentTrackIndex } = useAudio();
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeTrack = tracks[currentTrackIndex];

  // 1. Canvas Interactive Starfield Particle System
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() * 0.2 - 0.1),
        opacity: Math.random() * 0.6 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update global CSS variables for CSS Spotlights
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle background laser line sweeps (Concert Laser Effect)
      if (isPlaying) {
        ctx.strokeStyle = `${activeTrack.color}15`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.3, 0);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        
        ctx.strokeStyle = `${activeTrack.color}08`;
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.7, 0);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }

      particles.forEach((p) => {
        // Move particles upwards
        p.y += p.speedY;
        p.x += p.speedX;

        // Subtle attraction to mouse coordinates
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x += dx * 0.002;
          p.y += dy * 0.002;
        }

        // Wrap around screen boundaries
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        // Pulsate opacity
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.008;
        const clampedOpacity = Math.max(0.1, Math.min(0.8, p.opacity));

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${clampedOpacity})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = activeTrack.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPlaying, activeTrack.color]);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden px-6 md:px-16"
    >
      {/* 1. INTERACTIVE CANVAS BACKDROP */}
      <canvas ref={particleCanvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" />
      
      {/* 2. GRADIENT SPOTLIGHT & MESH GRADIENTS */}
      <div className="mesh-gradient" />
      <div className="spotlight" />

      {/* 3. HERO CONTENT GRID */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Cinematic Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase">Prathmesh Singh</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-light leading-none tracking-tight text-foreground select-none">
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block font-serif-lux italic font-light"
            >
              The Sound of
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block font-black tracking-tighter uppercase"
            >
              Pure Resonance
            </motion.span>
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-foreground/70 text-sm md:text-base max-w-md mt-6 leading-relaxed font-light"
          >
            Enter a digital concert journey built on raw orchestral soul and deep cyber synthwave beats. Hear the procedurally generated soundscapes shift dynamically as you browse.
          </motion.p>

          {/* CTA Button Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <button
              onClick={togglePlay}
              className="px-8 py-3.5 rounded-full bg-foreground text-background hover:bg-gold hover:text-black transition-all duration-300 font-bold text-xs uppercase tracking-widest cursor-pointer flex items-center gap-2.5 shadow-lg shadow-black/10"
              data-cursor="magnetic"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              <span>{isPlaying ? "PAUSE AUDIO" : "LISTEN NOW"}</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side: 3D Vinyl Player Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, type: "spring" }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="relative group">
            {/* Soft decorative background glow */}
            <div 
              className="absolute inset-[-20px] rounded-full blur-3xl opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundColor: activeTrack.color }}
            />
            <VinylPlayer size="lg" />
          </div>
        </motion.div>

      </div>

      {/* 4. FLOATING GLASS MUSIC PLAYER COMPONENT */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-10 left-6 right-6 md:left-auto md:right-16 z-20 md:w-96 glass-premium p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4"
        style={{
          boxShadow: isPlaying 
            ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 15px ${activeTrack.color}15`
            : "0 20px 40px rgba(0, 0, 0, 0.3)"
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center relative overflow-hidden shrink-0 border border-white/10"
          >
            {/* Abstract thumbnail colored by active track */}
            <div 
              className="absolute inset-0 transition-colors duration-500"
              style={{
                background: `linear-gradient(135deg, ${activeTrack.color}80, #000000)`
              }}
            />
            <Music className="w-5 h-5 text-white/70 relative z-10" />
          </div>

          <div className="flex flex-col select-none text-left">
            <span className="text-[9px] text-white/40 uppercase tracking-widest">Active Player</span>
            <span className="text-xs font-bold text-white tracking-wider max-w-[140px] truncate">
              {activeTrack.title}
            </span>
            <span className="text-[10px] text-white/60 truncate max-w-[140px]">
              {activeTrack.album}
            </span>
          </div>
        </div>

        {/* Real-time equalizers */}
        <div className="w-20 h-10 shrink-0">
          <AudioVisualizer type="bars" color={activeTrack.color} barWidth={2} gap={1} multiplier={0.8} />
        </div>

        {/* Control Button panel */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            onClick={prevTrack} 
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            title="Previous"
            data-cursor="magnetic"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          
          <button 
            onClick={togglePlay} 
            className="p-2 rounded-full text-black hover:scale-105 active:scale-95 transition-all shadow-md"
            style={{ backgroundColor: activeTrack.color }}
            title={isPlaying ? "Pause" : "Play"}
            data-cursor="magnetic"
          >
            {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
          </button>

          <button 
            onClick={nextTrack} 
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            title="Next"
            data-cursor="magnetic"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* 5. MOUSE SCROLL DOWN INDICATOR */}
      <div 
        onClick={() => handleScrollToSection("about")}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 z-20 text-foreground/45 hover:text-gold transition-colors duration-300 hidden md:flex"
      >
        <span className="text-[8px] tracking-[0.25em] uppercase font-bold">SCROLL</span>
        {/* Animated wheel mouse */}
        <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-current rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
