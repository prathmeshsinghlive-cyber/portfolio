"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "@/components/providers/audio-context";

interface AudioVisualizerProps {
  type?: "bars" | "wave" | "circle";
  color?: string;
  barWidth?: number;
  gap?: number;
  multiplier?: number;
}

export default function AudioVisualizer({
  type = "bars",
  color = "#D4AF37", // Gold
  barWidth = 3,
  gap = 2,
  multiplier = 1,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const { analyser, isPlaying } = useAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI screens
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Buffer for analyser data
    const bufferLength = analyser ? analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    // Idle sine wave parameters
    let phase = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Read audio data or simulate idle waves
      if (isPlaying && analyser) {
        if (type === "wave") {
          analyser.getByteTimeDomainData(dataArray);
        } else {
          analyser.getByteFrequencyData(dataArray);
        }
      } else {
        // Idle animation: fill with dummy wave/equalizer data
        phase += 0.05;
        for (let i = 0; i < bufferLength; i++) {
          if (type === "wave") {
            // Sine wave simulation
            const value = Math.sin(i * 0.1 + phase) * Math.sin(phase * 0.5) * 30 + 128;
            dataArray[i] = value;
          } else {
            // Pulsing equalizer simulation
            const noise = Math.sin(i * 0.2 - phase * 2) * 15 + 20;
            const decay = Math.max(0, 1 - i / bufferLength);
            dataArray[i] = Math.max(5, noise * decay * 2);
          }
        }
      }

      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      if (type === "bars") {
        // --- 1. EQUALIZER BARS ---
        const barCount = Math.min(60, width / (barWidth + gap));
        const actualGap = (width - barCount * barWidth) / (barCount - 1);
        
        for (let i = 0; i < barCount; i++) {
          // Map index to frequency array (prioritize bass/mids)
          const dataIndex = Math.floor((i / barCount) * (bufferLength * 0.6));
          const val = dataArray[dataIndex];
          
          // Calculate height
          const rawHeight = (val / 255) * height * multiplier;
          const finalHeight = Math.max(3, rawHeight);
          
          const x = i * (barWidth + actualGap);
          const y = height - finalHeight;

          // Draw rounded bars
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, finalHeight, 1.5);
          ctx.fill();
        }
      } else if (type === "wave") {
        // --- 2. SINUSOIDAL WAVE ---
        ctx.beginPath();
        
        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0; // 0.0 to 2.0
          const y = (v * height) / 2 * multiplier + (height / 2) * (1 - multiplier);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      } else if (type === "circle") {
        // --- 3. CIRCULAR EQUALIZER ---
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;
        
        const numPoints = Math.min(80, bufferLength);
        
        // Dynamic background glow
        const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.3);
        gradient.addColorStop(0, "rgba(212, 175, 55, 0.0)");
        gradient.addColorStop(1, "rgba(138, 43, 226, 0.05)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();

        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const dataIndex = Math.floor((i / numPoints) * (bufferLength * 0.7));
          const val = dataArray[dataIndex];
          const valNormalized = val / 255;
          
          const currentRadius = radius + valNormalized * 30 * multiplier;
          
          const x = centerX + Math.cos(angle) * currentRadius;
          const y = centerY + Math.sin(angle) * currentRadius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.stroke();
      }
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [analyser, isPlaying, type, color, barWidth, gap, multiplier]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
export type { AudioVisualizerProps };
