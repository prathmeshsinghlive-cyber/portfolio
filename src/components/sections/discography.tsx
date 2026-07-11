"use client";

import { useState } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, X, Heart, Eye } from "lucide-react";

interface Album {
  id: string;
  title: string;
  releaseDate: string;
  accent: string;
  tracks: Array<{ title: string; trackIndex: number; duration: string }>;
  lyrics: string;
  spotifyUrl: string;
  appleUrl: string;
  youtubeUrl: string;
}

const ALBUMS: Album[] = [
  {
    id: "album-1",
    title: "Stellar Echoes",
    releaseDate: "January 15, 2026",
    accent: "#8A2BE2", // Purple
    tracks: [
      { title: "Nebula", trackIndex: 0, duration: "3:45" },
      { title: "Supernova", trackIndex: 3, duration: "5:02" },
      { title: "Orbiting Dust", trackIndex: 0, duration: "4:15" },
      { title: "Cosmic Resonance", trackIndex: 3, duration: "3:20" }
    ],
    lyrics: "Lost inside a stellar dream, echoing forever. The gravity of your touch pulls me through the vacuum. We shine like dying stars, brighter than the universe, before fading through black...",
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com/apple-music",
    youtubeUrl: "https://youtube.com"
  },
  {
    id: "album-2",
    title: "Neon Horizons",
    releaseDate: "May 22, 2024",
    accent: "#FF69B4", // Pink
    tracks: [
      { title: "Midnight Drive", trackIndex: 1, duration: "4:12" },
      { title: "Cyber Kiss", trackIndex: 1, duration: "3:48" },
      { title: "City Lights", trackIndex: 1, duration: "4:05" },
      { title: "Speed of Light", trackIndex: 1, duration: "3:30" }
    ],
    lyrics: "Neon rain on the windshield. Accelerated pulse rate. The speed of light is too slow for us now. Hold on to the steering wheel, we are crossing the digital boundary into the sunrise...",
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com/apple-music",
    youtubeUrl: "https://youtube.com"
  },
  {
    id: "album-3",
    title: "Sunlight & Dust",
    releaseDate: "September 08, 2022",
    accent: "#D4AF37", // Gold
    tracks: [
      { title: "Golden Hour", trackIndex: 2, duration: "3:10" },
      { title: "Acoustic Sea", trackIndex: 2, duration: "3:55" },
      { title: "Shadows in the Dust", trackIndex: 2, duration: "4:20" },
      { title: "Warm Breeze", trackIndex: 2, duration: "2:45" }
    ],
    lyrics: "Warm wind blowing through open curtains. Sun particles floating in the air. Time stands still for a moment. All we are is sunlight and dust, waiting to settle in the fields of gold...",
    spotifyUrl: "https://spotify.com",
    appleUrl: "https://apple.com/apple-music",
    youtubeUrl: "https://youtube.com"
  }
];

