'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { Card3D } from '@/components/Card3D';
import { Typewriter } from '@/components/Typewriter';
import { ParticleSystem } from '@/components/ParticleSystem';

/**
 * Story Experience Page
 * Tells the emotional story of friendship and appreciation
 */
const StoryPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const storySegments = [
    {
      title: 'The Beginning',
      content:
        'Some people enter our lives and instantly make everything feel lighter. Zahra Fatima is one of those rare souls—someone whose presence transforms ordinary moments into cherished memories.',
      emoji: '✨',
    },
    {
      title: 'A Heart of Gold',
      content:
        'What makes her special is not just her kindness, but the way it flows naturally from her. She cares deeply, listens genuinely, and uplifts everyone around her with quiet grace and warmth.',
      emoji: '💛',
    },
    {
      title: 'The Gift of Friendship',
      content:
        'True friendship is rare. It\'s found in those who remember you, celebrate with you, challenge you to be better, and stand by you when things are difficult. That\'s the kind of friend she is.',
      emoji: '👭',
    },
    {
      title: 'A Soul of Strength',
      content:
        'Behind that gentle smile is a strength that inspires. She faces challenges with patience and grace, and somehow manages to help others through their struggles while carrying her own with dignity.',
      emoji: '💪',
    },
    {
      title: 'Loyalty & Trust',
      content:
        'In a world of temporary connections, her loyalty stands out. She is someone you can trust completely—someone who values integrity and genuinely cares about the people in her life.',
      emoji: '🕊️',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-bg to-card-dark py-24 px-4">
      <ParticleSystem count={50} color="#d4a574" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader
          title="The Story"
          subtitle="A tale of warmth, respect, and deep appreciation"
        />

        {/* Timeline */}
        <div className="space-y-12 mt-16">
          {storySegments.map((segment, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card3D delay={idx * 0.1} className="backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">{segment.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-elegant text-2xl text-rose-gold mb-3">
                      {segment.title}
                    </h3>
                    <p className="text-soft-gold/80 leading-relaxed text-lg">
                      {segment.content}
                    </p>
                  </div>
                </div>
              </Card3D>

              {/* Connection line */}
              {idx < storySegments.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-rose-gold to-transparent mt-4"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center space-y-6"
        >
          <div className="inline-block max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl font-elegant text-rose-gold italic">
              \"Some people make the world softer simply by existing.\" 
            </p>
            <p className="text-soft-gold/60 mt-4">
              And that, dear Zahra Fatima, is exactly who you are.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryPage;
