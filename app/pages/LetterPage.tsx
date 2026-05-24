'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { Typewriter } from '@/components/Typewriter';
import { ParticleSystem } from '@/components/ParticleSystem';

/**
 * Elegant Letter Page
 * A handwritten-style emotional letter
 */
const LetterPage: React.FC = () => {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLetter(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const letterContent = `
Dear Zahra Fatima,

On this day that brought warmth into many hearts, I wanted to take a moment to express something that words can barely capture—the deep appreciation and respect I hold for who you are.

You are the kind of person who makes existence feel lighter. Not through grand gestures, but through the quiet way you show up for others. Your kindness isn't performative; it flows naturally from a heart that genuinely cares.

What moves me most is your loyalty. In a world where people easily shift and change, you remain constant. You're someone I can trust with my thoughts, my struggles, my dreams. That kind of friendship is rare and sacred.

Your patience in the face of life's challenges inspires me. You carry your own weight with grace while helping others carry theirs. Your strength isn't loud—it's the kind that speaks through your presence, through your consistency, through your refusal to give up on those you love.

And your warmth... it's like a light in darkness. Not the harsh kind, but the gentle, healing kind. The kind that makes people want to be better, do better, love better.

So on your birthday, I make this dua for you:

Allahumma aslih laha dunya wa akhiraha
Allahumma ihfazha min kulli saw'
Allahumma ansurha ala nafsaha wa alhimha rushdhaha
Allahumma ij'alha min al-muqsitîn wa ahl al-jannah

May Allah continue to bless your journey with peace, purpose, and endless compassion. May you always know your worth. May your goodness return to you multiplied. May your heart remain as pure and warm as it is today.

Some souls leave softness wherever they go.
That soul, my dear friend, is you.

With deep respect and heartfelt care,
Someone who truly values you.

—31st May, 2024
  `;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-maroon/20 via-dark-bg to-dark-bg py-24 px-4">
      <ParticleSystem count={30} color="#d4a574" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader
          title="A Letter from the Heart"
          subtitle="Words of appreciation, respect, and genuine care"
        />

        {/* Letter Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
          animate={showLetter ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12"
          style={{ perspective: '1000px' }}
        >
          {/* Paper Effect */}
          <div className="relative bg-gradient-to-br from-soft-gold/10 via-soft-gold/5 to-rose-gold/10 border-2 border-rose-gold/30 rounded-lg p-12 md:p-16 shadow-2xl backdrop-blur-sm overflow-hidden">
            {/* Decorative top border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={showLetter ? { scaleX: 1 } : {}}
              transition={{ delay: 1 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent"
            />

            {/* Letter Content */}
            <div className="space-y-6 text-lg leading-relaxed font-light">
              {letterContent.split('\n\n').map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={showLetter ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="text-soft-gold/80"
                >
                  {paragraph.includes('Allahumma') ? (
                    <div className="space-y-2 text-center italic my-8 p-6 bg-royal-blue/20 rounded-lg border-l-4 border-rose-gold">
                      {paragraph.split('\n').map((line, i) => (
                        <p key={i} className="text-rose-gold">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{paragraph}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Decorative bottom border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={showLetter ? { scaleX: 1 } : {}}
              transition={{ delay: 1.5 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent"
            />

            {/* Floating rose petals */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={showLetter ? { opacity: [0, 0.6, 0] } : {}}
                transition={{
                  delay: 1 + i * 0.2,
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute text-2xl"
                style={{
                  left: `${10 + i * 18}%`,
                  top: `${20 + i * 15}%`,
                }}
              >
                🌹
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LetterPage;
