"use client";

import { useAudio } from "@/components/providers/audio-context";
import { motion } from "framer-motion";
import { Disc, Sparkles, Send, Music } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const { isPlaying, togglePlay, tracks, currentTrackIndex } = useAudio();
  const activeTrack = tracks[currentTrackIndex];
  
  const [newsMail, setNewsMail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsMail("");
    }, 4000);
  };

  const handleScrollToTop = () => {
    const el = document.getElementById("hero");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer 
      className="relative bg-background overflow-hidden border-t border-white/5 py-16 px-6 md:px-16 text-left select-none"
    >
      {/* Background space elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(138,43,226,0.06),transparent_80%)] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Top: Newsletter, Quote, mini vinyl */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/5 pb-12">
          
          {/* Quote & Large Logo Intro */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif-lux italic text-xl md:text-2xl text-white/95 leading-relaxed max-w-sm">
              “In the collision of sound and design, we find pure resonance.”
            </h4>
            <p className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-mono">
              PRATHMESH SINGH // CREATIVE DIRECTOR
            </p>
          </div>

          {/* Quick links & active track */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-semibold block">
              LATEST SONG IN PLAYLIST
            </span>
            <div 
              onClick={togglePlay}
              className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
              data-cursor="play"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden text-black shadow-md shrink-0"
                style={{ backgroundColor: activeTrack.color }}
              >
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="flex items-center justify-center"
                >
                  <Disc className="w-5 h-5 text-black" />
                </motion.div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{activeTrack.title}</span>
                <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase mt-0.5">{activeTrack.genre}</span>
              </div>
            </div>
          </div>

          {/* Newsletter Input Box */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-semibold block">
              SUBSCRIBE TO PRATHMESH SINGH BROADCAST
            </span>
            
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                required
                type="email" 
                value={newsMail}
                onChange={(e) => setNewsMail(e.target.value)}
                placeholder="Enter email coordinate" 
                className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 pr-12 text-xs text-white outline-none transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-white/5 hover:bg-gold hover:text-black text-white/70 hover:text-white transition-colors cursor-pointer"
                data-cursor="magnetic"
              >
                {subscribed ? <Sparkles className="w-4 h-4 text-gold animate-bounce" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            <span className="text-[8px] text-white/30 block mt-1 uppercase tracking-wider">
              Exclusive performance invites and VIP access signals.
            </span>
          </div>

        </div>

        {/* Bottom Credits & Giant Logo */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[9px] tracking-[0.2em] uppercase font-mono">
            <span>DESIGNED BY LUXURY DIGITAL DESIGN TEAMS</span>
            <span 
              onClick={handleScrollToTop}
              className="hover:text-gold cursor-pointer transition-colors font-bold"
              data-cursor="magnetic"
            >
              SCROLL TO ORBIT ↑
            </span>
            <span>EXPERIENCE ©2026 // ALL RIGHTS RESERVED</span>
          </div>

          {/* Huge Backdrop Typography */}
          <h1 
            className="text-[10vw] font-black text-white/5 tracking-[0.3em] uppercase leading-none select-none text-center mt-4 border-t border-white/5 pt-6 cursor-default"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            PRATHMESH SINGH
          </h1>
        </div>

      </div>
    </footer>
  );
}
