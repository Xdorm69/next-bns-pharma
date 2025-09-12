"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeline = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const heading = containerRef.current.querySelector(".about-heading");
    const desc = containerRef.current.querySelector(".desc");
    const image = containerRef.current.querySelector(".image");
    const innerImage =
      containerRef.current.querySelector<HTMLDivElement>(".sec-image");

    const headingSplit = new SplitText(heading, { type: "words" });
    const descSplit = new SplitText(desc, { type: "lines" });

    // --- Fix inner animation ---
    hoverTimeline.current = gsap
      .timeline({ paused: true })
      .to(".image-wrapper", {
        filter: "blur(4px)",
        duration: 0.3,
        ease: "power2.out",
      })
      .fromTo(
        innerImage,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        "<"
      );

    // --- Scroll Animations ---
    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% 90%",
          end: "30% 10%",
          scrub: 1,
        },
      })
      .from(headingSplit.words, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(descSplit.lines, {
        opacity: 0,
        y: 30,
        rotate: 2,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
      });
  }, []);

  return (
    <section ref={containerRef} className="w-full py-20 bg-background">
      <div className="cont">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* IMAGE */}
          <div
            onMouseEnter={() => hoverTimeline.current?.play()}
            onMouseLeave={() => hoverTimeline.current?.reverse()}
            className="relative flex-1 rounded-xl overflow-hidden shadow"
          >
            {/* Inner reveal image */}
            <div className="sec-image absolute z-30 inset-0 flex items-center justify-center">
              <div className="w-3/4 h-1/2 rounded-xl overflow-hidden">
                <Image
                  src="/sec-about.jpg"
                  alt="about hover"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Base image wrapper for blur */}
            <div className="image-wrapper w-full h-full">
              <Image
                src={"/about.jpg"}
                alt="about"
                width={600}
                height={800}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="about-heading text-3xl md:text-5xl font-bold tracking-tight font-mono">
              About Us
            </h2>
            <p className="desc mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
              BNS Pharmaceuticals is committed to providing affordable,
              high-quality medicines with trust and innovation. <br />
              Our mission is to ensure better healthcare access by combining
              scientific excellence with ethical business practices. <br />
              We work closely with healthcare professionals and communities to
              improve patient outcomes. <br />
              By focusing on research, technology, and sustainability, we aim to
              create long-term value for both patients and society. <br />
              Together, we are shaping the future of global healthcare with care
              and responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
