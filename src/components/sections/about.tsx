"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const bioRef = useRef<HTMLDivElement | null>(null);
  const bioInView = useInView(bioRef, { once: true, margin: "-100px" });

  // Custom 3D Stack Card Flip Loop State
  const [stack, setStack] = useState([0, 1]);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    
    // Cycle the stack: [0, 1] becomes [1, 0]
    setStack(prev => [prev[1], prev[0]]);
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 650);
  };

  const transitionToFront = {
    x: { type: "spring", stiffness: 140, damping: 20 },
    y: { type: "spring", stiffness: 140, damping: 20 },
    rotate: { type: "spring", stiffness: 140, damping: 20 },
    scale: { type: "spring", stiffness: 140, damping: 20 },
    zIndex: { delay: 0.18 }
  } as const;

  const transitionToBack = {
    x: {
      keyframes: [0, -170, 35],
      times: [0, 0.45, 1],
      duration: 0.65,
      ease: "easeInOut"
    },
    y: {
      keyframes: [0, 0, 40],
      times: [0, 0.45, 1],
      duration: 0.65,
      ease: "easeInOut"
    },
    rotate: {
      keyframes: [-6, -18, 8],
      times: [0, 0.45, 1],
      duration: 0.65,
      ease: "easeInOut"
    },
    scale: {
      keyframes: [1, 1.05, 0.82],
      times: [0, 0.45, 1],
      duration: 0.65,
      ease: "easeInOut"
    },
    rotateY: {
      keyframes: [0, 180, 360],
      times: [0, 0.5, 1],
      duration: 0.65,
      ease: "easeInOut"
    },
    zIndex: {
      keyframes: [30, 20, 20],
      times: [0, 0.3, 1],
      duration: 0.65
    }
  } as const;

  const CARDS_DATA = [
    {
      id: 0,
      image: "/About/IMG1.jpg",
    },
    {
      id: 1,
      image: "/About/IMG2.jpeg",
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full pt-20 md:pt-24 pb-4 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      {/* Background lyrics overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-5 font-serif-lux italic text-5xl md:text-8xl text-foreground flex flex-col justify-around overflow-hidden pl-10">
        <div className="transform translate-x-[-10%]">“Lost inside a stellar dream, echoing forever...”</div>
        <div className="transform translate-x-[20%]">“The synthetic warmth is all we need to breathe...”</div>
        <div className="transform translate-x-[-5%]">“Drifting slowly to the edge of the sky...”</div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Narrative & Floating Collage Grid */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-6">
          
          {/* Biography text */}
          <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed font-light text-sm md:text-base text-left">
            
            {/* Section Title inside the left column to align with cards */}
            <div className="flex flex-col mb-10 text-left">
              <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">ABOUT THE ARTIST</span>
              <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
                The Story Behind the Voice
              </h3>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Prathmesh Singh is an independent singer-songwriter from Ara, Bihar and a student at IIT Mandi. His journey in music began with a simple passion for storytelling through melodies and lyrics. Without formal training, he taught himself to write, sing, and create music that reflects real emotions and everyday experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Inspired by themes of love, memories, hope, and self-discovery, Prathmesh believes that the best songs are the ones people can see themselves in. Through every release, he hopes to create music that feels honest, relatable, and stays with listeners long after the song ends.
            </motion.p>

            {/* Signature Image Reveal */}
            <div className="pt-4 flex flex-col items-start gap-1 select-none">
              <span className="text-[10px] tracking-wider text-white/40 uppercase">Handwritten Signature</span>
              <div className="relative overflow-hidden" style={{ width: 360, height: 120 }}>
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={bioInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                  transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img
                    src="/About/Signature-removebg-preview.png"
                    alt="Prathmesh Singh Signature"
                    className="w-full h-full object-contain object-left"
                  />
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="pt-2 flex flex-col items-start gap-2"
            >
              <span className="text-[10px] tracking-[0.3em] text-white/35 uppercase font-semibold">Find Me On</span>
              <div className="flex flex-wrap gap-2 md:gap-2.5 max-w-full">
                {[
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/prathmeshsinghmusic",
                    color: "#E1306C",
                    glow: "rgba(225,48,108,0.35)",
                    delay: 0.55,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "YouTube",
                    href: "https://www.youtube.com/@prathmeshsinghmusic",
                    color: "#FF0000",
                    glow: "rgba(255,0,0,0.35)",
                    delay: 0.65,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "Spotify",
                    href: "https://open.spotify.com/artist/5d75hQdlksXwkeHbfXYySO",
                    color: "#1DB954",
                    glow: "rgba(29,185,84,0.35)",
                    delay: 0.75,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "Apple Music",
                    href: "https://music.apple.com/in/artist/prathmesh-singh/1791280625",
                    color: "#FC3C44",
                    glow: "rgba(252,60,68,0.35)",
                    delay: 0.85,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.048-2.31-2.17-3.05A5.022 5.022 0 0 0 19.34.5c-.69-.054-1.376-.083-2.063-.09L12 .404 6.717.41C6.03.418 5.344.446 4.655.5a5.028 5.028 0 0 0-2.244.834c-1.122.74-1.853 1.74-2.17 3.05A9.23 9.23 0 0 0 0 6.124C-.005 6.5 0 6.876 0 7.252v9.496c0 .376-.005.752 0 1.128.058 1.458.388 2.838 1.18 4.05.786 1.206 1.903 2.018 3.295 2.428.86.254 1.762.374 2.66.426.688.04 1.376.056 2.064.058l4.8.004 4.8-.004c.688-.002 1.376-.018 2.064-.058a9.1 9.1 0 0 0 2.66-.426c1.392-.41 2.51-1.222 3.295-2.428.792-1.212 1.122-2.592 1.18-4.05.005-.376 0-.752 0-1.128V7.252c0-.376.005-.752 0-1.128zM12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "SoundCloud",
                    href: "https://soundcloud.com/prathmeshsinghmusic",
                    color: "#FF5500",
                    glow: "rgba(255,85,0,0.35)",
                    delay: 0.95,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M11.56 8.87V17h8.76c1.48 0 2.68-1.2 2.68-2.68 0-1.48-1.2-2.68-2.68-2.68-.18 0-.35.02-.52.05-.12-2.55-2.21-4.59-4.79-4.59-1.31 0-2.5.51-3.45 1.57zM0 15.32c0 .93.76 1.68 1.68 1.68s1.68-.75 1.68-1.68V12.9c0-.93-.75-1.68-1.68-1.68S0 11.97 0 12.9v2.42zm5.04 1.17c0 .93.76 1.68 1.68 1.68.93 0 1.68-.75 1.68-1.68V10.6c0-.93-.75-1.68-1.68-1.68-.92 0-1.68.75-1.68 1.68v5.89zm3.36.51c0 .93.75 1.68 1.68 1.68.93 0 1.68-.75 1.68-1.68V9.28c0-.93-.75-1.68-1.68-1.68-.93 0-1.68.75-1.68 1.68V17z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    href: "https://www.facebook.com/prathmeshsinghmusic",
                    color: "#1877F2",
                    glow: "rgba(24,119,242,0.35)",
                    delay: 1.05,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    ),
                  },
                ].map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={bioInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: social.delay, type: "spring", stiffness: 200, damping: 18 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                    className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: `${social.color}30`,
                      backgroundColor: `${social.color}10`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = `${social.color}70`;
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${social.color}20`;
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 18px ${social.glow}, 0 0 6px ${social.glow}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = `${social.color}30`;
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${social.color}10`;
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                  >
                    <span style={{ color: social.color }} className="flex items-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider text-white/70 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating Image Collage (Looping 3D Card Stack) */}
          <div 
            className="lg:col-span-5 relative h-[500px] w-full flex items-center justify-center lg:mt-6"
            style={{ perspective: 1000 }}
          >
            {/* Card 1: Backing Blur shadow */}
            <div className="absolute w-72 h-[22rem] rounded-2xl bg-gradient-to-tr from-purple/30 to-gold/30 blur-2xl opacity-60 pointer-events-none" />

            {CARDS_DATA.map((card) => {
              const isFront = stack[0] === card.id;
              
              return (
                <motion.div
                  key={card.id}
                  onClick={handleCardClick}
                  style={{ transformStyle: "preserve-3d" }}
                  animate={isFront ? "front" : "back"}
                  variants={{
                    front: {
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: -6,
                      rotateY: 0,
                      zIndex: 30,
                      opacity: 1,
                    },
                    back: {
                      x: 45,
                      y: 50,
                      scale: 0.82,
                      rotate: 8,
                      rotateY: 0,
                      zIndex: 20,
                      opacity: 0.9,
                    }
                  }}
                  transition={isFront ? (transitionToFront as any) : (transitionToBack as any)}
                  whileHover={isFront ? { rotate: 0, scale: 1.03, zIndex: 40 } : { scale: 0.85, rotate: 10 }}
                  className="absolute w-72 h-[22rem] rounded-2xl glass p-1.5 border border-white/10 shadow-2xl overflow-hidden cursor-pointer select-none"
                  data-cursor="view"
                >
                  <img 
                    src={card.image} 
                    alt="About Prathmesh Singh" 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
