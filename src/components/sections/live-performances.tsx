"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function LivePerformances() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer logic targeting November 19, 2026
  useEffect(() => {
    const targetDate = new Date("November 19, 2026 00:00:00").getTime();

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
      className="relative py-20 md:py-24 bg-background overflow-hidden px-4 md:px-16 border-t border-white/5"
    >
      {/* Background concert haze lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gold/15 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Main Banner Container */}
        <div className="w-full rounded-3xl glass border border-white/10 p-6 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
          
          {/* Centered poster background across full banner */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <img 
              src="/Upcoming/IMG_5290.PNG" 
              alt="Pyari Si Tu Poster" 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-60 md:opacity-70 transition-opacity duration-700"
            />
            {/* Balanced dark gradient vignettes to keep text and countdown timer 100% crisp */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-zinc-950/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-zinc-950/65" />
          </div>

          {/* Left Side: Headline, Caption & Pre-save links */}
          <div className="relative z-10 flex flex-col text-left max-w-full lg:max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
                NEW SINGLE RELEASE
              </span>
            </div>
            
            <h3 className="text-2xl md:text-5xl font-light font-serif-lux text-white italic leading-tight">
              Prathmesh Singh: <br />
              <span className="text-gold not-italic font-black uppercase tracking-wider text-3xl md:text-5xl block mt-1 drop-shadow-md">
                Pyari Si Tu
              </span>
            </h3>
            
            {/* Caption sentence with direct artist profile links (no underlines) */}
            <p className="text-sm md:text-base text-white/80 font-light mt-3 leading-relaxed">
              Pre Save now on{" "}
              <a 
                href="https://open.spotify.com/artist/5d75hQdlksXwkeHbfXYySO" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#1DB954] font-semibold hover:text-[#1ed760] transition-colors"
              >
                Spotify
              </a>{" "}
              or{" "}
              <a 
                href="https://music.apple.com/in/artist/prathmesh-singh/1791280625" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#FC3C44] font-semibold hover:text-[#ff4f56] transition-colors"
              >
                Apple Music
              </a>
            </p>
          </div>

          {/* Right Side: Countdown Clock */}
          <div className="relative z-10 flex flex-col items-start lg:items-end w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] tracking-[0.25em] text-white/70 uppercase font-mono font-semibold">
                COUNTDOWN TO 19 NOVEMBER 2026
              </span>
            </div>

              {/* Countdown Blocks */}
              <div className="flex gap-2 md:gap-4 flex-wrap justify-start lg:justify-end">
                {[
                  { label: "DAYS", val: countdown.days },
                  { label: "HRS", val: countdown.hours },
                  { label: "MINS", val: countdown.minutes },
                  { label: "SECS", val: countdown.seconds }
                ].map((time, i) => (
                  <div 
                    key={i} 
                    className="w-16 h-20 md:w-20 md:h-24 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 flex flex-col justify-center items-center relative overflow-hidden shadow-2xl group hover:border-gold/60 transition-colors"
                  >
                    {/* Glass highlight slice */}
                    <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 z-10" />
                    
                    <span className="text-2xl md:text-3xl font-black text-white font-mono z-20 tracking-tight">
                      {time.val.toString().padStart(2, "0")}
                    </span>
                    
                    <span className="text-[8px] md:text-[9px] tracking-widest text-gold font-bold mt-1 z-20 font-mono">
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


