'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { GradientButton } from '@/components/GradientButton';
import { RoseGardenScene } from '@/components/3D/RoseGardenScene';

interface AppreciationMessage {
  message: string;
  emoji: string;
}

const appreciationMessages: AppreciationMessage[] = [
  {
    message: 'Some people make the world softer simply by existing.',
    emoji: '🌸',
  },
  {
    message: 'Your kindness is not a weakness—it\'s a superpower.',
    emoji: '✨',
  },
  {
    message: 'In your loyalty, we find true friendship.',
    emoji: '🕊️',
  },
  {
    message: 'Your strength in patience inspires those around you.',
    emoji: '💪',
  },
  {
    message: 'Warmth radiates from your presence.',
    emoji: '☀️',
  },
  {
    message: 'You are the kind of friend every heart needs.',
    emoji: '💛',
  },
];

/**
 * 3D Rose Garden Page
 * Interactive garden with floating petals and appreciation messages
 */
const RoseGardenPage: React.FC = () => {
  const [activeMessage, setActiveMessage] = useState<AppreciationMessage | null>(null);

  const handleFlowerClick = () => {
    const randomMessage =
      appreciationMessages[Math.floor(Math.random() * appreciationMessages.length)];
    setActiveMessage(randomMessage);
    setTimeout(() => setActiveMessage(null), 3000);
  };

  return (
    <div className="relative w-full min-h-screen bg-dark-bg overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <RoseGardenScene />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4">
        <SectionHeader
          title="The Rose Garden"
          subtitle="A space of peace, beauty, and heartfelt appreciation"
        />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center space-y-4 max-w-2xl"
        >
          <p className="text-soft-gold/70 text-lg">
            Click the flowers to reveal messages of appreciation and respect.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFlowerClick}
            className="mx-auto block"
          >
            <GradientButton size="lg">Explore the Garden</GradientButton>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Messages */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              className="bg-gradient-to-br from-card-dark to-maroon/30 border border-rose-gold/50 rounded-lg p-8 max-w-md text-center backdrop-blur-lg"
            >
              <p className="text-4xl mb-4">{activeMessage.emoji}</p>
              <p className="text-rose-gold text-xl font-elegant italic">
                {activeMessage.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoseGardenPage;
