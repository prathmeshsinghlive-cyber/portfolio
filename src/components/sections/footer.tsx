"use client";

import { motion } from "framer-motion";

const handleScrollToTop = () => {
  const el = document.getElementById("hero");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer 
      className="relative bg-background overflow-hidden border-t border-white/5 py-16 px-6 md:px-16 select-none"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(138,43,226,0.06),transparent_80%)] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-12">

        {/* Centre-aligned Quote */}
        <div className="flex flex-col items-center text-center space-y-3 border-b border-white/5 pb-12">
          <h4 className="font-serif-lux italic text-xl md:text-3xl text-white/95 leading-relaxed max-w-2xl">
            "Is bhaag daud bhari zindagi me, aao thoda sa sukoon dhundte hain"
          </h4>
          <p className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-mono">
            PRATHMESH SINGH // INDEPENDENT MUSICIAN
          </p>
        </div>

        {/* Bottom Credits & Giant Logo */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[9px] tracking-[0.2em] uppercase font-mono">
            <span>
              Made by{" "}
              <a
                href="tel:+917390957724"
                className="text-white/60 hover:text-gold transition-colors cursor-pointer underline-offset-2 hover:underline"
              >
                Shubham Shukla
              </a>
              {" "}with ❤️ in India
            </span>
            <motion.span 
              onClick={handleScrollToTop}
              whileHover={{ y: -2 }}
              className="hover:text-gold cursor-pointer transition-colors font-bold"
              data-cursor="magnetic"
            >
              SCROLL TO TOP ↑
            </motion.span>
            <span>ALL RIGHTS RESERVED</span>
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
