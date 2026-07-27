"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/sections/loading-screen";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Discography from "@/components/sections/discography";
import LivePerformances from "@/components/sections/live-performances";
import VideoGallery from "@/components/sections/video-gallery";
import PhotoExperience from "@/components/sections/photo-experience";
import AchievementsMedia from "@/components/sections/achievements-media";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [konamiActive, setKonamiActive] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Konami Code Sequence: Up Up Down Down Left Right Left Right B A
  const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  // 1. Keyboard Konami Code Trigger Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.key || !konamiCode[konamiIndex]) return;

      const key = e.key.toLowerCase();
      const targetKey = konamiCode[konamiIndex].toLowerCase();

      if (key === targetKey) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);

        if (nextIndex === konamiCode.length) {
          // Trigger concert laser show!
          setKonamiActive(true);
          setKonamiIndex(0);
          
          // Disable after 12 seconds automatically
          setTimeout(() => {
            setKonamiActive(false);
          }, 12000);
        }
      } else {
        // Reset index on mistake
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  // 2. Scroll Intersection Observer for Navbar links
  useEffect(() => {
    if (!loadingComplete) return;

    const sections = ["hero", "about", "photos", "discography", "live", "gallery", "achievements", "contact"];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(secId);
          }
        },
        { threshold: 0.15, rootMargin: "-10% 0px -30% 0px" }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [loadingComplete]);

  return (
    <>
      {/* 1. Cinematic Entrance Loading Curtain */}
      <AnimatePresence>
        {!loadingComplete && (
          <LoadingScreen key="loading" onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Site wrapper */}
      {loadingComplete && (
        <div className="relative min-h-screen bg-background text-foreground">
          
          {/* Noise overlay texture */}
          <div className="grain-overlay" />

          {/* Floating interactive navbar */}
          <Navbar currentSection={currentSection} />

          {/* Page Sections Stack */}
          <main>
            <Hero />
            <About />
            <PhotoExperience />
            <Discography />
            <LivePerformances />
            <VideoGallery />
            <AchievementsMedia />
            <Testimonials />
            <Contact />
          </main>

          {/* Footer Ending block */}
          <Footer />



          {/* 3. EASTER EGG: KONAMI CODE CONCERT LASER Sweepers */}
          <AnimatePresence>
            {konamiActive && (
              <>
                {/* Neon Status Alert Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[999] glass border border-purple/60 px-6 py-3 rounded-full flex items-center gap-2.5 shadow-[0_0_30px_rgba(138,43,226,0.4)] text-purple text-xs font-black tracking-[0.2em] uppercase select-none"
                >
                  <Sparkles className="w-4.5 h-4.5 text-gold animate-spin" />
                  <span>Easter Egg: Concert Laser Mode Active</span>
                </motion.div>

                {/* Sweeping Laser Graphics */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`fixed top-0 bottom-0 w-[1.5px] z-[998] pointer-events-none ${
                      i % 3 === 0 
                        ? "stage-laser-gold" 
                        : i % 2 === 0 
                        ? "stage-laser-blue" 
                        : "stage-laser"
                    }`}
                    style={{
                      left: `${15 + i * 14}%`,
                      transformOrigin: "top center",
                      boxShadow: "0 0 25px currentColor"
                    }}
                    animate={{
                      rotate: [-20, 20, -20],
                      opacity: [0.3, 0.9, 0.3],
                    }}
                    transition={{
                      duration: 2.5 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}
