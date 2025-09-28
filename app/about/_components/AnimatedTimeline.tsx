"use client";

import { motion } from "framer-motion";

export default function AnimatedTimelineItem({
  year,
  event,
  index,
}: {
  year: string;
  event: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-start gap-4"
    >
      <span className="text-xl font-bold text-primary">{year}</span>
      <p className="text-gray-600">{event}</p>
    </motion.div>
  );
}
