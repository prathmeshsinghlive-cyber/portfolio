"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, Clock, X, Film, Activity } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  category: "Music Videos" | "Live Shows" | "Studio Sessions" | "Behind the Scenes" | "Rehearsals";
  views: string;
  duration: string;
  description: string;
  accent: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Nebula (Official Music Video)",
    category: "Music Videos",
    views: "12.4M",
    duration: "3:45",
    description: "An award-winning psychedelic voyage into cosmic voids, utilizing 3D generative particles.",
    accent: "#8A2BE2" // Purple
  },
  {
    id: "vid-2",
    title: "Supernova Live in London",
    category: "Live Shows",
    views: "5.2M",
    duration: "5:30",
    description: "Multi-camera recording at the Royal Arena, featuring a 60-piece orchestra and fog effects.",
    accent: "#0070f3" // Blue
  },
  {
    id: "vid-3",
    title: "Midnight Drive - Berlin Studio",
    category: "Studio Sessions",
    views: "1.8M",
    duration: "6:15",
    description: "A raw look inside the synthesizers and drum machines used to compose the cyber-synthwave basslines.",
    accent: "#FF69B4" // Pink
  },
  {
    id: "vid-4",
    title: "Designing the Tour lasers",
    category: "Behind the Scenes",
    views: "920K",
    duration: "10:42",
    description: "Interview with spatial design specialists discussing laser projection maps and audio sync.",
    accent: "#D4AF37" // Gold
  },
  {
    id: "vid-5",
    title: "Acoustic Horizon Rehearsal",
    category: "Rehearsals",
    views: "640K",
    duration: "4:02",
    description: "Unplugged vocal session inside Copenhagen's stone cathedral prior to the Grand Tour.",
    accent: "#FF69B4" // Pink
  }
];

const CATEGORIES = ["All", "Music Videos", "Live Shows", "Studio Sessions", "Behind the Scenes", "Rehearsals"];

export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos = activeCategory === "All" 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === activeCategory);

  return (
    <section 
      id="gallery" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">VIDEO GALLERY</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Cinematic Screenings
          </h3>
        </div>

        {/* Category Filters bar */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 justify-start select-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all uppercase border cursor-pointer ${
                  isActive 
                    ? "bg-foreground text-background border-foreground font-semibold"
                    : "bg-white/5 border-white/5 text-foreground/60 hover:text-white hover:bg-white/10"
                }`}
                data-cursor="magnetic"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((vid) => (
              <motion.div
                key={vid.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedVideo(vid)}
                className="rounded-2xl glass border border-white/10 overflow-hidden cursor-pointer h-80 flex flex-col justify-between p-5 relative group"
                data-cursor="play"
              >
                {/* Visualizer background representation */}
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${vid.accent} 0%, transparent 80%)`
                  }}
                />
                
                {/* Hover scanline film grain grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                {/* Top: Category Tag and play counts */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded text-[8px] bg-white/5 border border-white/5 text-white/50 tracking-widest uppercase font-mono">
                    {vid.category}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-white/40 font-mono">
                    <Eye className="w-3 h-3 text-gold" />
                    <span>{vid.views}</span>
                  </div>
                </div>

                {/* Center: Play Circle symbol */}
                <div className="relative z-10 my-auto flex justify-center items-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-[#050505]/60 text-white group-hover:text-black group-hover:border-gold transition-colors relative shadow-lg"
                    style={{
                      boxShadow: `0 0 20px ${vid.accent}15`
                    }}
                  >
                    {/* Pulsing ring inside */}
                    <div 
                      className="absolute inset-[-4px] rounded-full border border-current opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                      style={{ color: vid.accent }}
                    />
                    <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
                  </motion.div>
                </div>

                {/* Bottom: Titles and run times */}
                <div className="relative z-10 text-left space-y-1">
                  <div className="flex justify-between items-end gap-4">
                    <span className="text-sm font-bold text-white tracking-wide uppercase truncate">
                      {vid.title}
                    </span>
                    <span className="text-[10px] text-white/50 font-mono flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5" /> {vid.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed font-light line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4. CINEMATIC VIDEO LIGHTBOX PLAYBACK MODAL */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="w-full max-w-4xl glass-premium rounded-3xl border border-white/10 p-4 relative aspect-[16/10] overflow-hidden flex flex-col justify-between"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-[10]"
                  data-cursor="magnetic"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* 1. VIDEO SIMULATION SCREEN */}
                <div className="w-full h-[85%] rounded-2xl bg-zinc-950 flex flex-col items-center justify-center overflow-hidden relative border border-white/5">
                  
                  {/* CRT Screen Scanlines / Noise overlays */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-30 pointer-events-none z-10" />
                  
                  {/* Floating abstract film dots / lasers simulating playback */}
                  <div 
                    className="absolute w-32 h-32 rounded-full blur-[80px] opacity-25 pointer-events-none"
                    style={{
                      backgroundColor: selectedVideo.accent,
                      animation: "mesh-movement 8s ease infinite"
                    }}
                  />
                  
                  {/* Cinematic visualizer representation inside screen */}
                  <div className="w-48 h-12 opacity-40 z-10">
                    <Activity className="w-16 h-16 text-white/30 animate-pulse mx-auto" />
                  </div>

                  <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase mt-4 z-10 flex items-center gap-2">
                    <Film className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: "6s" }} /> 
                    STREAMS IN PROGRESS // PRATHMESH_SINGH.DECK
                  </span>
                </div>

                {/* 2. PLAYBACK CONTROLLER TIMELINE BAR */}
                <div className="w-full h-[15%] pt-3 flex flex-col justify-end text-left">
                  {/* Simulated seeker line */}
                  <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden cursor-pointer mb-3">
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 top-0 h-full"
                      style={{ backgroundColor: selectedVideo.accent }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-white/60">
                    <div className="flex flex-col">
                      <span className="font-bold text-white uppercase tracking-wider">{selectedVideo.title}</span>
                      <span className="text-[9px] tracking-wider text-white/40 uppercase mt-0.5">{selectedVideo.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <span>0:45</span>
                      <span>/</span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
