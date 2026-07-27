"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Track {
  id: string;
  title: string;
  album: string;
  genre: string;
  duration: string;
  color: string;
  description: string;
  audioUrl: string;
  coverUrl: string;
}

export const PLAYLIST: Track[] = [
  {
    id: "track-1",
    title: "Ramz",
    album: "Originals",
    genre: "Indie Pop",
    duration: "3:35",
    color: "#8A2BE2",
    description: "Deep soul melodies blended with warm indie arrangements.",
    audioUrl: "/SongsMp3/1. Ramz.wav",
    coverUrl: "/SongsPoster/1. Ramz.png"
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
  const [duration, setDuration] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Audio HTML elements and Web Audio API Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Initialize and unlock audio context
  const unlockAudio = async (): Promise<boolean> => {
    if (isUnlocked) return true;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.src = PLAYLIST[currentTrackIndex].audioUrl;
      audioRef.current = audio;

      // Listen to timeupdate
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      // Listen to loadedmetadata
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      // Listen to ended
      audio.addEventListener("ended", () => {
        nextTrack();
      });

      // Analyser node
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      
      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      
      // Connect MediaElement Source
      const source = ctx.createMediaElementSource(audio);
      source.connect(masterGain);
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      masterGainRef.current = masterGain;
      mediaSourceRef.current = source;

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
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : clamped, audioCtxRef.current.currentTime);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.volume = nextMute ? 0 : volume;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(nextMute ? 0 : volume, audioCtxRef.current.currentTime);
    }
  };

  // Speech assistant
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
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
    
    const speechGain = ctx.createGain();
    speechGain.gain.setValueAtTime(0.01, ctx.currentTime);
    speechGain.connect(analyserRef.current);

    const playVocalFormant = () => {
      if (ctx.state === "suspended") return;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      osc.type = "sawtooth";
      const freq = 100 + Math.random() * 150;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(500 + Math.random() * 1000, ctx.currentTime);
      filter.Q.setValueAtTime(5, ctx.currentTime);

      osc.connect(filter);
      filter.connect(speechGain);
      
      osc.start();
      
      const dur = 0.05 + Math.random() * 0.15;
      osc.stop(ctx.currentTime + dur);
      
      speechOscsRef.current.push(osc);
    };

    speechIntervalRef.current = setInterval(playVocalFormant, 80);
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

  // Select a specific track
  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[index].audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Playback error:", err));
      }
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

  // Sync state transitions on isPlaying or track change
  useEffect(() => {
    if (audioRef.current && isUnlocked) {
      if (isPlaying) {
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
        audioRef.current.play().catch((err) => console.log("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, isUnlocked]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeechVisualization();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

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
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

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
