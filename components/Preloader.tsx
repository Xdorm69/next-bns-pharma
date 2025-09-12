"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // Hide preloader after animation
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
      },
    });

    // Animate logo
    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    );

    // Animate progress bar
    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2 },
      "-=0.5"
    );

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
    });
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
    >
      <h1
        ref={logoRef}
        className="text-4xl font-bold text-primary font-mono tracking-wide"
      >
        PharmaCo.
      </h1>
      <div className="mt-6 w-48 h-1 bg-gray-200 overflow-hidden rounded-full">
        <div ref={barRef} className="h-full bg-primary origin-left scale-x-0" />
      </div>
    </div>
  );
}
