"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Eye } from "lucide-react";

// ── Song data ──────────────────────────────────────────────────────────────────
interface Song {
  id: string;
  title: string;
  releaseYear: string;
  poster: string;
  accent: string;
  description: string;
  spotify: string;
  youtube: string;
  ytMusic: string;
  appleMusic: string;
}

const SONGS: Song[] = [
  {
    id: "ramz",
    title: "Ramz",
    releaseYear: "2026",
    poster: "/SongsPoster/1. Ramz.png",
    accent: "#8A2BE2",
    description: "Ramz — Agar aap kisiko bohot pasand karte ho and bolne me darr lagta hai, to ye gaana bhejke confess kardo mere dost…………",
    spotify: "https://open.spotify.com/track/35r1DQlrfv2XdWBCJfaIsH?si=f5f5f6824e9042a0",
    youtube: "https://youtu.be/Zpak8zuajHo?si=-9RGkMHWV1f60sC0",
    ytMusic: "https://music.youtube.com/watch?v=RlWYIQlxJ60",
    appleMusic: "https://music.apple.com/in/song/ramz/1891689071",
  },
  {
    id: "khwabo",
    title: "Khwabon Me Tujhe",
    releaseYear: "2026",
    poster: "/SongsPoster/2. Khwabon Me Tujhe.png",
    accent: "#D4AF37",
    description: "Khwabon Me Tujhe — Kabhi aisa hua hai ki koi insaan apki zindagi me aaya and aapki zindagi achanak se bohot khoobsurat banake ek din hamesha ke liye aapse door chala gaya, to us insaan ke jaane ke baad kaise feel hota hai, ye gaana us baare me hai…",
    spotify: "https://open.spotify.com/track/1XxwxVV3V0aZEasdVc1IQ9?si=6c99bf9462254294",
    youtube: "https://youtu.be/skDN3kswb_w?si=CZQQXVA5BBAQWgm4",
    ytMusic: "https://music.youtube.com/watch?v=lhfBegG6XcE",
    appleMusic: "https://music.apple.com/in/song/khwabon-me-tujhe/1870765004",
  },
  {
    id: "bas-kar",
    title: "Bas Kar Ye Teri Baatein",
    releaseYear: "2025",
    poster: "/SongsPoster/3. Bas Kar Ye Teri Baatein.png",
    accent: "#FF69B4",
    description: "Bas Kar Ye Teri Baatein — Kabhi pyaar aur sapno ke beech me choice karni padi hai? Sapno ke peeche bhaagne ke liye pyaar ko jaane diya hai kabhi? Agar aisa hua hai and wo insaan tumse door hai kyunki tum apne sapno ke pass ho, to ye sunlo…",
    spotify: "https://open.spotify.com/track/33Loih1Hw6FEQVYILnrr9a?si=lC477vgcQVSnl9EWV6Y9wQ",
    youtube: "https://youtu.be/ecFJ_IodbR8?si=25ou1uJVaurrje_u",
    ytMusic: "https://music.youtube.com/watch?v=ec80a79ObBw",
    appleMusic: "https://music.apple.com/in/album/bas-kar-ye-teri-baatein/1837253371?i=1837253378",
  },
  {
    id: "tera-asar-reprise",
    title: "Tera Asar Reprise",
    releaseYear: "2025",
    poster: "/SongsPoster/4. Tera Asar Reprise.png",
    accent: "#00CED1",
    description: "Tera Asar Reprise — If you liked Tera Asar, you will love this too, aur agar Tera Asar nhi suna fir to seedhe yhi sunlo, kabhi kisi ko dekhke kuch kuch feel hua hai to ye tumhare liye hai…",
    spotify: "https://open.spotify.com/track/6QVy1HU960N6pLVe4qaoVq?si=503699ba701843c2",
    youtube: "https://youtu.be/teTX-Ml20X8?si=bFEhzFPJSogPK1wK",
    ytMusic: "https://music.youtube.com/watch?v=mosUIonh65A",
    appleMusic: "https://music.apple.com/in/song/tera-asar-reprise/1829439654",
  },
  {
    id: "maa-forever",
    title: "Maa Forever",
    releaseYear: "2025",
    poster: "/SongsPoster/5. Maa Forever.png",
    accent: "#FFD700",
    description: "Maa Forever — Apni mummy se bohot pyaar karte ho but batane me awkwardness ho jaati hai, to ye sunado unhe……",
    spotify: "https://open.spotify.com/track/0kdRhKkBWJOEfVfJadUKz4?si=-md7z_S9R5SFQcI6vfESAQ",
    youtube: "https://youtu.be/MnpLnSCxZL4?si=4hdH0lxgEx4ZbkbU",
    ytMusic: "https://music.youtube.com/watch?v=aQ7OFcmZQ9c",
    appleMusic: "https://music.apple.com/us/album/maa-forever/1812413417?i=1812413693",
  },
  {
    id: "tera-asar",
    title: "Tera Asar",
    releaseYear: "2025",
    poster: "/SongsPoster/6. Tera Asar.jpg",
    accent: "#FF4500",
    description: "Tera Asar — A song for all age groups, whether you like someone, you are dating someone or you have married someone, agar aaj bhi us insaan ko dekhke ya uske baare me sochke butterflies in the stomach wali feeling aati hai, to ye tumhare liye hai……",
    spotify: "https://open.spotify.com/track/7u2y58D0aUZU30hSQNHSFR?si=62m3c7SQSsan_Lreo9P3uA",
    youtube: "https://youtu.be/8TjdyvUdhf8?si=2ZQ3PYeV-junKdGk",
    ytMusic: "https://music.youtube.com/watch?v=q_pO9Cw1LVI",
    appleMusic: "https://music.apple.com/us/album/tera-asar/1791283814?i=1791283817",
  },
];

