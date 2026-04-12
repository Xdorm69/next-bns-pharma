"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const data = [
  {
    id: 1,
    author: "Dr. Elena",
    dignitary: "Professor of Pharmacology",
    review:
      "BNS Pharma's commitment to research and development has significantly advanced our understanding of drug delivery systems.",
  },
  {
    id:2,
    author: "Dr. Maria",
    dignitary: "Associate Professor",
    review:
      "BNS Pharma's state-of-the-art manufacturing facilities and rigorous quality control processes have consistently delivered high-quality products.",
  },
  {
    id: 3,
    author: "Dr. Elena2",
    dignitary: "Professor of Pharmacology",
    review:
      "BNS Pharma's commitment to research and development has significantly advanced our understanding of drug delivery systems.",
  },
  {
    id: 4,
    author: "Dr. Maria2",
    dignitary: "Associate Professor",
    review:
      "BNS Pharma's state-of-the-art manufacturing facilities and rigorous quality control processes have consistently delivered high-quality products.",
  },
];

const ITEMS_PER_SLIDE = 2;

const Trust = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const totalSlides = Math.ceil(data.length / ITEMS_PER_SLIDE);

  // 👉 GSAP animation on slide change
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
    );
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT INTRO */}
          <div className="max-w-sm">
            <h2 className="heading-2">Institutional Trust</h2>
            <p className="mt-4 text-sm">
              Our partnerships with leading academic institutions and research
              organizations demonstrate our commitment to scientific excellence
              and innovation.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={prevSlide}
                className="px-4 py-2 border rounded hover:bg-muted transition"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="px-4 py-2 border rounded hover:bg-muted transition"
              >
                →
              </button>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 gap-4 flex-1">
            {data
              .slice(
                currentSlide * ITEMS_PER_SLIDE,
                currentSlide * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE,
              )
              .map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="bg-muted-foreground/8 px-8 py-6 relative rounded-xl flex flex-col justify-between"
                >
                  <p className="italic">"{item.review}"</p>

                  {/* QUOTE MARK */}
                  <div className="absolute top-4 right-4 text-8xl text-muted-foreground/20">
                    "
                  </div>

                  {/* AUTHOR */}
                  <div className="flex gap-2 items-center mt-4">
                    <div className="size-10 flex items-center justify-center font-bold rounded-md shadow bg-muted-foreground/20">
                      {item.author.split(" ")[1]?.charAt(0).toUpperCase() ||
                        "D"}
                    </div>
                    <div>
                      <h3 className="font-primary font-semibold">
                        {item.author}
                      </h3>
                      <p className="text-muted-foreground text-xs -mt-1">
                        {item.dignitary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
