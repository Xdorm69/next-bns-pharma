"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