// ── Streaming platform SVG icons ───────────────────────────────────────────────
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const YTMusicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L16.2 12l-6.516 3.54z"/>
  </svg>
);
const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.048-2.31-2.17-3.05A5.022 5.022 0 0 0 19.34.5c-.69-.054-1.376-.083-2.063-.09L12 .404 6.717.41C6.03.418 5.344.446 4.655.5a5.028 5.028 0 0 0-2.244.834c-1.122.74-1.853 1.74-2.17 3.05A9.23 9.23 0 0 0 0 6.124C-.005 6.5 0 6.876 0 7.252v9.496c0 .376-.005.752 0 1.128.058 1.458.388 2.838 1.18 4.05.786 1.206 1.903 2.018 3.295 2.428.86.254 1.762.374 2.66.426.688.04 1.376.056 2.064.058l4.8.004 4.8-.004c.688-.002 1.376-.018 2.064-.058a9.1 9.1 0 0 0 2.66-.426c1.392-.41 2.51-1.222 3.295-2.428.792-1.212 1.122-2.592 1.18-4.05.005-.376 0-.752 0-1.128V7.252c0-.376.005-.752 0-1.128zM9.658 15.956V8.044L15.97 12l-6.312 3.956z"/>
  </svg>
);

// ── Detail Modal ───────────────────────────────────────────────────────────────
interface ModalProps { song: Song; onClose: () => void; }

function SongModal({ song, onClose }: ModalProps) {
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
      className="fixed inset-0 z-[999999] bg-black/92 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="w-full max-w-5xl glass-premium rounded-2xl md:rounded-3xl border border-white/10 p-4 md:p-10 relative overflow-y-auto max-h-[94vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Accent glow */}
        <div
          className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 30% 50%, ${song.accent} 0%, transparent 70%)` }}
        />

        {/* Close */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute right-5 top-5 p-2.5 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-white hover:bg-black/90 transition-all z-50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-2">
          {/* Left: Poster */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-4">
            <div
              className="w-full max-w-[280px] md:max-w-full aspect-square rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ boxShadow: `0 24px 80px ${song.accent}40` }}
            >
              <img
                src={song.poster}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white tracking-wide">{song.title}</h4>
              <span className="text-sm font-mono tracking-widest mt-1.5 block" style={{ color: song.accent }}>
                Released {song.releaseYear}
              </span>
            </div>
          </div>

          {/* Right: Links + Description */}
          <div className="md:col-span-7 flex flex-col gap-6 text-left justify-center">

            {/* Streaming Links */}
            <div>
              <span className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-semibold block mb-3">
                Listen & Watch
              </span>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <a
                  href={song.spotify} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-black transition-all hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: "#1DB954" }}
                >
                  <SpotifyIcon /> <span className="truncate">Spotify</span>
                </a>
                <a
                  href={song.youtube} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: "#FF0000" }}
                >
                  <YouTubeIcon /> <span className="truncate">Music Video</span>
                </a>
                <a
                  href={song.ytMusic} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: "#FF0033" }}
                >
                  <YTMusicIcon /> <span className="truncate">YT Music</span>
                </a>
                <a
                  href={song.appleMusic} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: "#FC3C44" }}
                >
                  <AppleMusicIcon /> <span className="truncate">Apple Music</span>
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-white/10 pt-5">
              <span className="text-xs text-gold/80 tracking-[0.25em] uppercase font-bold block mb-2.5 font-mono">
                ABOUT THIS SONG
              </span>
              <p className="font-serif-lux italic text-white/95 text-base md:text-lg leading-relaxed md:leading-loose">
                {song.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Discography() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [tiltCoords, setTiltCoords] = useState<{ [id: string]: { rx: number; ry: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = (((e.clientY - rect.top) / rect.height) - 0.5) * -18;
    const ry = (((e.clientX - rect.left) / rect.width) - 0.5) * 18;
    setTiltCoords(prev => ({ ...prev, [id]: { rx, ry } }));
  };

  const handleMouseLeave = (id: string) =>
    setTiltCoords(prev => ({ ...prev, [id]: { rx: 0, ry: 0 } }));

  return (
    <section
      id="discography"
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">DISCOGRAPHY</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Originals
          </h3>
          <p className="mt-3 text-sm text-white/40 font-light max-w-xl">
            Every song is a story. Tap to listen.
          </p>
        </div>

        {/* Song Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {SONGS.map((song, si) => {
            const tilt = tiltCoords[song.id] || { rx: 0, ry: 0 };
            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: si * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center select-none cursor-pointer group"
                onClick={() => setSelectedSong(song)}
                onMouseMove={e => handleMouseMove(e, song.id)}
                onMouseLeave={() => handleMouseLeave(song.id)}
                data-cursor="view"
              >
                {/* 3D Tilt Poster Card */}
                <motion.div
                  animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
                  transition={{ type: "tween", duration: 0.12 }}
                  className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-2xl border border-white/10"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: `0 8px 40px ${song.accent}20`,
                  }}
                >
                  {/* Poster Image */}
                  <img
                    src={song.poster}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `${song.accent}22`, backdropFilter: "blur(2px)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: song.accent, backgroundColor: `${song.accent}33` }}
                    >
                      <Eye className="w-5 h-5" style={{ color: song.accent }} />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-white/80">
                      View
                    </span>
                  </motion.div>

                  {/* Shimmer sweep on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: 0.15 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)",
                    }}
                  />

                  {/* Glow border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ border: `2px solid ${song.accent}` }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Title below card */}
                <div className="mt-3 text-center">
                  <span className="text-sm font-semibold text-white/90 tracking-wide block group-hover:text-white transition-colors">
                    {song.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSong && (
          <SongModal song={selectedSong} onClose={() => setSelectedSong(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
