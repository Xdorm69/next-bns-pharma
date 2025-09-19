"use client";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Hero from "./Hero";

gsap.registerPlugin(SplitText);

const HeroPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Disable scroll while first-load animations run
  useEffect(() => {
    document.body.classList.add("noscroll");
    document.body.classList.remove("noscroll");
  }, []);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    const heroTitle = new SplitText(".hero-title", { type: "words" });
    const heroSubtitle = new SplitText(".hero-subtitle", { type: "lines" });

    tl.from(heroTitle.words, { y: 80, opacity: 0, stagger: 0.1, duration: 1 })
      .from(".hero-img", { opacity: 0, x: 80, duration: 0.6 }, "<")
      .from(
        heroSubtitle.lines,
        { y: 40, opacity: 0, stagger: 0.15, duration: 0.8 },
        "-=0.5"
      )
      .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
  }, []);

  return (
    <div ref={heroRef}>
      <Hero />
    </div>
  );
};

export default HeroPage;
