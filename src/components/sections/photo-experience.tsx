"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Heart, ZoomIn } from "lucide-react";

interface PhotoItem {
  id: string;
  title: string;
  location: string;
  year: string;
  accent: string;
  height: string; // for masonry height simulation
}

const PHOTOS: PhotoItem[] = [
  { id: "photo-1", title: "Midnight Solitude", location: "Berlin Studio", year: "2025", accent: "#8A2BE2", height: "h-64" },
  { id: "photo-2", title: "Orchestral Rehearsals", location: "Copenhagen Cathedral", year: "2024", accent: "#FF69B4", height: "h-80" },
  { id: "photo-3", title: "Stadium Waves", location: "Royal Arena, London", year: "2026", accent: "#D4AF37", height: "h-96" },
  { id: "photo-4", title: "Studio Light Capture", location: "Tokyo Session", year: "2025", accent: "#0070f3", height: "h-80" },
  { id: "photo-5", title: "Backstage Spotlight", location: "Madison Square Garden", year: "2026", accent: "#D4AF37", height: "h-64" },
  { id: "photo-6", title: "Desert Drone Shoot", location: "Nevada Dunes", year: "2023", accent: "#8A2BE2", height: "h-96" }
];

export default function PhotoExperience() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      id="photos" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">PHOTO EXPERIENCE</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Visual Still Archives
          </h3>
        </div>

        {/* 3-Column Masonry layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {PHOTOS.map((photo) => {
            const isLiked = likedPhotos[photo.id];
            
            return (
              <motion.div
                key={photo.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPhoto(photo)}
                className={`break-inside-avoid w-full rounded-2xl glass border border-white/10 overflow-hidden cursor-pointer relative group flex flex-col justify-between p-4 ${photo.height}`}
                data-cursor="view"
              >
                {/* Simulated photo background shape */}
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${photo.accent} 0%, transparent 80%)`
                  }}
                />

                {/* Film framing grain */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

                {/* Top header stats */}
                <div className="relative z-10 flex justify-between items-center text-white/50 text-[9px] font-mono">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-gold" />
                    {photo.location}
                  </span>
                  <span>{photo.year}</span>
                </div>

                {/* Center zoom icon on hover */}
                <div className="relative z-10 my-auto flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom details */}
                <div className="relative z-10 flex justify-between items-end gap-4 border-t border-white/5 pt-3">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white tracking-wide uppercase">
                      {photo.title}
                    </span>
                    <span className="text-[8px] tracking-widest text-white/30 uppercase mt-0.5 font-mono">
                      Prathmesh Singh Photography
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleLike(photo.id, e)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-pink text-pink" : "text-white/60"}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
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
                className="w-full max-w-2xl glass-premium rounded-3xl border border-white/10 p-5 relative overflow-hidden text-center flex flex-col justify-between"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-[10]"
                  data-cursor="magnetic"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Large visual representation inside */}
                <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 flex flex-col items-center justify-center overflow-hidden relative border border-white/5">
                  <div 
                    className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${selectedPhoto.accent} 0%, transparent 80%)`
                    }}
                  />
                  
                  {/* Outer geometric rings */}
                  <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center relative">
                    <Camera className="w-16 h-16 text-white/10" />
                    <div className="absolute inset-[-10px] rounded-full border border-gold/10 animate-pulse" />
                  </div>

                  <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase mt-6 select-none font-mono">
                    STILL REVEAL // SHUTTER v1.2
                  </span>
                </div>

                {/* Description below */}
                <div className="pt-4 text-left flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-widest uppercase">
                      {selectedPhoto.title}
                    </span>
                    <span className="text-[10px] text-gold font-mono tracking-widest mt-1">
                      Shoot Spot: {selectedPhoto.location} // {selectedPhoto.year}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => toggleLike(selectedPhoto.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-white/80"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedPhotos[selectedPhoto.id] ? "fill-pink text-pink" : "text-white/40"}`} />
                    <span>{likedPhotos[selectedPhoto.id] ? "Saved" : "Save Still"}</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
