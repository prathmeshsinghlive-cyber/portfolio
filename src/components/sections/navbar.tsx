"use client";

import { useEffect, useState, useRef } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Volume2, VolumeX, Menu, X } from "lucide-react";

interface NavbarProps {
  currentSection: string;
}

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Story" },
  { id: "discography", label: "Music" },
  { id: "live", label: "Upcoming" },
  { id: "gallery", label: "Visuals" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ currentSection }: NavbarProps) {
  const { isPlaying, togglePlay, isMuted, toggleMute } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNavigatingRef = useRef(false);

  // 1. Scroll hiding / reveal logic using Lenis smooth scroll tracking
  useLenis((lenis) => {
    if (isNavigatingRef.current) {
      setIsVisible(true);
      return;
    }

    const scroll = lenis.scroll;
    const direction = lenis.direction; // 1 = down, -1 = up

    // Determine background transparency based on scroll depth
    if (scroll > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on scroll down, show on scroll up
    if (direction === 1 && scroll > 150) {
      setIsVisible(false);
    } else if (direction === -1 || scroll < 50) {
      setIsVisible(true);
    }
  });

  // 2. Light / Dark mode toggle
  const toggleTheme = () => {
    const root = document.documentElement;
    if (isThemeDark) {
      root.classList.remove("dark");
      setIsThemeDark(false);
    } else {
      root.classList.add("dark");
      setIsThemeDark(true);
    }
  };

  // Synchronize default dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isNavigatingRef.current = true;
      setIsVisible(true);
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1200);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 flex justify-between items-center ${
          isScrolled 
            ? "glass py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)]" 
            : "bg-transparent"
        }`}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick("hero")}
          className="text-xl md:text-2xl font-light font-serif-lux tracking-[0.2em] text-foreground cursor-pointer flex items-center gap-1.5 select-none"
          data-cursor="magnetic"
        >
          <span>Prathmesh Singh</span>
        </div>

        {/* Desktop Menu links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs uppercase tracking-widest transition-all relative py-1 cursor-pointer font-medium ${
                  isActive ? "text-gold font-bold" : "text-foreground/60 hover:text-foreground"
                }`}
                data-cursor="magnetic"
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Controls & Widget buttons */}
        <div className="flex items-center gap-4">
          {/* Mini Real-time Equalizer Widget */}
          <div 
            onClick={togglePlay}
            className="flex items-end gap-[3px] h-5 cursor-pointer px-2 border-r border-foreground/10 pr-4"
            title="Toggle Synthesizer Music"
            data-cursor="play"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={isPlaying ? { height: [4, 18, 4] } : { height: 4 }}
                transition={
                  isPlaying
                    ? {
                        repeat: Infinity,
                        duration: 0.6 + i * 0.15,
                        ease: "easeInOut",
                      }
                    : { duration: 0.2 }
                }
                className="w-[2.5px] bg-gold rounded-full"
              />
            ))}
          </div>

          {/* Mute button */}
          <button 
            onClick={toggleMute}
            className="text-foreground/60 hover:text-foreground p-1 transition-colors"
            data-cursor="magnetic"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="text-foreground/60 hover:text-foreground p-1 transition-colors"
            data-cursor="magnetic"
            title="Change Theme"
          >
            {isThemeDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-foreground/80 hover:text-foreground p-1 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* 3. MOBILE MENU PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-background w-full h-full flex flex-col p-8 justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-light tracking-[0.2em] text-foreground">Prathmesh Singh</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-6 my-auto text-center">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-xl uppercase tracking-widest text-foreground/80 hover:text-gold active:scale-95 transition-all py-1 cursor-pointer font-light"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Bottom Credits */}
            <div className="text-center text-foreground/30 text-[9px] tracking-widest uppercase">
              LUXURY DIGITAL CONCERT EXPERIENCE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
