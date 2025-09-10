"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="cont text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Improving Lives Through Healthcare Innovation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-gray-600"
          >
            At BNS Pharmaceuticals, we are committed to advancing healthcare
            through science, innovation, and unwavering dedication to quality.
          </motion.p>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{val.title}</h3>
                <p className="text-gray-600">{val.desc}</p>
              </motion.div>
            ))}
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
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-4"
            >
              <span className="text-xl font-bold text-primary">
                {item.year}
              </span>
              <p className="text-gray-600">{item.event}</p>
            </motion.div>
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
    </main>
  );
}
