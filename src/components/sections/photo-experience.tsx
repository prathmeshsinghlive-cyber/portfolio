"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Heart, ZoomIn, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// ── Caption logic ──────────────────────────────────────────────────────────────
function captionFromFilename(filename: string): string {
  const noExt = filename.replace(/\.[^/.]+$/, "");

  if (/^\d+$/.test(noExt.trim())) return "🙂";
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}/i.test(noExt)) return "🙂";
  if (/^(IMG|DSC|DSC_|IMG-|temp_image|DSCN|MVI|VID|MOV|P\d)[_\-0-9]/i.test(noExt)) return "🙂";

  const stripped = noExt.replace(/^[A-Z_]+[-_]?/i, "");
  if (/^[\d_\-]+$/.test(stripped)) return "🙂";

  const cleaned = noExt
    .replace(/^\d+[\s.\-]+/, "")
    .replace(/_/g, " ")
    .trim();
  return cleaned || "🙂";
}

interface SafarImage { src: string; caption: string; }
interface SafarSection {
  id: string;
  stepNum: string;
  title: string;
  accent: string;
  images: SafarImage[];
}

const SAFAR_DATA: SafarSection[] = [
  {
    id: "industry",
    stepNum: "01",
    title: "With Industry People",
    accent: "#8A2BE2",
    images: [
      "With Amit Kilam.JPG","With Bhuwin.JPG","With Chaar Diwari.JPG","With Firdaus Band.jpg",
      "With Himanshu Joshi.JPG","With Karan Kanchan.JPG","With Laksh Maheshwari.JPG",
      "With Mukund Ramaswamy.JPG","With Osho Jain.JPG","With Piyush Bhisekar.JPG",
      "With Raghav Somani.JPG","With Raj Shekhar.JPG","With Raman Negi.JPG",
      "With Shloka.JPG","With Siddharth & Garima.JPG","With Taba Chake.JPG","With Tarsame Mittal.JPG",
    ].map(f => ({ src: encodeURI(`/Safar/1. With Industry People/${f}`), caption: captionFromFilename(f) })),
  },
  {
    id: "festivals",
    stepNum: "02",
    title: "Music Festivals, Events & Conferences",
    accent: "#D4AF37",
    images: [
      "All About Music 1 - Mumbai 2025.JPG","All About Music 2.JPG","All About Music 3.JPG",
      "Havells mYOUsic 1 - Noida 2026.JPG","Havells mYOUsic 2.JPG",
      "Vedanta Udaipur World Music Festival 1 - Udaipur 2026.JPG","Vedanta Udaipur World Music Festival 2.JPG",
    ].map(f => ({ src: encodeURI(`/Safar/2. Me at Music Festivals, Events & Conferences/${f}`), caption: captionFromFilename(f) })),
  },
  {
    id: "sponsorships",
    stepNum: "03",
    title: "Sponsorships & Support from Brands",
    accent: "#FF69B4",
    images: [
      "1 - Digital Keyboard Sponsorship from Yamaha India.jpg",
      "2 - Electric Guitar Sponsorship from Strydom Guitars.jpg",
      "3 - Enya Travel Guitar by Amazon Prime Team.JPG",
      "4.JPG","5 - Dynamic Mic Sponsorship from SHURE.JPG","6.JPG",
      "7 - Studio Monitors Sponsorship from Hayden Audio.JPG","8.JPG","9.JPG","10.jpg",
    ].map(f => ({ src: encodeURI(`/Safar/3. Sponsorships & Support from Brands/${f}`), caption: captionFromFilename(f) })),
  },
  {
    id: "rising-star",
    stepNum: "04",
    title: "Rising Star Award by Melo Works 2025",
    accent: "#FFD700",
    images: [
      "Rising Star 1.jpg","Rising Star 2.jpg","Rising Star 3.jpg",
    ].map(f => ({ src: encodeURI(`/Safar/4. Rising Star Award by Melo Works 2025/${f}`), caption: captionFromFilename(f) })),
  },
  {
    id: "competitions",
    stepNum: "05",
    title: "Wins at Music Competitions",
    accent: "#00CED1",
    images: [
      "IMG-20250420-WA0029.jpg","IMG20250216173903.jpg","IMG_20250420_163502.jpg","IMG_4409.JPG",
    ].map(f => ({ src: encodeURI(`/Safar/5. Wins at Music Competitions/${f}`), caption: captionFromFilename(f) })),
  },
  {
    id: "sennheiser",
    stepNum: "06",
    title: "Sennheiser 'Sound That Shaped Me' Contest Winner 2025",
    accent: "#FF4500",
    images: [
      "Sennheiser 1.jpg","Sennheiser 2.JPG",
    ].map(f => ({ src: encodeURI(`/Safar/6. Sennheiser Sound That Shaped Me Contest Winner 2025/${f}`), caption: captionFromFilename(f) })),
  },
  {
    id: "bts",
    stepNum: "07",
    title: "Behind the Scenes",
    accent: "#1DB954",
    images: [
      "2a70ecfd-a36e-4c23-8e0a-530be8af8901.jpg","DSC00311.JPG","DSC_2474.JPG",
      "IMG-20241207-WA0055.jpg","IMG-20250110-WA0014.jpg","IMG-20250125-WA0003.jpg",
      "IMG-20250306-WA0027.jpg","IMG-20250420-WA0037.jpg","IMG-20250420-WA0039.jpg",
      "IMG_0318.JPG","IMG_0754.jpg","IMG_20241005_223703.jpg","IMG_20250110_202134.jpg",
      "IMG_20250119_000224.jpg","IMG_20250224_094636.jpg","IMG_20250427_232059.jpg",
      "IMG_3649.JPG","IMG_3650.JPG",
      "temp_image_20250225_183710_ece47b80-718e-4db0-a874-106e70dd860d.webp",
    ].map(f => {
      const cap = captionFromFilename(f);
      return {
        src: encodeURI(`/Safar/7. Behind the Scenes/${f}`),
        caption: cap === "🙂" ? "What happens when I am not performing" : cap
      };
    }),
  },
];

