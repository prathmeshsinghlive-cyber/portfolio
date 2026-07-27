"use client";

import { useEffect, useState, useRef } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Headphones } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const { unlockAudio } = useAudio();
  const screenRef = useRef<HTMLDivElement | null>(null);
  const titleLettersRef = useRef<HTMLSpanElement[]>([]);

  // 1. Percentage counter simulation
  useEffect(() => {
    const duration = 1200; // 1.2s — snappy on Vercel CDN
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextPercent = Math.min(100, Math.floor((currentStep / steps) * 100));
      setPercent(nextPercent);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoaded(true);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // 2. Letter reveal stagger animation
  useEffect(() => {
    if (titleLettersRef.current.length > 0) {
      gsap.fromTo(
        titleLettersRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          duration: 1.5, 
          stagger: 0.08, 
          ease: "power4.out" 
        }
      );
    }
  }, []);

  // 3. Trigger cinematic slide out when clicking Enter
  const handleEnter = async () => {
    setIsClicked(true);
    
    // Unlock the browser audio context
    await unlockAudio();

    // GSAP slide-up curtain effect
    if (screenRef.current) {
      gsap.to(screenRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: () => {
          onComplete();
        }
      });
    }
  };

  const titleText = "PRATHMESH SINGH";

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 w-full h-full bg-[#050505] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
    >
      {/* Subtle Background Reference Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 filter brightness-75 contrast-110"
        style={{ backgroundImage: `url("${encodeURI("/Website Background Referene Image.JPG")}")` }}
      />
      {/* Dark vignette gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)] pointer-events-none" />

      {/* Top Details */}
      <div className="relative z-10 flex justify-between w-full text-white/40 text-[9px] tracking-[0.2em] font-medium">
        <span>WWW.ARAWALA.COM</span>
        <span />
      </div>

      {/* Center Cinematic Logo & CTA */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-8xl font-light font-brittany text-white flex gap-[0.4em] mb-8 justify-center select-none text-mask-reveal py-8 leading-normal">
          <span
            ref={(el) => {
              if (el) titleLettersRef.current[0] = el;
            }}
            className="inline-block transform-gpu px-2"
          >
            Prathmesh
          </span>
          <span
            ref={(el) => {
              if (el) titleLettersRef.current[1] = el;
            }}
            className="inline-block transform-gpu px-2"
          >
            Singh
          </span>
        </h1>

        {/* Dynamic transition between loading progress and "Enter" CTA */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isLoaded ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                {/* Numeric counter */}
                <span className="text-xl md:text-2xl font-light text-gold/80 tracking-widest font-mono">
                  {percent.toString().padStart(3, "0")}%
                </span>
                {/* Micro line indicator */}
                <div className="w-40 h-[1px] bg-white/10 mt-3 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gold transition-all duration-100 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <button
                  onClick={handleEnter}
                  disabled={isClicked}
                  className="px-8 py-3.5 rounded-full border border-gold/40 hover:border-gold bg-gold/5 text-gold tracking-[0.3em] font-bold text-xs uppercase cursor-pointer hover:bg-gold/15 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] flex items-center gap-3 relative overflow-hidden group"
                  data-cursor="magnetic"
                >
                  <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>ENTER SUKOON</span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom status details */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full gap-4 text-white/30 text-[9px] tracking-wider uppercase">
        <div />
        <span className="text-gold/60">BEST EXPERIENCED WITH HEADPHONES</span>
      </div>
    </div>
  );
}
