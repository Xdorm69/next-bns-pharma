import type { Metadata } from "next";
import AnimatedCard from "./_components/AnimatedCard";
import AnimatedTimelineItem from "./_components/AnimatedTimeline";
import Image from "next/image";
import Link from "next/link";
import { about } from "@/lib/constants/about";

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

const getFactoryImage = (id: number) => {
  return id === 8 ? `/factory/9.jpg` : `/factory/${id + 1}.webp`;
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-20 relative">
        <Image
          src={about.image}
          alt="bg"
          width={800}
          height={600}
          priority
          className="w-full h-full object-cover absolute left-0 top-0 z-0"
        />
        <div className="container text-center z-10 relative">
          <h2 className="heading-1 text-background">{about.title} </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300">
            {about.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container py-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">{about.mission}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">{about.vision}</p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-100 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {about.values.map((val, i) => (
              <AnimatedCard key={i} title={val.title} desc={val.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* FACTORY */}
      <section className="container py-16">
        <div>
          <h1 className="text-3xl font-bold mb-12">Our Factory</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-min">
            {Array.from({ length: 9 }).map((_, id) => {
              return (
                <div key={id} className="rounded shadow overflow-hidden">
                  <Image
                    key={id}
                    src={getFactoryImage(id)}
                    alt={`Factory ${id + 1}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8">
          {about.journey.map((item, i) => (
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
        <h2 className="heading-1 mb-4">
          Partner with <br /> BNS Pharmaceuticals
        </h2>
        <p className="mb-8 text-md text-muted/60">
          Join us in shaping the future of healthcare with innovation and trust.
        </p>
        <Link href="/contact" className="btn btn-secondary">
          Contact Us
        </Link>
      </section>
    </div>
  );
}
