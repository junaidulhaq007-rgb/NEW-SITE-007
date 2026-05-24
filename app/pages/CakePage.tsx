'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { CakeScene } from '@/components/3D/CakeScene';
import { GradientButton } from '@/components/GradientButton';
import { soundManager } from '@/lib/sound-manager';

/**
 * Interactive 3D Birthday Cake Page
 * Features: Realistic cake, flame physics, confetti
 */
const CakePage: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCandleBlown = () => {
    setCandlesBlown(true);
    soundManager.playChime();
    setShowMessage(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-dark-bg to-maroon overflow-hidden">
      {/* 3D Cake Scene */}
      <div className="absolute inset-0 z-0">
        <CakeScene onCandleBlown={handleCandleBlown} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-between py-20 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <SectionHeader
            title="Make A Wish"
            subtitle="A moment of celebration and heartfelt blessings"
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-4"
        >
          <p className="text-soft-gold/80 text-lg max-w-xl">
            Click on the candles to blow them out and make a wish for her continued happiness and success.
          </p>
        </motion.div>

        {/* Message After Candles Blown */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-2xl"
          >
            <motion.div
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎂✨
            </motion.div>
            <p className="text-2xl font-elegant text-rose-gold italic">
              May all your wishes come true with blessings from above.
            </p>
            <p className="text-soft-gold/70 text-lg">
              Allahumma aslih laha duniya wa akhiraha
            </p>
            <p className="text-sm text-soft-gold/60">
              (O Allah, rectify her worldly and afterlife affairs)
            </p>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <GradientButton size="lg">Continue Your Journey →</GradientButton>
        </motion.div>
      </div>
    </div>
  );
};

export default CakePage;
