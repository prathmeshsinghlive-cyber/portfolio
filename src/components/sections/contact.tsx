"use client";

import { useState } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { motion, AnimatePresence } from "framer-motion";
import AudioVisualizer from "@/components/ui/audio-visualizer";
import { Send, Check, Mail, Phone, MapPin, Loader2 } from "lucide-react";
export default function Contact() {
  const { tracks, currentTrackIndex } = useAudio();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const activeColor = tracks[currentTrackIndex]?.color || "#D4AF37";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Direct email delivery via FormSubmit API to prathmeshsingh19@gmail.com
      await fetch("https://formsubmit.co/ajax/prathmeshsingh19@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Subject: subject,
          Message: message,
          _subject: `New Portfolio Message from ${name}: ${subject}`,
        }),
      });
    } catch (err) {
      console.log("FormSubmit API fallback:", err);
    } finally {
      // Trigger native email client as secondary guarantee
      const mailtoUrl = `mailto:prathmeshsingh19@gmail.com?subject=${encodeURIComponent(
        subject || "Portfolio Contact Message"
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;
      window.open(mailtoUrl, "_blank");

      setIsSubmitting(false);
      setFormSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        setFormSent(false);
      }, 5000);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center">
        
        {/* Left Column: Contact Info & Social Channels */}
        <div className="lg:col-span-5 flex flex-col text-left space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">CONNECTING FREQUENCIES</span>
            <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-white italic leading-tight">
              Get in Touch
            </h3>
            <p className="text-xs text-white/50 font-light mt-3 max-w-sm leading-relaxed">
              Got something to say? A collab idea, a concert query, or just want to share how a song made you feel — drop a message. Prathmesh reads everything.
            </p>
          </div>

          {/* Task 1: Updated Core Info details */}
          <div className="space-y-4 text-xs font-light text-white/70">
            {/* 1. Email */}
            <a 
              href="mailto:prathmeshsingh19@gmail.com" 
              className="flex items-center gap-3 group transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 group-hover:border-gold/50 flex items-center justify-center text-gold transition-all shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase">E-Mail Address</span>
                <span className="text-white tracking-wide font-medium group-hover:text-gold transition-colors">
                  prathmeshsingh19@gmail.com
                </span>
              </div>
            </a>

            {/* 2. Contact Number */}
            <a 
              href="tel:+917320903969" 
              className="flex items-center gap-3 group transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 group-hover:border-purple/50 flex items-center justify-center text-purple transition-all shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase">Contact Number</span>
                <span className="text-white tracking-wide font-medium group-hover:text-purple transition-colors">
                  +91 7320 903 969
                </span>
              </div>
            </a>

            {/* 3. Currently Based In */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-pink shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase">Currently Based In</span>
                <span className="text-white tracking-wide font-medium">
                  Mandi, Himachal Pradesh
                </span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-4 text-left">
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-semibold block mb-3">
              Connect with me
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                {
                  name: "Instagram",
                  url: "https://www.instagram.com/prathmeshsinghmusic",
                  color: "#E1306C",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  url: "https://www.youtube.com/@prathmeshsinghmusic",
                  color: "#FF0000",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
                {
                  name: "Spotify",
                  url: "https://open.spotify.com/artist/5d75hQdlksXwkeHbfXYySO",
                  color: "#1DB954",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  ),
                },
                {
                  name: "Apple Music",
                  url: "https://music.apple.com/in/artist/prathmesh-singh/1791280625",
                  color: "#FC3C44",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.048-2.31-2.17-3.05A5.022 5.022 0 0 0 19.34.5c-.69-.054-1.376-.083-2.063-.09L12 .404 6.717.41C6.03.418 5.344.446 4.655.5a5.028 5.028 0 0 0-2.244.834c-1.122.74-1.853 1.74-2.17 3.05A9.23 9.23 0 0 0 0 6.124C-.005 6.5 0 6.876 0 7.252v9.496c0 .376-.005.752 0 1.128.058 1.458.388 2.838 1.18 4.05.786 1.206 1.903 2.018 3.295 2.428.86.254 1.762.374 2.66.426.688.04 1.376.056 2.064.058l4.8.004 4.8-.004c.688-.002 1.376-.018 2.064-.058a9.1 9.1 0 0 0 2.66-.426c1.392-.41 2.51-1.222 3.295-2.428.792-1.212 1.122-2.592 1.18-4.05.005-.376 0-.752 0-1.128V7.252c0-.376.005-.752 0-1.128zM12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
                    </svg>
                  ),
                },
                {
                  name: "SoundCloud",
                  url: "https://soundcloud.com/prathmeshsinghmusic",
                  color: "#FF5500",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M11.56 8.87V17h8.76c1.48 0 2.68-1.2 2.68-2.68 0-1.48-1.2-2.68-2.68-2.68-.18 0-.35.02-.52.05-.12-2.55-2.21-4.59-4.79-4.59-1.31 0-2.5.51-3.45 1.57zM0 15.32c0 .93.76 1.68 1.68 1.68s1.68-.75 1.68-1.68V12.9c0-.93-.75-1.68-1.68-1.68S0 11.97 0 12.9v2.42zm5.04 1.17c0 .93.76 1.68 1.68 1.68.93 0 1.68-.75 1.68-1.68V10.6c0-.93-.75-1.68-1.68-1.68-.92 0-1.68.75-1.68 1.68v5.89zm3.36.51c0 .93.75 1.68 1.68 1.68.93 0 1.68-.75 1.68-1.68V9.28c0-.93-.75-1.68-1.68-1.68-.93 0-1.68.75-1.68 1.68V17z"/>
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  url: "https://www.facebook.com/prathmeshsinghmusic",
                  color: "#1877F2",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  title={social.name}
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all relative overflow-hidden group shadow-md"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: social.color }}
                  />
                  <span style={{ color: social.color }} className="group-hover:scale-110 transition-transform duration-200">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form with direct delivery */}
        <div className="lg:col-span-7">
          <div className="glass-premium rounded-3xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
            
            {/* Audio Waveform visualizer running across top of form */}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold">EMAIL CORRESPONDENCE</label>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold font-sans">SUBJECT</label>
                <input 
                  required
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Live performance booking, collaboration, press"
                  className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-semibold">YOUR MESSAGE</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Type your message here..."
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
                      <span>MESSAGE SENT TO PRATHMESH'S INBOX</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="send"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-white hover:bg-gold text-black hover:text-black font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                      data-cursor="magnetic"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING TO PRATHMESH...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
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
