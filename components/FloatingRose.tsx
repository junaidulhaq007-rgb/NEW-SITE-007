'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingRoseProps {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

/**
 * Animated floating rose element
 */
export const FloatingRose: React.FC<FloatingRoseProps> = ({
  delay = 0,
  duration = 8,
  x = 0,
  y = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="fixed pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        animate={{
          y: [0, -100, -200],
          opacity: [1, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration,
          ease: 'easeOut',
          repeat: Infinity,
        }}
        className="text-4xl"
      >
        🌹
      </motion.div>
    </motion.div>
  );
};

export default FloatingRose;
