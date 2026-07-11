"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "play" | "view" | "drag" | "hover" | "magnetic">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

  // Motion values for exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configuration for smooth trailing effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Show cursor on first mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (magneticElement) {
        // Magnetic pull physics
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        
        // Pull mouse coordinates slightly towards center of element
        mouseX.set(centerX + distX * 0.35);
        mouseY.set(centerY + distY * 0.35);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Generic mouseover scanner for cursor states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest element with interactive classes or data attributes
      const interactiveEl = target.closest("[data-cursor]") as HTMLElement | null;
      const isButtonOrLink = target.closest("a, button, input[type='submit'], select, textarea") !== null;

      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") as any;
        setCursorType(type || "hover");
        
        if (type === "magnetic") {
          setMagneticElement(interactiveEl);
        }
      } else if (isButtonOrLink) {
        setCursorType("hover");
      } else {
        setCursorType("default");
        setMagneticElement(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, magneticElement, mouseX, mouseY]);

  if (typeof window === "undefined" || !isVisible) return null;

  // Custom styling states for the trailing circle
  const sizeMap = {
    default: 16,
    hover: 44,
    play: 80,
    view: 80,
    drag: 70,
    magnetic: 60,
  };

  const currentSize = sizeMap[cursorType];

  return (
    <>
      {/* 1. Precise Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gold pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          width: cursorType === "default" ? 6 : 0,
          height: cursorType === "default" ? 6 : 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "tween", duration: 0.05 }}
      />

      {/* 2. Spring Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold/40 pointer-events-none z-[99998] flex items-center justify-center text-[10px] font-bold tracking-widest text-gold hidden md:flex"
        style={{
          x: trailX,
          y: trailY,
          width: currentSize,
          height: currentSize,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: cursorType === "play" || cursorType === "view" || cursorType === "drag"
            ? "rgba(212, 175, 55, 0.15)"
            : "rgba(212, 175, 55, 0)",
          borderColor: cursorType === "hover" 
            ? "rgba(138, 43, 226, 0.6)" // Purple glow on hover
            : cursorType === "magnetic"
            ? "rgba(212, 175, 55, 0.8)"
            : "rgba(212, 175, 55, 0.4)",
          boxShadow: cursorType === "hover" 
            ? "0 0 15px rgba(138, 43, 226, 0.3)" 
            : cursorType === "play" || cursorType === "view"
            ? "0 0 20px rgba(212, 175, 55, 0.2)"
            : "none",
        }}
      >
        {/* Render text overlay depending on type */}
        {cursorType === "play" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="select-none flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 mb-0.5 text-gold">
              <path d="M8 5v14l11-7z" />
            </svg>
            PLAY
          </motion.span>
        )}
        {cursorType === "view" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="select-none text-gold">
            VIEW
          </motion.span>
        )}
        {cursorType === "drag" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="select-none text-gold flex items-center justify-between w-full px-2">
            <span>←</span>
            <span>DRAG</span>
            <span>→</span>
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
