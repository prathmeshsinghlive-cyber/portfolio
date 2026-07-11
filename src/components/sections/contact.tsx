"use client";

import { useState } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { motion, AnimatePresence } from "framer-motion";
import AudioVisualizer from "@/components/ui/audio-visualizer";
import { Send, Check, Mail, Phone, MapPin, Disc } from "lucide-react";

function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  );
}

function Youtube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  );
}

export default function Contact() {
  const { tracks, currentTrackIndex } = useAudio();
  const [formSent, setFormSent] = useState(false);
  const [clientMsg, setClientMsg] = useState("");
  const activeColor = tracks[currentTrackIndex].color;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setClientMsg("");
    }, 4000);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Coordinates & Floating Social Nodes */}
        <div className="lg:col-span-5 flex flex-col text-left space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">CONNECTING FREQUENCIES</span>
            <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-white italic leading-tight">
              Get in Touch
            </h3>
            <p className="text-xs text-white/50 font-light mt-3 max-w-sm">
              For live performances, record deals, press inquiries, or artistic collaborations. Direct signals logged daily.
            </p>
          </div>

          {/* Core Info details */}
          <div className="space-y-4 text-xs font-light text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gold">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase">E-Mail Address</span>
                <span className="text-white tracking-wide font-medium">booking@prathmeshsingh.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-purple">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase">Secure Wire</span>
                <span className="text-white tracking-wide font-medium">+49 30 8820 917</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-pink">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase">HQ Coordinate</span>
                <span className="text-white tracking-wide font-medium">Berlin // London // Tokyo</span>
              </div>
            </div>
          </div>

          {/* Social node buttons with magnetic cursor capability */}
          <div className="pt-4 text-left">
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-semibold block mb-3">
              DIRECT CHANNELS
            </span>
            <div className="flex gap-3">
              {[
                { icon: <Instagram className="w-4 h-4" />, name: "instagram", url: "https://instagram.com", color: "#E1306C" },
                { icon: <Twitter className="w-4 h-4" />, name: "twitter", url: "https://twitter.com", color: "#1DA1F2" },
                { icon: <Youtube className="w-4 h-4" />, name: "youtube", url: "https://youtube.com", color: "#FF0000" },
                { icon: <Disc className="w-4 h-4" />, name: "spotify", url: "https://spotify.com", color: "#1DB954" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all relative overflow-hidden group shadow-md"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: social.color }}
                  />
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Waveform Border Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-premium rounded-3xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
            
            {/* Live Waveform visualizer running across the top border of the form */}
            <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none">
              <AudioVisualizer type="wave" color={activeColor} multiplier={0.8} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold">YOUR NAME</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter name"
                    className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold">EMAIL CORRESPONDENCE</label>
                  <input 
                    required
                    type="email" 
                    placeholder="Enter email"
                    className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold font-sans">SUBJECT MATRIX</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g., Booking request, media inquiries"
                  className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold">MESSAGE TRANSMISSION</label>
                <textarea 
                  required
                  value={clientMsg}
                  onChange={(e) => setClientMsg(e.target.value)}
                  rows={4}
                  placeholder="Speak your mind..."
                  className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {formSent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>TRANSMISSION COMPLETE</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="send"
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-white hover:bg-gold text-black hover:text-black font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      data-cursor="magnetic"
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND BROADCAST</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
