"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Sync GSAP ScrollTrigger with Lenis scroll
    const lenisInstance = lenisRef.current?.lenis;
    if (!lenisInstance) return;

    lenisInstance.on("scroll", ScrollTrigger.update);
    ScrollTrigger.defaults({ markers: false });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      options={{
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
