"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Preloader from "../Preloader";
import Hero from "./Hero";

gsap.registerPlugin(SplitText);


const HeroPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // disable scroll while preloader is active
//   useEffect(() => {
//     document.body.classList.add("noscroll");
//   }, []);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    //   onComplete: () => {
        
    //     document.body.classList.remove("noscroll"); // enable scroll
    //   },
    });

    // --- Preloader animation ---
    // tl.fromTo(
    //   ".preloader-logo",
    //   { scale: 0.8, opacity: 0 },
    //   { scale: 1, opacity: 1, duration: 1 }
    // )
    //   .fromTo(
    //     ".preloader-bar",
    //     { scaleX: 0 },
    //     { scaleX: 1, duration: 1.2 },
    //     "-=0.5"
    //   )
    //   .to(".preloader", { opacity: 0, duration: 0.6, delay: 0.3 });

    // --- Hero animations ---
    const heroTitle = new SplitText(".hero-title", { type: "words" });
    const heroSubtitle = new SplitText(".hero-subtitle", { type: "lines" });

    tl.from(heroTitle.words, { y: 80, opacity: 0, stagger: 0.1, duration: 1 });
    tl.from(".hero-img", { opacity: 0, x: 80, duration: 0.6 }, "<");
    tl.from(
      heroSubtitle.lines,
      { y: 40, opacity: 0, stagger: 0.15, duration: 0.8 },
      "-=0.5"
    );
    tl.from(".hero-buttons", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
  }, []);

  return (
    <div ref={heroRef}>
      {/* <Preloader /> */}
      <Hero />
    </div>
  );
};

export default HeroPage;
