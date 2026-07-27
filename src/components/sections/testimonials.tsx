"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatarColor: string;
}

const ITEMS: Testimonial[] = [
  {
    id: "fan-1",
    name: "Miraya",
    location: "Jaipur, India",
    quote: "Ramz has been on loop since the day it dropped. The raw honesty in Prathmesh's voice makes you feel every single word deeply.",
    avatarColor: "from-purple-500 to-pink-500",
  },
  {
    id: "fan-2",
    name: "Raghvi",
    location: "Jabalpur, India",
    quote: "Khwabon Me Tujhe brings back so many memories. It's rare to find an independent singer-songwriter whose melodies stay with you all day.",
    avatarColor: "from-amber-400 to-orange-500",
  },
  {
    id: "fan-3",
    name: "Aman",
    location: "Unnao, India",
    quote: "Bas Kar Ye Teri Baatein speaks to anyone who has ever had to choose between their dreams and love. Pure emotion and timeless composition.",
    avatarColor: "from-blue-500 to-indigo-600",
  },
  {
    id: "fan-4",
    name: "Ananya",
    location: "Indore, India",
    quote: "Tera Asar is that comfort song you play when you just want to sit back, close your eyes, and feel peaceful. Brilliant songwriting!",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "fan-5",
    name: "Kavya",
    location: "Ara, Bihar",
    quote: "Listening to an artist from Ara reach IIT Mandi and create such soulful music independently is truly inspiring for all of us.",
    avatarColor: "from-rose-500 to-red-500",
  },
  {
    id: "fan-6",
    name: "Rohan",
    location: "Lucknow, India",
    quote: "Pyari Si Tu is going to be an absolute masterpiece. The snippet alone gives me chills. Can't wait for 19th November!",
    avatarColor: "from-yellow-400 to-amber-600",
  },
  {
    id: "fan-7",
    name: "Sneha",
    location: "Chandigarh, India",
    quote: "Maa Forever made me call my mother right after listening. Prathmesh knows how to express emotions we often find hard to say out loud.",
    avatarColor: "from-cyan-500 to-blue-600",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-center">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">FAN TESTIMONIALS</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Voices of the Community
          </h3>
          <p className="mt-3 text-sm text-white/40 font-light max-w-xl">
            Real stories, feelings, and messages from listeners across the country.
          </p>
        </div>

        {/* 3D Stacked Cards Carousel Container */}
        <div className="relative w-full h-[340px] md:h-[340px] flex items-center justify-center select-none">
          {ITEMS.map((item, idx) => {
            // Calculate 3D offset placement relative to active index
            let offset = idx - activeIndex;
            if (offset < -Math.floor(ITEMS.length / 2)) offset += ITEMS.length;
            if (offset > Math.floor(ITEMS.length / 2)) offset -= ITEMS.length;

            const isActive = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            let x = 0;
            let scale = 1;
            let rotate = 0;
            let zIndex = 10;
            let opacity = 1;

            if (isActive) {
              x = 0;
              scale = 1.0;
              rotate = 0;
              zIndex = 30;
            } else if (isPrev) {
              x = -240;
              scale = 0.85;
              rotate = -6;
              zIndex = 20;
              opacity = 0.5;
            } else if (isNext) {
              x = 240;
              scale = 0.85;
              rotate = 6;
              zIndex = 20;
              opacity = 0.5;
            } else {
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={item.id}
                animate={{
                  x,
                  scale,
                  rotate,
                  zIndex,
                  opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 20
                }}
                onClick={() => {
                  if (!isActive) setActiveIndex(idx);
                }}
                className={`absolute w-full max-w-[88vw] sm:max-w-[400px] rounded-3xl glass p-5 md:p-8 border border-white/10 shadow-2xl flex flex-col justify-between cursor-pointer ${
                  isActive ? "cursor-default" : "pointer-events-auto"
                }`}
                style={{ originY: 0.5 }}
              >
                {/* Quotation Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-gold/40" />
                  <span className="text-[9px] font-mono text-gold/70 tracking-widest uppercase">
                    COMMUNITY MESSAGE
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm md:text-base text-white/90 font-serif-lux italic leading-relaxed text-left mb-6">
                  “{item.quote}”
                </p>

                {/* Profile Info (No audio element) */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  {/* Avatar Circle */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarColor} shrink-0 shadow-lg`} />
                  
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gold/80 font-mono tracking-widest uppercase">
                      {item.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Buttons & Indicator */}
        <div className="flex items-center gap-5 mt-10">
          <button 
            type="button"
            onClick={handlePrev}
            className="p-3.5 rounded-full glass border border-white/10 hover:border-gold text-foreground hover:text-gold transition-all duration-300 cursor-pointer shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-mono text-white/60 tracking-widest">
            {String(activeIndex + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
          </span>

          <button 
            type="button"
            onClick={handleNext}
            className="p-3.5 rounded-full glass border border-white/10 hover:border-gold text-foreground hover:text-gold transition-all duration-300 cursor-pointer shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
