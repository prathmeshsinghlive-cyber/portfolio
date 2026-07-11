"use client";

import { useState } from "react";
import { useAudio } from "@/components/providers/audio-context";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX, MessageSquare, X } from "lucide-react";

interface TriviaOption {
  question: string;
  answer: string;
  voiceText: string;
}

const TRIVIA_OPTIONS: TriviaOption[] = [
  {
    question: "Introduce the Artist",
    answer: "Prathmesh Singh is an award-winning cinematic vocalist, songwriter, and creative director known for bridging the gap between luxury art, cyber-synth soundscapes, and raw orchestral soul.",
    voiceText: "Welcome. Prathmesh Singh is an award winning cinematic vocalist, songwriter, and creative director known for bridging the gap between luxury art, cyber-synth soundscapes, and raw orchestral soul."
  },
  {
    question: "About the Latest Album",
    answer: "'Stellar Echoes' is Prathmesh Singh's fourth studio album, exploring themes of cosmic isolation, synthetic warmth, and future relationships. It has already amassed over 500 million global streams.",
    voiceText: "His latest album, Stellar Echoes, is Prathmesh Singh's fourth studio album, exploring themes of cosmic isolation, synthetic warmth, and future relationships. It has already amassed over 500 million global streams."
  },
  {
    question: "Next Concert Tour",
    answer: "Prathmesh Singh will perform live at the Royal Arena in London on November 15, featuring a 60-piece orchestra, lasers, fog effects, and a custom 3D projection stage.",
    voiceText: "Prathmesh Singh will perform live at the Royal Arena in London on November 15th, featuring a 60-piece orchestra, lasers, fog effects, and a custom 3D projection stage. Tickets are selling fast."
  },
  {
    question: "Major Career Awards",
    answer: "Prathmesh Singh has won 3 Grammy Awards, including Album of the Year, and has been featured on Awwwards for his visual storytelling in digital music.",
    voiceText: "Prathmesh Singh has won three Grammy Awards, including Album of the Year, and has been featured on Awwwards for his visual storytelling in digital music."
  }
];

export default function AIAssistant() {
  const { speakText, isSpeaking, isMuted } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState<string>("");
  const [lastQuestion, setLastQuestion] = useState<string>("");

  const handleAsk = (option: TriviaOption) => {
    setLastQuestion(option.question);
    setActiveSubtitle(option.answer);
    
    // Check if browser voice is muted or not supported
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speakText(option.voiceText);
    } else {
      // Fallback if SpeechSynthesis is blocked or unsupported
      setActiveSubtitle(option.answer + " (Voice synthesis is not supported on this browser)");
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* 1. ASSISTANT HOLOGRAPHIC CORE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 p-5 rounded-2xl glass border border-white/10 shadow-2xl mb-4 text-white flex flex-col relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-gold uppercase">PRATHMESH SINGH VOICE CORE v1.0</span>
              </div>
              <button 
                onClick={handleClose} 
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Speaking visualizer orbit */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Outer pulsing ring */}
                <motion.div
                  animate={isSpeaking ? { scale: [1, 1.25, 1], opacity: [0.1, 0.4, 0.1] } : { scale: 1, opacity: 0.1 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-gold"
                />
                
                {/* Secondary pulsing ring */}
                <motion.div
                  animate={isSpeaking ? { scale: [1, 1.4, 1], opacity: [0.05, 0.25, 0.05] } : { scale: 1, opacity: 0.05 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute inset-[-10px] rounded-full border border-purple"
                />

                {/* Central Core sphere */}
                <motion.div 
                  animate={isSpeaking ? { rotate: 360 } : { rotate: 0 }}
                  transition={isSpeaking ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 1 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple via-gold to-pink opacity-80 flex items-center justify-center shadow-lg"
                  style={{ filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))" }}
                >
                  <Sparkles className="w-5 h-5 text-black" />
                </motion.div>
              </div>
              
              {isSpeaking && (
                <span className="text-[9px] tracking-widest text-gold uppercase mt-2 animate-pulse">
                  SPEAKING VOICE GENERATION
                </span>
              )}
            </div>

            {/* Interactive Query buttons */}
            <div className="flex flex-col gap-1.5 mb-3">
              <span className="text-[9px] text-white/40 tracking-wider uppercase mb-1">Select a Query:</span>
              {TRIVIA_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAsk(opt)}
                  disabled={isSpeaking}
                  className={`text-xs text-left px-3 py-2 rounded-lg transition-all border ${
                    lastQuestion === opt.question
                      ? "border-gold/60 bg-gold/10 text-white font-semibold"
                      : "border-white/5 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  } disabled:opacity-50`}
                >
                  {opt.question}
                </button>
              ))}
            </div>

            {/* Display Text / Speech Subtitles */}
            {activeSubtitle && (
              <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-[11px] leading-relaxed text-white/80 max-h-24 overflow-y-auto">
                <span className="font-semibold text-gold block mb-1">
                  {lastQuestion || "Response"}:
                </span>
                {activeSubtitle}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CORE TOGGLE BALL BUTTON */}
      <motion.button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full glass border border-gold/40 flex items-center justify-center text-gold shadow-2xl relative"
        style={{
          boxShadow: isSpeaking 
            ? "0 0 25px rgba(212, 175, 55, 0.6)" 
            : "0 10px 30px rgba(0,0,0,0.5)",
        }}
        data-cursor="magnetic"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} className="relative">
              {isSpeaking ? <Volume2 className="w-6 h-6 animate-bounce" /> : <MessageSquare className="w-6 h-6" />}
              {/* Little sparkle dot badge */}
              <span className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-purple rounded-full animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