export default function Discography() {
  const { isPlaying, togglePlay, selectTrack, currentTrackIndex } = useAudio();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  
  // 3D Tilt Coordinates per album hover
  const [tiltCoords, setTiltCoords] = useState<{ [key: string]: { rotateX: number; rotateY: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, albumId: string) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
    // Calculate relative cursor position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to rotation degrees (-15deg to 15deg)
    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = (((y / rect.height) - 0.5) * -20);
    
    setTiltCoords(prev => ({
      ...prev,
      [albumId]: { rotateX, rotateY }
    }));
  };

  const handleMouseLeave = (albumId: string) => {
    setTiltCoords(prev => ({
      ...prev,
      [albumId]: { rotateX: 0, rotateY: 0 }
    }));
  };

  const handlePlayTrack = (trackIndex: number) => {
    selectTrack(trackIndex);
    if (!isPlaying) togglePlay();
  };

  return (
    <section 
      id="discography" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col mb-16 text-left">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">DISCOGRAPHY</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Immersive Singles Showcase
          </h3>
        </div>

        {/* 3D Album Cover Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ALBUMS.map((album) => {
            const rot = tiltCoords[album.id] || { rotateX: 0, rotateY: 0 };
            
            return (
              <div 
                key={album.id}
                className="flex flex-col items-center select-none"
              >
                {/* 3D tilt frame */}
                <div 
                  className="perspective-1000 w-full aspect-square max-w-[320px] cursor-pointer relative group"
                  onClick={() => setSelectedAlbum(album)}
                  onMouseMove={(e) => handleMouseMove(e, album.id)}
                  onMouseLeave={() => handleMouseLeave(album.id)}
                  data-cursor="view"
                >
                  <motion.div
                    animate={{
                      rotateX: rot.rotateX,
                      rotateY: rot.rotateY,
                      scale: 1.02
                    }}
                    transition={{ type: "tween", duration: 0.1 }}
                    className="w-full h-full rounded-2xl overflow-hidden glass p-4 border border-white/10 shadow-2xl relative flex flex-col justify-between"
                  >
                    {/* Glowing background gradient inside the album cover */}
                    <div 
                      className="absolute inset-0 opacity-30 group-hover:opacity-45 blur-2xl transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${album.accent} 0%, transparent 70%)`
                      }}
                    />
                    
                    {/* Shimmer light reflection effect */}
                    <div className="absolute inset-0 award-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Sleeve text */}
                    <div className="relative z-10 flex justify-between text-[8px] font-mono text-white/50 tracking-wider">
                      <span>LP RECORD</span>
                      <span>{album.releaseDate.split(", ")[1]}</span>
                    </div>

                    {/* Album Art Icon/Symbol */}
                    <div className="relative z-10 my-auto flex flex-col items-center text-center">
                      <div 
                        className="w-14 h-14 rounded-full border border-white/20 mb-3 flex items-center justify-center relative shadow-lg"
                        style={{ borderColor: `${album.accent}30` }}
                      >
                        <div className="absolute w-2 h-2 rounded-full bg-black" />
                        <motion.div 
                          animate={isPlaying && currentTrackIndex === album.tracks[0].trackIndex ? { rotate: 360 } : {}}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
                          style={{ backgroundColor: `${album.accent}30` }}
                        >
                          <Disc className="w-4 h-4 text-white/60" />
                        </motion.div>
                      </div>
                      <h4 className="font-serif-lux text-2xl text-white font-medium italic">
                        {album.title}
                      </h4>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-gold mt-1">
                        Single Release
                      </p>
                    </div>

                    {/* Quick indicator bottom */}
                    <div className="relative z-10 flex justify-between items-center text-white/50 text-[9px]">
                      <span className="uppercase tracking-widest text-[8px]">View Details</span>
                      <Eye className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                    </div>
                  </motion.div>
                </div>

                {/* Album Title Below */}
                <span className="text-sm font-semibold text-foreground/80 mt-4 uppercase tracking-wider">
                  {album.title}
                </span>
                <span className="text-[10px] text-foreground/40 font-mono tracking-widest mt-1">
                  Released: {album.releaseDate}
                </span>
              </div>
            );
          })}
        </div>

        {/* 4. FULLSCREEN ALBUM DETAILS OVERLAY */}
        <AnimatePresence>
          {selectedAlbum && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="w-full max-w-4xl glass-premium rounded-3xl border border-white/10 p-6 md:p-10 relative max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  data-cursor="magnetic"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-6">
                  
                  {/* Left Column: 3D Art Mock & Title */}
                  <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                    {/* Vinyl mock representation inside */}
                    <div 
                      className="w-48 h-48 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl relative flex items-center justify-center overflow-hidden mb-6"
                      style={{
                        boxShadow: `0 20px 45px ${selectedAlbum.accent}15`
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-40 blur-md"
                        style={{
                          background: `radial-gradient(circle at center, ${selectedAlbum.accent} 0%, transparent 80%)`
                        }}
                      />
                      <Disc className="w-20 h-20 text-white/20 animate-spin" style={{ animationDuration: "25s" }} />
                    </div>

                    <h4 className="text-2xl font-bold text-white tracking-wide uppercase">
                      {selectedAlbum.title}
                    </h4>
                    <span className="text-xs text-gold/80 font-mono tracking-widest mt-1.5 block">
                      Release: {selectedAlbum.releaseDate}
                    </span>
                  </div>

                  {/* Right Column: Streaming Links & Lyrics */}
                  <div className="md:col-span-7 space-y-6 text-left">
                    {/* Streaming links panel */}
                    <div>
                      <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold block mb-3">
                        LISTEN ON STREAMING SERVICES
                      </span>
                      
                      <div className="flex gap-2">
                        <a 
                          href={selectedAlbum.spotifyUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black transition-colors"
                          data-cursor="magnetic"
                        >
                          Spotify
                        </a>
                        <a 
                          href={selectedAlbum.appleUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#FC3C44] hover:bg-[#ff4f56] text-white transition-colors"
                          data-cursor="magnetic"
                        >
                          Apple Music
                        </a>
                      </div>
                      <a 
                        href={selectedAlbum.youtubeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full mt-3 py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg border border-white/10 hover:border-white/20 bg-white/5 text-white transition-all"
                        data-cursor="magnetic"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Lyrics Preview */}
                    <div className="border-t border-white/10 pt-4">
                      <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold block mb-2">
                        Motivation of the song is
                      </span>
                      <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                        <p className="font-serif-lux italic text-white/90 text-sm leading-relaxed">
                          {selectedAlbum.lyrics}
                        </p>
                      </div>
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

// Re-import missing Disc icon
import { Disc as DiscIcon } from "lucide-react";
// Wait! Next.js requires icons to be imported correctly. Lucide icons:
import { Disc } from "lucide-react";
