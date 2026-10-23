import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.65,
}) => {
  const reduceMotion = useReducedMotion();

  const offsets = {
    up: { x: 0, y: 28 },
    down: { x: 0, y: -28 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
  };

  const initial = offsets[direction] || offsets.up;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
