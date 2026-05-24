'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingRose } from '@/components/FloatingRose';
import { ParticleSystem } from '@/components/ParticleSystem';
import { Typewriter } from '@/components/Typewriter';
import { GradientButton } from '@/components/GradientButton';
import { useSmoothScroll } from '@/lib/smooth-scroll';

/**
 * Landing Page - The magical entry point
 * Features cinematic intro animation and name reveal
 */
const LandingPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-dark-bg via-royal-blue to-maroon overflow-hidden">
      {/* Particle System */}
      <ParticleSystem count={100} color="#d4a574" />

      {/* Floating Roses */}
      <FloatingRose delay={0} duration={8} x={10} y={20} />
      <FloatingRose delay={1} duration={10} x={85} y={30} />
      <FloatingRose delay={0.5} duration={9} x={50} y={60} />

      {/* Main Content */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background Lantern */}
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-rose-gold/20 to-soft-gold/10 blur-3xl" />
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 text-center space-y-8 max-w-4xl"
        >
          {/* Decorative Top Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 mx-auto rounded-full border-2 border-rose-gold/30 flex items-center justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full border border-rose-gold/50" />
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={showContent ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="space-y-4"
          >
            <h1 className="font-elegant text-6xl md:text-7xl lg:text-8xl text-transparent bg-gradient-to-r from-rose-gold via-soft-gold to-rose-gold bg-clip-text pb-4">
              ZAHRA FATIMA
            </h1>
            <p className="text-soft-gold/80 text-xl md:text-2xl font-light tracking-wider">
              31st May — A Day That Brought Warmth Into Many Hearts
            </p>
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 3 }}
            className="text-lg text-rose-gold/70 font-elegant"
          >
            <Typewriter
              text="A Cinematic Digital Sanctuary Built With Respect, Warmth, Elegance, and Heartfelt Care"
              speed={30}
              delay={2500}
            />
          </motion.div>

          {/* Floating Dua Quotes */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="mt-12 space-y-2"
          >
            <p className="text-sm text-soft-gold/60 italic">
              \"May Allah bless your journey with peace, purpose, and endless compassion\"
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
              className="absolute w-1 h-1 bg-soft-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 4 }}
          className="absolute bottom-12 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GradientButton size="lg">
              Explore the Experience ↓
            </GradientButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={showContent ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 3 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent"
      />
    </div>
  );
};

export default LandingPage;
