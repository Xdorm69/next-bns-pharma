import type { Metadata } from "next";
import AnimatedHeading from "./_components/AnimatedHeading";
import AnimatedParagraph from "./_components/AnimatedParagraph";
import AnimatedCard from "./_components/AnimatedCard";
import AnimatedTimelineItem from "./_components/AnimatedTimeline";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Bns Pharma",
  description:
    "Learn about Bns Pharma's mission, vision, and journey in delivering innovative, safe, and high-quality pharmaceutical products.",
  keywords: [
    "About Bns Pharma",
    "pharmaceutical company mission",
    "healthcare innovation",
    "trusted pharma",
  ],
  openGraph: {
    title: "About Us | Bns Pharma",
    description:
      "Discover Bns Pharma's vision, mission, and journey in advancing healthcare worldwide.",
    url: "https://bnspharmaceuticals.com/about",
    siteName: "Bns Pharma",
    type: "website",
  },
  alternates: {
    canonical: "https://bnspharmaceuticals.com/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="cont text-center">
          <AnimatedHeading className="text-4xl md:text-6xl font-bold">
            Improving Lives Through Healthcare Innovation
          </AnimatedHeading>
          <AnimatedParagraph
            className="mt-6 text-lg md:text-xl text-gray-600"
            delay={0.2}
          >
            At BNS Pharmaceuticals, we are committed to advancing healthcare
            through science, innovation, and unwavering dedication to quality.
          </AnimatedParagraph>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To provide safe, effective, and affordable medicines that improve
            patient outcomes and enhance quality of life worldwide.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become a trusted global leader in pharmaceuticals by consistently
            innovating and embracing cutting-edge technologies in healthcare
            delivery.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                desc: "We embrace research and technology to deliver breakthrough healthcare solutions.",
              },
              {
                title: "Quality",
                desc: "Every product is developed with precision, adhering to global safety standards.",
              },
              {
                title: "Trust",
                desc: "We build lasting relationships with patients, partners, and healthcare providers.",
              },
            ].map((val, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.2}
                title={val.title}
                desc={val.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FACTORY */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div>
          <h1 className="text-3xl font-bold mb-12">Our Factory</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-min">
            {Array.from({ length: 9 }).map((_, id) => {
              return (
                <div key={id} className="rounded shadow overflow-hidden">
                  <Image
                    key={id}
                    src={
                      id === 8 ? `/factory/9.jpg` : `/factory/${id + 1}.webp`
                    }
                    alt={`Factory ${id + 1}`}
                    width={500}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    height={500}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8">
          {[
            {
              year: "2015",
              event: "Founded with a vision to make healthcare accessible.",
            },
            {
              year: "2018",
              event: "Expanded product line with advanced generics.",
            },
            {
              year: "2022",
              event: "Launched research collaborations with global partners.",
            },
            {
              year: "2025",
              event: "Innovating with biotech-driven healthcare solutions.",
            },
          ].map((item, i) => (
            <AnimatedTimelineItem
              key={i}
              year={item.year}
              event={item.event}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Partner with BNS Pharmaceuticals
        </h2>
        <p className="mb-8 text-lg">
          Join us in shaping the future of healthcare with innovation and trust.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
