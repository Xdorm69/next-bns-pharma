"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
  useGSAP(() => {
    // --- Preloader animation ---
    const tl = gsap.timeline({onComplete: () => {
      document.querySelector(".preloader")?.classList.add("hidden");
    }});
    tl.fromTo(
      ".preloader-logo",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    )
      .fromTo(
        ".preloader-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2 },
        "-=0.5"
      )
      .to(".preloader", { opacity: 0, duration: 0.6, delay: 0.3 });
  }, [])
  return (
    <div className="preloader fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <h1 className="preloader-logo text-4xl font-bold text-primary font-mono tracking-wide">
        PharmaCo.
      </h1>
      <div className="mt-6 w-48 h-1 bg-gray-200 overflow-hidden rounded-full">
        <div className="preloader-bar h-full bg-primary origin-left scale-x-0" />
      </div>
    </div>
  );
}
