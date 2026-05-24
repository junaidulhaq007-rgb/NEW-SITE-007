'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { Card3D } from '@/components/Card3D';
import { ConstellationScene } from '@/components/3D/ConstellationScene';
import { ParticleSystem } from '@/components/ParticleSystem';

interface Memory {
  id: string;
  quality: string;
  emoji: string;
  memories: string[];
}

const memories: Memory[] = [
  {
    id: '1',
    quality: 'Kindness',
    emoji: '💕',
    memories: [
      'Always remembers to ask how you are',
      'Offers help without being asked',
      'Makes people feel valued and seen',
      'Her smile is healing',
    ],
  },
  {
    id: '2',
    quality: 'Loyalty',
    emoji: '🕊️',
    memories: [
      'Shows up when it matters most',
      'Never abandons her friends',
      'Stands firm in her principles',
      'Trustworthy with secrets and vulnerabilities',
    ],
  },
  {
    id: '3',
    quality: 'Warmth',
    emoji: '☀️',
    memories: [
      'Makes you feel comfortable being yourself',
      'Her presence is like sunshine',
      'Creates safe spaces for honest conversations',
      'Embraces others with genuine affection',
    ],
  },
  {
    id: '4',
    quality: 'Patience',
    emoji: '🌿',
    memories: [
      'Listens without judgment',
      'Gives people time to grow',
      'Doesn\'t rush to conclusions',
      'Teaches through example, not pressure',
    ],
  },
  {
    id: '5',
    quality: 'Caring',
    emoji: '💖',
    memories: [
      'Remembers details about your life',
      'Celebrates your wins as her own',
      'Holds your hand through difficulties',
      'Her concern is genuine, not performative',
    ],
  },
  {
    id: '6',
    quality: 'Strength',
    emoji: '💪',
    memories: [
      'Faces challenges with grace',
      'Inspires others to be brave',
      'Never gives up on herself or others',
      'Her resilience is quietly powerful',
    ],
  },
];

/**
 * Memories & Qualities Page
 * Interactive constellation of personal qualities and memories
 */
const MemoriesPage: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="relative min-h-screen bg-dark-bg overflow-hidden">
      {/* Background Constellation Scene */}
      <div className="absolute inset-0 z-0 h-full">
        <ConstellationScene onStarClick={(quality) => {
          const memory = memories.find(
            (m) => m.quality.toLowerCase() === quality.toLowerCase()
          );
          if (memory) setSelectedMemory(memory);
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <SectionHeader
              title="Constellations of Qualities"
              subtitle="A map of your beautiful soul written in the stars"
            />
          </motion.div>

          {/* Memory Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory, idx) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedMemory(memory)}
              >
                <Card3D className="cursor-pointer h-full hover:border-rose-gold/50 transition-colors">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">{memory.emoji}</div>
                    <h3 className="font-elegant text-2xl text-rose-gold">
                      {memory.quality}
                    </h3>
                    <p className="text-soft-gold/70 text-sm">
                      Click to explore cherished memories
                    </p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-card-dark to-maroon/30 border border-rose-gold/50 rounded-lg p-8 max-w-2xl w-full backdrop-blur-lg"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedMemory.emoji}</span>
                    <h2 className="font-elegant text-3xl text-rose-gold">
                      {selectedMemory.quality}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="text-soft-gold/50 hover:text-soft-gold transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Memories List */}
                <div className="space-y-3">
                  {selectedMemory.memories.map((memory, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 bg-royal-blue/10 border border-rose-gold/20 rounded-lg p-4"
                    >
                      <span className="text-rose-gold mt-1">✨</span>
                      <p className="text-soft-gold/80">{memory}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Closing */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-soft-gold/70 italic text-sm pt-4 border-t border-rose-gold/10"
                >
                  This quality shines through in everything you do.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoriesPage;
