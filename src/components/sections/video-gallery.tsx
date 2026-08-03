"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";

interface VideoStory {
  id: string;
  title: string;
  youtubeId: string;
  youtubeUrl: string;
  poster?: string;
  description: string;
  accent?: string;
  badge?: string;
}

const VISUAL_STORIES: VideoStory[] = [
  {
    id: "ramz",
    title: "Ramz",
    youtubeId: "Zpak8zuajHo",
    youtubeUrl: "https://youtu.be/Zpak8zuajHo?si=-9RGkMHWV1f60sC0",
    poster: "/SongsPoster/1. Ramz.png",
    description: "Ramz — Agar aap kisiko bohot pasand karte ho and bolne me darr lagta hai, to ye gaana bhejke confess kardo mere dost…………",
    accent: "#8A2BE2",
    badge: "Official Video",
  },
  {
    id: "khwabon-me-tujhe",
    title: "Khwabon Me Tujhe",
    youtubeId: "skDN3kswb_w",
    youtubeUrl: "https://youtu.be/skDN3kswb_w?si=CZQQXVA5BBAQWgm4",
    poster: "/SongsPoster/2. Khwabon Me Tujhe.png",
    description: "Khwabon Me Tujhe — Kabhi aisa hua hai ki koi insaan apki zindagi me aaya and aapki zindagi achanak se bohot khoobsurat banake ek din hamesha ke liye aapse door chala gaya, to us insaan ke jaane ke baad kaise feel hota hai, ye gaana us baare me hai…",
    accent: "#D4AF37",
    badge: "Official Video",
  },
  {
    id: "bas-kar",
    title: "Bas Kar Ye Teri Baatein",
    youtubeId: "ecFJ_IodbR8",
    youtubeUrl: "https://youtu.be/ecFJ_IodbR8?si=25ou1uJVaurrje_u",
    poster: "/SongsPoster/3. Bas Kar Ye Teri Baatein.png",
    description: "Bas Kar Ye Teri Baatein — Kabhi pyaar aur sapno ke beech me choice karni padi hai? Sapno ke peeche bhaagne ke liye pyaar ko jaane diya hai kabhi? Agar aisa hua hai and wo insaan tumse door hai kyunki tum apne sapno ke pass ho, to ye sunlo…",
    accent: "#FF69B4",
    badge: "Official Video",
  },
  {
    id: "tera-asar-reprise",
    title: "Tera Asar Reprise",
    youtubeId: "teTX-Ml20X8",
    youtubeUrl: "https://youtu.be/teTX-Ml20X8?si=bFEhzFPJSogPK1wK",
    poster: "/SongsPoster/4. Tera Asar Reprise.png",
    description: "Tera Asar Reprise — If you liked Tera Asar, you will love this too, aur agar Tera Asar nhi suna fir to seedhe yhi sunlo, kabhi kisi ko dekhke kuch kuch feel hua hai to ye tumhare liye hai…",
    accent: "#00CED1",
    badge: "Official Video",
  },
  {
    id: "maa-forever",
    title: "Maa Forever",
    youtubeId: "MnpLnSCxZL4",
    youtubeUrl: "https://youtu.be/MnpLnSCxZL4?si=4hdH0lxgEx4ZbkbU",
    poster: "/SongsPoster/5. Maa Forever.png",
    description: "Maa Forever — Apni mummy se bohot pyaar karte ho but batane me awkwardness ho jaati hai, to ye sunado unhe……",
    accent: "#FFD700",
    badge: "Official Video",
  },
  {
    id: "tera-asar",
    title: "Tera Asar",
    youtubeId: "8TjdyvUdhf8",
    youtubeUrl: "https://youtu.be/8TjdyvUdhf8?si=2ZQ3PYeV-junKdGk",
    poster: "/SongsPoster/6. Tera Asar.jpg",
    description: "Tera Asar — A song for all age groups, whether you like someone, you are dating someone or you have married someone, agar aaj bhi us insaan ko dekhke ya uske baare me sochke butterflies in the stomach wali feeling aati hai, to ye tumhare liye hai……",
    accent: "#FF4500",
    badge: "Official Video",
  },
];

