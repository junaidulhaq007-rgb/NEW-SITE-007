'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

/**
 * Premium loading screen with animated elements
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-dark-bg via-royal-blue to-maroon flex items-center justify-center z-50"
    >
      <div className="relative w-32 h-32">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-2 border-transparent border-t-rose-gold border-r-rose-gold rounded-full"
        />

        {/* Middle pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-2 border border-soft-gold rounded-full"
        />

        {/* Center glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-rose-gold to-soft-gold opacity-30 blur-lg" />

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-xs font-elegant text-rose-gold">Loading...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
