"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Sparkles } from "lucide-react";

interface GoodPhoto {
  id: string;
  src: string;
  span: string; // Tailwind grid span classes for dynamic canvas layout
  aspect: string;
  tilt: string; // Initial subtle tilt angle
  label: string;
}

const PRESS_PHOTOS: GoodPhoto[] = [
  {
    id: "photo-1",
    src: "/Some Good Photos/DSC02063.JPG",
    span: "col-span-1 md:col-span-2 row-span-2",
    aspect: "aspect-[4/5]",
    tilt: "hover:rotate-0 -rotate-1",
    label: "Studio & Stage Vibe",
  },
  {
    id: "photo-2",
    src: "/Some Good Photos/DSC09009.JPG",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 rotate-1",
    label: "Live Energy",
  },
  {
    id: "photo-3",
    src: "/Some Good Photos/_DSC6760.JPG",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 -rotate-1",
    label: "Moments",
  },
  {
    id: "photo-4",
    src: "/Some Good Photos/_KKK1363-01.jpeg",
    span: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
    tilt: "hover:rotate-0 rotate-1",
    label: "Acoustic Session",
  },
  {
    id: "photo-5",
    src: "/Some Good Photos/IMG_0377.jpg",
    span: "col-span-1 row-span-2",
    aspect: "aspect-[3/4]",
    tilt: "hover:rotate-0 -rotate-2",
    label: "Golden Hour",
  },
  {
    id: "photo-6",
    src: "/Some Good Photos/_DSC9696.jpeg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 rotate-2",
    label: "Raw Emotion",
  },
  {
    id: "photo-7",
    src: "/Some Good Photos/_DSC9697.jpeg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 -rotate-1",
    label: "Unfiltered",
  },
  {
    id: "photo-8",
    src: "/Some Good Photos/26085cf4-afcd-4a60-8432-63892def5801.jpg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 rotate-1",
    label: "Behind the Canvas",
  },
  {
    id: "photo-9",
    src: "/Some Good Photos/8b88f013-c5a2-4159-8246-a91b254a9365.jpg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 -rotate-2",
    label: "Candid Still",
  },
  {
    id: "photo-10",
    src: "/Some Good Photos/DSC02064.JPG",
    span: "col-span-1 row-span-2",
    aspect: "aspect-[3/4]",
    tilt: "hover:rotate-0 rotate-1",
    label: "Stage Light",
  },
  {
    id: "photo-11",
    src: "/Some Good Photos/DSC_9116.JPG",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 -rotate-1",
    label: "After Song Glow",
  },
  {
    id: "photo-12",
    src: "/Some Good Photos/f4f079e6-f0e6-4e8a-8782-3feac06e64e4.jpg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 rotate-2",
    label: "Melody Capture",
  },
  {
    id: "photo-13",
    src: "/Some Good Photos/IMG-20250119-WA0017.jpg",
    span: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
    tilt: "hover:rotate-0 -rotate-1",
    label: "Professionalism and Profession Perfect Combo",
  },
  {
    id: "photo-14",
    src: "/Some Good Photos/IMG-20250805-WA0022.jpg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 rotate-1",
    label: "Studio Corner",
  },
  {
    id: "photo-15",
    src: "/Some Good Photos/IMG20250421203958.jpg",
    span: "col-span-1 row-span-1",
    aspect: "aspect-square",
    tilt: "hover:rotate-0 -rotate-2",
    label: "Soundcheck",
  },
  {
    id: "photo-16",
    src: "/Some Good Photos/IMG_2605.JPG",
    span: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
    tilt: "hover:rotate-0 rotate-1",
    label: "Peace Trip",
  },
  {
    id: "photo-17",
    src: "/Some Good Photos/IMG_3997.JPG",
    span: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
    tilt: "hover:rotate-0 -rotate-1",
    label: "Keep Smiling",
  },
];

interface PressPhotoModalProps {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function PressPhotoModal({ index, onClose, onPrev, onNext }: PressPhotoModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

  if (typeof window === "undefined") return null;

  const photo = PRESS_PHOTOS[index];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="w-full max-w-4xl glass-premium rounded-2xl md:rounded-3xl border border-white/10 p-3.5 sm:p-5 relative overflow-y-auto max-h-[94vh] flex flex-col items-center justify-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 p-2.5 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 transition-all z-50 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Lightbox Image */}
        <div className="w-full aspect-[4/3] md:aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden bg-black border border-white/10 relative flex items-center justify-center">
          <img
            src={encodeURI(photo.src)}
            alt={photo.label}
            className="w-full h-full object-contain"
          />

          {/* Navigation Prev/Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 border border-white/15 text-white hover:bg-black/90 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 border border-white/15 text-white hover:bg-black/90 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Footer Info */}
        <div className="w-full pt-2 flex justify-between items-center text-left">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              {photo.label}
            </span>
            <span className="text-[10px] text-gold font-mono tracking-widest mt-0.5">
              Press Photo #{String(index + 1).padStart(2, "0")} · Prathmesh Singh
            </span>
          </div>

          <span className="text-xs font-mono text-white/50">
            {index + 1} / {PRESS_PHOTOS.length}
          </span>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function AchievementsMedia() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % PRESS_PHOTOS.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + PRESS_PHOTOS.length) % PRESS_PHOTOS.length);
    }
  };

  return (
    <section 
      id="achievements" 
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">
            PRESS PHOTOS
          </span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Some Good Photos :)
          </h3>
          <p className="mt-3 text-sm text-white/40 font-light max-w-xl">
            A curated visual canvas — raw, unfiltered, and honest stills from the journey.
          </p>
        </div>

        {/* Dynamic Canvas Gallery Wall Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[160px] md:auto-rows-[220px] grid-flow-dense">
          {PRESS_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              whileHover={{ scale: 1.03, zIndex: 30 }}
              onClick={() => setSelectedIndex(idx)}
              className={`${photo.span} ${photo.tilt} relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10 bg-zinc-950 transition-all duration-300`}
            >
              {/* Photo Image */}
              <img
                src={encodeURI(photo.src)}
                alt={photo.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-85 transition-opacity" />

              {/* Shimmer Sweep on Hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "200%", opacity: 0.15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)",
                }}
              />

              {/* Corner Frame Accent */}
              <div className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-gold/80 px-2 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur-sm opacity-70 group-hover:opacity-100 transition-opacity">
                #{String(idx + 1).padStart(2, "0")}
              </div>

              {/* Zoom Icon Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-gold shadow-2xl backdrop-blur-sm">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>


            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <PressPhotoModal
              index={selectedIndex}
              onClose={() => setSelectedIndex(null)}
              onPrev={goPrev}
              onNext={goNext}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