const LIVE_PERFORMANCES: VideoStory[] = [
  {
    id: "live-1",
    title: "Live Performance #1",
    youtubeId: "jgXwrwRxzF0",
    youtubeUrl: "https://youtu.be/jgXwrwRxzF0?si=t341yCmc7T4yLChI",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-2",
    title: "Live Performance #2",
    youtubeId: "QEuDYz7SLyw",
    youtubeUrl: "https://youtu.be/QEuDYz7SLyw?si=ve3dDKdMc7-aeell",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-3",
    title: "Live Performance #3",
    youtubeId: "QrFDx4KoB-0",
    youtubeUrl: "https://youtu.be/QrFDx4KoB-0?si=vHNqYNg4f10HsK8k",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-4",
    title: "Live Performance #4",
    youtubeId: "kA7XQl5terA",
    youtubeUrl: "https://youtu.be/kA7XQl5terA?si=zpFioWuwxwt9fnLu",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-5",
    title: "Live Performance #5",
    youtubeId: "ObF5iThGw-A",
    youtubeUrl: "https://youtu.be/ObF5iThGw-A?si=qwo8s8m32YOrs7_B",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-6",
    title: "Live Performance #6",
    youtubeId: "nbLF0lyws7c",
    youtubeUrl: "https://youtu.be/nbLF0lyws7c?si=H5lY7dzLiAkny-f9",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-7",
    title: "Live Performance #7",
    youtubeId: "Q8UazZTDaLA",
    youtubeUrl: "https://youtu.be/Q8UazZTDaLA?si=ggQGgGZG7NARrpDF",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-8",
    title: "Live Performance #8",
    youtubeId: "nicWU3Er29U",
    youtubeUrl: "https://youtu.be/nicWU3Er29U?si=O9JePBE_lixE7iNX",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-9",
    title: "Live Performance #9",
    youtubeId: "d1jhMtnpWrY",
    youtubeUrl: "https://youtu.be/d1jhMtnpWrY?si=v7c5_lO0OJB_F6mV",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-10",
    title: "Live Performance #10",
    youtubeId: "DagF2sgnkNc",
    youtubeUrl: "https://youtu.be/DagF2sgnkNc?si=mP-wcuLaQTTMsZs4",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-11",
    title: "Live Performance #11",
    youtubeId: "_fmF54CiLnA",
    youtubeUrl: "https://youtu.be/_fmF54CiLnA?si=9UURnP9k9qJvNq9H",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-12",
    title: "Live Performance #12",
    youtubeId: "CcLPIN8sL8w",
    youtubeUrl: "https://youtu.be/CcLPIN8sL8w?si=2538QBmR0mjxM9yL",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-13",
    title: "Live Performance #13",
    youtubeId: "ZA67L-9DJtg",
    youtubeUrl: "https://youtu.be/ZA67L-9DJtg?si=wso7QEBk3XCUfj7b",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-14",
    title: "Live Performance #14",
    youtubeId: "aDWHYvUwSmg",
    youtubeUrl: "https://youtu.be/aDWHYvUwSmg?si=6fMcTIwFt-BOr-u0",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
  {
    id: "live-15",
    title: "Live Performance #15",
    youtubeId: "1r8pQBEGxwI",
    youtubeUrl: "https://youtu.be/1r8pQBEGxwI?si=PHeyDW1kgOOI-1xh",
    description: "Watch live stage performance and acoustic session.",
    badge: "Live Performance",
  },
];

interface VideoModalProps {
  video: VideoStory;
  onClose: () => void;
}

function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (typeof window === "undefined") return null;

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
        className="w-full max-w-4xl glass-premium rounded-2xl md:rounded-3xl border border-white/10 p-3.5 sm:p-6 relative overflow-y-auto max-h-[94vh] flex flex-col gap-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-5 top-5 p-2.5 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 transition-all z-50 cursor-pointer"
          aria-label="Close video player"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded YouTube Player */}
        <div className="w-full aspect-video rounded-2xl bg-black overflow-hidden border border-white/10 shadow-2xl relative">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={video.title}
            className="w-full h-full rounded-2xl border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Info below Player */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left pt-1 border-t border-white/10">
          <div className="flex flex-col">
            <h4 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
              {video.title}
            </h4>
            <p className="text-xs md:text-sm font-serif-lux italic text-white/80 mt-1 max-w-3xl leading-relaxed">
              {video.description}
            </p>
          </div>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);
  const [activeTab, setActiveTab] = useState<"music-videos" | "live-performances">("music-videos");

  const currentVideos = activeTab === "music-videos" ? VISUAL_STORIES : LIVE_PERFORMANCES;

  return (
    <section 
      id="gallery" 
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">VISUAL EXPERIENCE</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Visual Stories behind the songs
          </h3>
          <p className="mt-3 text-sm text-white/40 font-light max-w-xl">
            Watch the official videos and discover the feelings behind every track.
          </p>

          {/* Small Tab Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab("music-videos")}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "music-videos"
                  ? "bg-gold text-black shadow-lg shadow-gold/20 font-bold scale-105"
                  : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Music Videos ({VISUAL_STORIES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("live-performances")}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "live-performances"
                  ? "bg-gold text-black shadow-lg shadow-gold/20 font-bold scale-105"
                  : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Live Performances ({LIVE_PERFORMANCES.length})
            </button>
          </div>
        </div>

        {/* Video Grid Cards */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentVideos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedVideo(vid)}
              className="rounded-2xl glass border border-white/10 overflow-hidden cursor-pointer flex flex-col justify-between relative group shadow-xl bg-zinc-950/80"
              data-cursor="play"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={vid.poster || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className="w-13 h-13 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center bg-black/60 backdrop-blur-md text-white group-hover:border-gold group-hover:text-gold transition-all duration-300 shadow-2xl"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </motion.div>
                </div>
              </div>

              {/* Description & Details */}
              <div className="p-5 flex flex-col justify-between flex-grow text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-white tracking-wide uppercase">
                    {vid.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gold/80">
                    {vid.badge || "Video"}
                  </span>
                </div>

                <p className="text-xs text-white/70 font-serif-lux italic leading-relaxed line-clamp-3">
                  {vid.description}
                </p>
              </div>

              {/* Accent highlight border on hover */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-white/20 transition-colors duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Fullscreen Video Player Lightbox Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

