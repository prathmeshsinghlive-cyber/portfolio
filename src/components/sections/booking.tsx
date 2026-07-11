"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Mail, ShieldAlert, Sparkles, Check, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  price: string;
  features: string[];
  accent: string;
}

const TIRS: Tier[] = [
  {
    id: "tier-1",
    name: "Intimate Performance",
    price: "$15K",
    features: [
      "90-Minute Live Vocal Performance",
      "Piano & Synthesizer Accompaniment",
      "Custom 12-Song Set List Selection",
      "Max Guest Attendance: 150"
    ],
    accent: "#D4AF37" // Gold
  },
  {
    id: "tier-2",
    name: "Festival Mainstage",
    price: "$45K",
    features: [
      "120-Minute Full-Scale Production",
      "6-Piece Touring Synth-Orchestra Band",
      "Synchronized Laser & Fog Laser Syncs",
      "Full Stage Tech-Rider Coverage"
    ],
    accent: "#8A2BE2" // Purple
  },
  {
    id: "tier-3",
    name: "Private Gala Dome",
    price: "$80K",
    features: [
      "Completely Bespoke 3D Projection Mapping",
      "Tailor-Made Synthesizer Live Chords",
      "60-Piece Symphonic Orchestra Integration",
      "Global Travel Expenses Included"
    ],
    accent: "#FF69B4" // Pink
  }
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  
  // Form fields
  const [clientName, setClientName] = useState("");
  const [clientMail, setClientMail] = useState("");
  const [guestCount, setGuestCount] = useState("100");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Month details (Nov 2026)
  const daysInMonth = 30;
  const startDayOffset = 0; // Starts on Sunday (for grid alignment)
  const unavailableDates = [3, 7, 12, 15, 16, 22, 28]; // Pre-booked dates

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 2 && (!clientName || !clientMail)) {
      alert("Please fill in your name and email.");
      return;
    }
    if (step === 3 && selectedDate === null) {
      alert("Please select a date from the calendar.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleDateSelect = (day: number) => {
    if (unavailableDates.includes(day)) return; // skip unavailable dates
    setSelectedDate(day);
  };

  return (
    <section 
      id="booking" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-center w-full">
          <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">LIVE BOOKINGS</span>
          <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
            Book Prathmesh Singh Live
          </h3>
        </div>

        {/* Step Progress indicators */}
        <div className="flex items-center gap-2 mb-12 select-none text-[10px] font-mono tracking-widest text-white/40 uppercase">
          <span className={step >= 1 ? "text-gold font-bold" : ""}>Tiers</span>
          <span>→</span>
          <span className={step >= 2 ? "text-gold font-bold" : ""}>Details</span>
          <span>→</span>
          <span className={step >= 3 ? "text-gold font-bold" : ""}>Schedule</span>
          <span>→</span>
          <span className={step >= 4 ? "text-gold font-bold" : ""}>Complete</span>
        </div>

        {/* STEP CONTROLLER */}
        <div className="w-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SELECT TIER */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
              >
                {TIRS.map((tier) => (
                  <motion.div
                    key={tier.id}
                    whileHover={{ y: -6 }}
                    className="glass p-6 rounded-3xl border border-white/10 flex flex-col justify-between text-left relative overflow-hidden"
                    style={{
                      boxShadow: selectedTier?.id === tier.id 
                        ? `0 15px 30px ${tier.accent}15`
                        : "none",
                      borderColor: selectedTier?.id === tier.id 
                        ? tier.accent 
                        : "rgba(255, 255, 255, 0.08)"
                    }}
                  >
                    {/* Top background accent spot */}
                    <div 
                      className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-15"
                      style={{ backgroundColor: tier.accent }}
                    />

                    <div>
                      <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase block">
                        TIER SCHEDULER
                      </span>
                      <h4 className="text-lg font-bold text-white uppercase mt-1 tracking-wide">
                        {tier.name}
                      </h4>
                      <span className="text-3xl font-black font-mono text-gold block mt-3 mb-5">
                        {tier.price}
                      </span>
                      
                      <ul className="space-y-2 text-xs text-white/70 font-light border-t border-white/5 pt-4">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectTier(tier)}
                      className="w-full mt-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center cursor-pointer transition-all bg-white text-black hover:bg-gold hover:text-black"
                      data-cursor="magnetic"
                    >
                      SELECT TIER
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* STEP 2: FILL DETAILS */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-md mx-auto glass p-6 md:p-8 rounded-3xl border border-white/10 text-left space-y-5"
              >
                <div className="flex justify-between items-center mb-2">
                  <button 
                    onClick={handleBackStep}
                    className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 font-semibold uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <span className="text-[10px] font-mono text-gold tracking-wider uppercase">
                    STEP 2 OF 4
                  </span>
                </div>

                <h4 className="text-base font-bold text-white uppercase tracking-wider">
                  Client & Venue Details
                </h4>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">CLIENT NAME</label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 pl-10 text-xs text-white outline-none transition-colors"
                      />
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">CONTACT EMAIL</label>
                    <div className="relative">
                      <input 
                        type="email"
                        value={clientMail}
                        onChange={(e) => setClientMail(e.target.value)}
                        placeholder="john@venue.com" 
                        className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-xl p-3 pl-10 text-xs text-white outline-none transition-colors"
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">ESTIMATED ATTENDANCE</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 focus:border-gold rounded-xl p-3 text-xs text-white outline-none transition-colors"
                    >
                      <option value="50">Under 100 Guests</option>
                      <option value="200">100 - 500 Guests</option>
                      <option value="1000">500 - 2,000 Guests</option>
                      <option value="5000">Over 2,000 Guests</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-xl bg-white hover:bg-gold text-black hover:text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
                  data-cursor="magnetic"
                >
                  <span>SELECT DATE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 3: SELECT DATE (CALENDAR) */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-md mx-auto glass p-6 md:p-8 rounded-3xl border border-white/10 text-left space-y-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <button 
                    onClick={handleBackStep}
                    className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 font-semibold uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <span className="text-[10px] font-mono text-gold tracking-wider uppercase">
                    STEP 3 OF 4
                  </span>
                </div>

                <div className="text-left">
                  <h4 className="text-base font-bold text-white uppercase tracking-wider">
                    Secure Date (Nov 2026)
                  </h4>
                  <span className="text-[10px] text-white/40 block mt-1">
                    Select an open slot. Dates marked with red lines are fully pre-booked.
                  </span>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 border-t border-b border-white/5 py-4">
                  {/* Calendar Day headers */}
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <span key={d} className="text-center text-[9px] font-mono text-white/30 uppercase font-bold py-1">
                      {d}
                    </span>
                  ))}

                  {/* Empty offsets */}
                  {[...Array(startDayOffset)].map((_, i) => (
                    <div key={i} />
                  ))}

                  {/* Month Days */}
                  {[...Array(daysInMonth)].map((_, idx) => {
                    const day = idx + 1;
                    const isTaken = unavailableDates.includes(day);
                    const isSelected = selectedDate === day;

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        disabled={isTaken}
                        className={`aspect-square rounded-lg text-xs font-mono transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                          isTaken 
                            ? "text-white/20 line-through cursor-not-allowed bg-white/1" 
                            : isSelected
                            ? "bg-gold text-black font-bold shadow-md"
                            : "bg-white/5 hover:bg-white/10 text-white"
                        }`}
                        title={isTaken ? "Pre-Booked Concert Stage" : "Available"}
                      >
                        <span>{day}</span>
                        {/* Red block dot if pre-booked */}
                        {isTaken && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-pink" />
                        )}
                        {!isTaken && !isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedDate !== null && (
                  <div className="bg-gold/10 border border-gold/20 rounded-xl p-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                    <span className="text-xs text-white/80">
                      You have selected: <strong className="text-gold">November {selectedDate}, 2026</strong>.
                    </span>
                  </div>
                )}

                <button
                  onClick={handleNextStep}
                  disabled={selectedDate === null}
                  className="w-full py-3 rounded-xl bg-gold hover:bg-white text-black hover:text-black font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  data-cursor="magnetic"
                >
                  <span>REQUEST BOOKING</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto glass p-6 md:p-8 rounded-3xl border border-white/10 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                    Booking Request Lodged
                  </h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong className="text-white">{clientName}</strong>. Your request for the <strong className="text-white">{selectedTier?.name}</strong> package on <strong className="text-white">November {selectedDate}, 2026</strong> has been received. Our luxury management team will follow up via <strong className="text-white">{clientMail}</strong>.
                  </p>
                </div>

                <div className="bg-black/30 rounded-xl p-3 border border-white/5 text-[10px] text-white/40 tracking-wider uppercase font-mono">
                  TRANSMISSION REF ID: TX-{Math.floor(Math.random() * 89999) + 10000}
                </div>

                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedTier(null);
                    setSelectedDate(null);
                  }}
                  className="px-6 py-2.5 rounded-full border border-white/10 hover:border-gold hover:text-gold text-white text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
                  data-cursor="magnetic"
                >
                  NEW SCHEDULING REQUEST
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
export type { Tier };
