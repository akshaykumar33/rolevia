"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../../ui/motion";

// Re-mounts on every dashboard route, giving each page a short entrance.
export default function AppTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
