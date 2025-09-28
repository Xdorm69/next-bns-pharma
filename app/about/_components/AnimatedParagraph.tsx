"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedParagraph({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
