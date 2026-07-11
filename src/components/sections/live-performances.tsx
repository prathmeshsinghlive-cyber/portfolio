"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LivePerformances() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer logic targeting September 15, 2026
  useEffect(() => {
    const targetDate = new Date("September 15, 2026 20:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="live" 
      className="relative py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      {/* Background concert haze lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Countdown Banner / Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">NEW SINGLE RELEASE</span>
            <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-white italic leading-tight">
              Prathmesh Singh: <br />
              <span className="text-white not-italic font-black uppercase tracking-wider text-4xl md:text-6xl">
                Nebulous Orbit
              </span>
            </h3>
            <p className="text-sm text-white/60 font-light mt-4 max-w-md">
              Witness the launch of the new single, combining sweeping ambient synthesis, 3D spatial field dynamics, and raw vocals. Pre-save now on Spotify and Apple Music.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end">
            <span className="text-[9px] tracking-widest text-white/50 uppercase font-mono mb-3">
              COUNTDOWN TO OFFICIAL SINGLE RELEASE
            </span>
            <div className="flex gap-4">
              {[
                { label: "DAYS", val: countdown.days },
                { label: "HRS", val: countdown.hours },
                { label: "MINS", val: countdown.minutes },
                { label: "SECS", val: countdown.seconds }
              ].map((time, i) => (
                <div 
                  key={i} 
                  className="w-16 h-20 md:w-20 md:h-24 rounded-2xl glass border border-white/10 flex flex-col justify-center items-center relative overflow-hidden"
                >
                  {/* Top slice line */}
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-black/40 z-10" />
                  <span className="text-2xl md:text-3xl font-black text-white font-mono z-20">
                    {time.val.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[8px] md:text-[9px] tracking-widest text-gold font-bold mt-1 z-20">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