// ── Slideshow Lightbox ─────────────────────────────────────────────────────────
interface LightboxProps { section: SafarSection; onClose: () => void; }

function Lightbox({ section, onClose }: LightboxProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const [liked, setLiked] = useState(false);
  const images = section.images;
  const current = images[index];
  const INTERVAL = 5000; // 5 full seconds per photo

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex(i => (i + dir + images.length) % images.length);
  }, [images.length]);

  // Reset interval timer whenever index or playing state changes
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex(i => (i + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [playing, index, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); setPlaying(p => !p); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  // Touch drag swipe handler
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      go(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      go(-1);
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-3xl glass-premium rounded-2xl md:rounded-3xl border border-white/10 p-3.5 sm:p-6 relative overflow-y-auto max-h-[94vh] flex flex-col gap-3"
        onClick={e => e.stopPropagation()}
      >
        {/* Accent glow behind */}
        <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${section.accent} 0%, transparent 80%)` }} />

        {/* Header Row: Breadcrumb & Close Button */}
        <div className="relative z-10 flex justify-between items-center pr-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white/50 uppercase font-mono truncate max-w-[200px] sm:max-w-none">
              Safar · {section.title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gold font-bold">
              {index + 1} / {images.length}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-0 top-0 p-2 sm:p-2.5 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white transition-all z-50 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Image Display Area with Touch Drag / Swipe Support */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl bg-zinc-950 overflow-hidden border border-white/10 touch-pan-y flex items-center justify-center">
          {/* Ambient blur behind current photo */}
          <div 
            className="absolute inset-0 opacity-25 blur-2xl pointer-events-none transition-all duration-500"
            style={{ backgroundImage: `url("${current.src}")`, backgroundSize: "cover", backgroundPosition: "center" }} 
          />

          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={current.src}
              alt={current.caption}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full object-contain cursor-grab active:cursor-grabbing select-none"
            />
          </AnimatePresence>

          {/* Swipe Left / Right hint overlay for mobile */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] text-white/60 font-mono pointer-events-none md:hidden backdrop-blur-sm">
            ← Swipe to view photos →
          </div>

          {/* Prev / Next Buttons */}
          <button 
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button 
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Autoplay Progress bar */}
          {playing && (
            <motion.div 
              key={`bar-${index}`} 
              className="absolute bottom-0 left-0 h-1 bg-gold z-20"
              initial={{ width: "0%" }} 
              animate={{ width: "100%" }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }} 
            />
          )}
        </div>

        {/* Bottom Metadata & Controls Row */}
        <div className="relative z-10 pt-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex flex-col text-left max-w-full">
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase line-clamp-1">
              {current.caption}
            </span>
            <span className="text-[10px] text-gold/90 font-mono tracking-wider">
              {section.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button 
              onClick={() => setPlaying(p => !p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:bg-white/20 transition-colors cursor-pointer"
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>

            <button 
              onClick={() => setLiked(l => !l)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-pink-400 text-pink-400" : "text-white/60"}`} />
              <span>{liked ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Dot Indicators Bar (Scrollable on small screens) */}
        <div className="flex gap-1.5 mt-1 overflow-x-auto py-1 px-2 justify-center max-w-full no-scrollbar">
          {images.map((_, i) => (
            <button 
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className="rounded-full transition-all duration-300 shrink-0 cursor-pointer"
              style={{ 
                width: i === index ? 22 : 7, 
                height: 7, 
                backgroundColor: i === index ? "#D4AF37" : "rgba(255,255,255,0.25)" 
              }}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PhotoExperience() {
  const [selectedSection, setSelectedSection] = useState<SafarSection | null>(null);
  const [likedSections, setLikedSections] = useState<{ [id: string]: boolean }>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="photos"
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">PHOTO EXPERIENCE</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Safar
          </h3>
          <p className="mt-3 text-sm text-white/40 font-light max-w-xl">
            A visual timeline — moments, milestones, and memories.
          </p>
        </div>

        {/* Chronological Grid — animated 01→07 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFAR_DATA.map((section, si) => {
            const isLiked = likedSections[section.id];
            const coverImg = section.images[0]?.src;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: si * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSection(section)}
                className="w-full h-72 rounded-2xl overflow-hidden cursor-pointer relative group flex flex-col justify-between p-5 bg-zinc-950 shadow-2xl"
                style={{ boxShadow: `0 4px 32px rgba(0,0,0,0.5)` }}
                data-cursor="view"
              >
                {/* Animated accent border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: `1px solid ${section.accent}` }}
                  initial={{ opacity: 0.12 }}
                  whileHover={{ opacity: 0.65 }}
                  transition={{ duration: 0.35 }}
                />

                {/* Cover image with parallax scale */}
                {coverImg && (
                  <motion.img
                    src={coverImg}
                    alt={section.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.05, opacity: 0.55 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    whileHover={{ scale: 1.1, opacity: 0.75 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                )}

                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "200%", opacity: 0.12 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  style={{
                    background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)`,
                  }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 pointer-events-none" />



                {/* Colored radial glow — more vivid on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0.08 }}
                  whileHover={{ opacity: 0.28 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `radial-gradient(circle at 60% 40%, ${section.accent} 0%, transparent 70%)` }}
                />

                {/* Top row: step badge + photo count */}
                <div className="relative z-20 flex justify-between items-center">
                  <motion.span
                    className="px-2.5 py-1 rounded-md text-[11px] font-black tracking-[0.2em] font-mono"
                    style={{
                      color: section.accent,
                      background: `${section.accent}18`,
                      border: `1px solid ${section.accent}40`,
                    }}
                  >
                    {section.stepNum}
                  </motion.span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] text-white/60 font-mono backdrop-blur-sm">
                    <Camera className="w-3 h-3" style={{ color: section.accent }} />
                    {section.images.length} photos
                  </span>
                </div>

                {/* Center — zoom icon + title peek on hover */}
                <div className="relative z-20 my-auto flex flex-col items-center gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-2xl"
                    style={{ background: `${section.accent}22` }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0, scale: 1 }}
                    whileHover={{ opacity: 1, scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ZoomIn className="w-5 h-5" style={{ color: section.accent }} />
                  </motion.div>
                </div>

                {/* Bottom — title slides up slightly on hover */}
                <motion.div
                  className="relative z-20 flex justify-between items-end gap-4 border-t pt-3"
                  style={{ borderColor: `${section.accent}25` }}
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide uppercase leading-snug">
                      {section.title}
                    </span>
                    <motion.span
                      className="text-[9px] tracking-widest uppercase mt-1 font-mono"
                      style={{ color: `${section.accent}cc` }}
                      initial={{ opacity: 0.5 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Prathmesh Singh · Safar
                    </motion.span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => toggleLike(section.id, e)}
                    className="p-2 rounded-lg border border-white/10 text-white transition-all duration-300 shrink-0 backdrop-blur-sm"
                    style={{ background: `${section.accent}18` }}
                  >
                    <Heart className={`w-4 h-4 transition-colors duration-300 ${isLiked ? "fill-pink-400 text-pink-400" : "text-white/50"}`} />
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slideshow Lightbox Modal */}
      <AnimatePresence>
        {selectedSection && (
          <Lightbox section={selectedSection} onClose={() => setSelectedSection(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

