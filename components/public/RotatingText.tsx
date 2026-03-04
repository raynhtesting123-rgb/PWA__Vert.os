'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const phrases = [
  "that cut operational overhead by 40%",
  "that eliminate monthly platform fees",
  "that automate manual workflows",
  "that scale without breaking"
];

export function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative w-full sm:w-auto sm:min-w-[300px] h-[3em] sm:h-[1.5em] align-top">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-0 top-0 text-cyan-400 whitespace-normal sm:whitespace-nowrap"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
