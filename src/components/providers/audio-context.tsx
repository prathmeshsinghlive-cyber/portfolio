"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Track {
  id: string;
  title: string;
  album: string;
  genre: string;
  duration: string;
  color: string; // Accent color theme (gold, purple, blue, pink)
  description: string;
}

export const PLAYLIST: Track[] = [
  {
    id: "track-1",
    title: "Nebula",
    album: "Stellar Echoes",
    genre: "Cinematic Ambient",
    duration: "3:45",
    color: "#8A2BE2", // Purple
    description: "A deep, cosmic drone pad evoking the infinite layout of a nebula, layered with shifting resonance."
  },
  {
    id: "track-2",
    title: "Midnight Drive",
    album: "Neon Horizons",
    genre: "Cyber Synthwave",
    duration: "4:12",
    color: "#FF69B4", // Pink
    description: "A driving, rhythmic arpeggiator that captures the neon-lit momentum of midnight highways."
  },
  {
    id: "track-3",
    title: "Golden Hour",
    album: "Sunlight & Dust",
    genre: "Dreamy Acoustic Plucks",
    duration: "3:10",
    color: "#D4AF37", // Gold
    description: "Gentle, organic pluck notes filtering through warm spaces, reminiscent of late afternoon light."
  },
  {
    id: "track-4",
    title: "Supernova",
    album: "Stellar Echoes",
    genre: "Cosmic Future Waves",
    duration: "5:02",
    color: "#0070f3", // Royal Blue
    description: "Rich, detuned sawtooth waves and dramatic filter sweeps simulating an exploding star."
  }
];

interface AudioContextType {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  progress: number;
  analyser: AnalyserNode | null;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  audioCtx: AudioContext | null;
  unlockAudio: () => Promise<boolean>;
  isUnlocked: boolean;
}

const AudioCtxContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const synthNodesRef = useRef<AudioNode[]>([]);
  const synthTimeRef = useRef<number>(0);

  const currentTrack = PLAYLIST[currentTrackIndex];
  const progress = (currentTime / (parseFloat(currentTrack.duration.split(":")[0]) * 60 + parseFloat(currentTrack.duration.split(":")[1]))) * 100;

  // Initialize and unlock audio context
  const unlockAudio = async (): Promise<boolean> => {
    if (isUnlocked) return true;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      // Analyser node
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      
      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      
      // Hook up
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      masterGainRef.current = masterGain;

      // Resume if suspended (browser security)
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      setIsUnlocked(true);
      return true;
    } catch (error) {
      console.error("Failed to unlock audio context:", error);
      return false;
    }
  };

  // Adjust volume
  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : clamped, audioCtxRef.current.currentTime);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(nextMute ? 0 : volume, audioCtxRef.current.currentTime);
    }
  };

  // Speech assistant
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to route speech through the Web Audio context visualizer by playing a subtle tone
    // Since browser speech synthesis API runs outside standard Web Audio context,
    // we will simulate the voice frequencies in our visualizer by injecting noise/oscillators 
    // into the analyser node during speech! This makes the visualizer pulse exactly when speaking.
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      startSpeechVisualization();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      stopSpeechVisualization();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      stopSpeechVisualization();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Inject speech frequencies into analyser
  const speechIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechOscsRef = useRef<OscillatorNode[]>([]);

  const startSpeechVisualization = () => {
    if (!audioCtxRef.current || !analyserRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Synthesize vocal formants to feed visualizer
    const speechGain = ctx.createGain();
    speechGain.gain.setValueAtTime(0.01, ctx.currentTime); // keep it extremely quiet, it's just to feed the visualizer
    speechGain.connect(analyserRef.current);

    const playVocalFormant = () => {
      if (ctx.state === "suspended") return;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      osc.type = "sawtooth";
      // random talking frequencies 80Hz - 300Hz
      const freq = 100 + Math.random() * 150;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(500 + Math.random() * 1000, ctx.currentTime); // Vocal formant simulation
      filter.Q.setValueAtTime(5, ctx.currentTime);

      osc.connect(filter);
      filter.connect(speechGain);
      
      osc.start();
      
      // envelope
      const duration = 0.05 + Math.random() * 0.15;
      osc.stop(ctx.currentTime + duration);
      
      speechOscsRef.current.push(osc);
    };

    speechIntervalRef.current = setInterval(() => {
      playVocalFormant();
    }, 80);
  };

  const stopSpeechVisualization = () => {
    if (speechIntervalRef.current) {
      clearInterval(speechIntervalRef.current);
      speechIntervalRef.current = null;
    }
    speechOscsRef.current.forEach(osc => {
      try { osc.stop(); } catch(e){}
    });
    speechOscsRef.current = [];
  };

  // Synthesizer Composition Logic per Song
  const startSynthesizer = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    
    const ctx = audioCtxRef.current;
    const dest = masterGainRef.current;

    // Delay Node for lush depth
    const delay = ctx.createDelay(1.0);
    const delayFeedback = ctx.createGain();
    delay.delayTime.setValueAtTime(0.4, ctx.currentTime);
    delayFeedback.gain.setValueAtTime(0.35, ctx.currentTime);
    
    delay.connect(delayFeedback);
    delayFeedback.connect(delay);
    delay.connect(dest);

    // Chorus/Reverb filter
    const spaceFilter = ctx.createBiquadFilter();
    spaceFilter.type = "lowpass";
    spaceFilter.frequency.setValueAtTime(1200, ctx.currentTime);
    spaceFilter.connect(dest);
    spaceFilter.connect(delay);

    let step = 0;
    synthTimeRef.current = 0;

    const playSynthTick = () => {
      if (ctx.state === "suspended") return;
      
      const now = ctx.currentTime;
      synthTimeRef.current += 0.25;
      setCurrentTime(prev => prev + 0.25);

      // Play chord/arpeggios depending on current index
      if (currentTrackIndex === 0) {
        // --- Song 1: Nebula (Cinematic Ambient Drone) ---
        // Play slow low minor 7th pad chords every 4 seconds
        if (step % 16 === 0) {
          const chord = [65.41, 77.78, 98.00, 116.54]; // C2, Eb2, G2, Bb2
          chord.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now);
            // subtle vibrato
            osc.frequency.setValueAtTime(freq + Math.sin(idx) * 2, now + 2);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + 1.5);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.9);
            
            osc.connect(gain);
            gain.connect(spaceFilter);
            
            osc.start(now);
            osc.stop(now + 4);
          });
        }
      } else if (currentTrackIndex === 1) {
        // --- Song 2: Midnight Drive (Cyber Synthwave) ---
        // Play rhythmic 16th arpeggio (every 0.25s)
        const notes = [130.81, 155.56, 196.00, 233.08, 261.63, 311.13, 392.00, 466.16]; // C3 minor pentatonic notes
        const currentNote = notes[step % notes.length];
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(currentNote, now);
        
        // filter sweep
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        const filterFreq = 400 + Math.sin(now * 0.5) * 600;
        filter.frequency.setValueAtTime(filterFreq, now);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.23);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(spaceFilter);
        
        osc.start(now);
        osc.stop(now + 0.25);

        // Low Bass pad on the downbeat
        if (step % 8 === 0) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = "sawtooth";
          bassOsc.frequency.setValueAtTime(65.41, now); // C2
          
          bassGain.gain.setValueAtTime(0.15, now);
          bassGain.gain.linearRampToValueAtTime(0.1, now + 1.5);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);
          
          bassOsc.connect(bassGain);
          bassGain.connect(dest);
          bassOsc.start(now);
          bassOsc.stop(now + 2);
        }
      } else if (currentTrackIndex === 2) {
        // --- Song 3: Golden Hour (Dreamy Acoustic Plucks) ---
        // Organic random acoustic guitar style plucks (sine + triangle)
        if (step % 2 === 0) {
          const notesG = [146.83, 196.00, 246.94, 293.66, 392.00, 493.88]; // G Major chords / scale (D3, G3, B3, D4, G4, B4)
          const randomNote = notesG[Math.floor(Math.random() * notesG.length)];
          
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc1.type = "triangle";
          osc1.frequency.setValueAtTime(randomNote, now);
          
          osc2.type = "sine";
          // slight detune
          osc2.frequency.setValueAtTime(randomNote * 1.005, now);
          
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
          
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(spaceFilter);
          
          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 1.0);
          osc2.stop(now + 1.0);
        }
      } else if (currentTrackIndex === 3) {
        // --- Song 4: Supernova (Cosmic Future Waves) ---
        // Detuned saws, rich chord layers and sound effects
        if (step % 8 === 0) {
          const baseFreq = [110.00, 138.59, 164.81, 220.00]; // A2, C#3, E3, A3 (A major)
          baseFreq.forEach((freq, i) => {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc1.type = "sawtooth";
            osc1.frequency.setValueAtTime(freq - 1, now);
            
            osc2.type = "sawtooth";
            osc2.frequency.setValueAtTime(freq + 1.5, now);
            
            const bandpass = ctx.createBiquadFilter();
            bandpass.type = "bandpass";
            bandpass.frequency.setValueAtTime(800 + Math.sin(now + i) * 300, now);
            bandpass.Q.setValueAtTime(2, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.95);
            
            osc1.connect(bandpass);
            osc2.connect(bandpass);
            bandpass.connect(gain);
            gain.connect(spaceFilter);
            
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 2.0);
            osc2.stop(now + 2.0);
          });
        }
      }

      step++;
    };

    // run loop every 250ms (matches step count)
    synthIntervalRef.current = setInterval(playSynthTick, 250);
  };

  const stopSynthesizer = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!isUnlocked) {
      unlockAudio().then((unlocked) => {
        if (unlocked) {
          setIsPlaying(true);
        }
      });
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      stopSynthesizer();
    } else {
      // Resume context if suspended
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
      startSynthesizer();
    }
  };

  // Select a specific track
  const selectTrack = (index: number) => {
    stopSynthesizer();
    setCurrentTrackIndex(index);
    setCurrentTime(0);

    if (isPlaying) {
      setTimeout(() => {
        startSynthesizer();
      }, 50);
    }
  };

  // Next Track
  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    selectTrack(nextIdx);
  };

  // Prev Track
  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    selectTrack(prevIdx);
  };

  // Sync state transitions on isPlaying change
  useEffect(() => {
    if (isPlaying && isUnlocked) {
      startSynthesizer();
    } else {
      stopSynthesizer();
    }
    return () => stopSynthesizer();
  }, [currentTrackIndex, isPlaying, isUnlocked]);

  // Clean up synthesis on unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
      stopSpeechVisualization();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <AudioCtxContext.Provider
      value={{
        tracks: PLAYLIST,
        currentTrackIndex,
        isPlaying,
        isMuted,
        volume,
        currentTime,
        progress,
        analyser: analyserRef.current,
        togglePlay,
        nextTrack,
        prevTrack,
        selectTrack,
        setVolume,
        toggleMute,
        speakText,
        isSpeaking,
        audioCtx: audioCtxRef.current,
        unlockAudio,
        isUnlocked,
      }}
    >
      {children}
    </AudioCtxContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioCtxContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
