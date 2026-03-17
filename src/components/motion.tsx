"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({ children, className = "" }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

