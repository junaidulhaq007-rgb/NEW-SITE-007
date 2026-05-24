'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from '@/components/GradientButton';
import { Typewriter } from '@/components/Typewriter';
import { ParticleSystem } from '@/components/ParticleSystem';
import { FloatingRose } from '@/components/FloatingRose';

/**
 * Ending/Closing Page
 * Final message of appreciation and lasting wishes
 */
const EndingPage: React.FC = () => {
  const [showContent, setShowContent] = React.useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-dark-bg via-maroon/30 to-dark-bg overflow-hidden">
      {/* Particle System */}
      <ParticleSystem count={80} color="#d4a574" />

      {/* Floating Roses */}
      <FloatingRose delay={0} duration={8} x={15} y={25} />
      <FloatingRose delay={1.5} duration={10} x={80} y={40} />
      <FloatingRose delay={0.7} duration={9} x={50} y={70} />
      <FloatingRose delay={2} duration={11} x={25} y={80} />

      {/* Main Content */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background Aura */}
        <motion.div
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-gold/30 to-soft-gold/10 blur-3xl" />
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 text-center space-y-8 max-w-4xl"
        >
          {/* Top Decorative Element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto rounded-full border-2 border-rose-gold/30 flex items-center justify-center mb-4"
          >
            <span className="text-4xl">🌹</span>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="space-y-6"
          >
            <h1 className="font-elegant text-5xl md:text-6xl text-transparent bg-gradient-to-r from-rose-gold via-soft-gold to-rose-gold bg-clip-text">
              What We Wish for You
            </h1>

            <div className="space-y-4 text-lg text-soft-gold/80 leading-relaxed max-w-2xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
              >
                May you always carry the knowledge that you are valued, appreciated, and deeply respected.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ delay: 2.5 }}
              >
                Your kindness, loyalty, warmth, patience, caring nature, and strength don't go unnoticed. They ripple outward, touching lives in ways you may never fully realize.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ delay: 3 }}
              >
                As you continue your journey, remember: You are enough. You are worthy. You are loved.
              </motion.p>
            </div>
          </motion.div>

          {/* Final Duas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 3.5 }}
            className="space-y-4 bg-gradient-to-br from-royal-blue/20 to-maroon/20 border border-rose-gold/30 rounded-lg p-8 backdrop-blur-sm"
          >
            <p className="font-elegant text-2xl text-rose-gold italic">Final Duas for Your Journey</p>
            <div className="space-y-3 text-sm text-soft-gold/80">
              <div>
                <p className="text-rose-gold font-arabic mb-1">الله أسعدها وأسعد من حولها</p>
                <p className="text-soft-gold/70 italic">May Allah make her happy and make happy those around her</p>
              </div>
              <div>
                <p className="text-rose-gold font-arabic mb-1">الله احفظها من كل سوء وبارك لها في حياتها</p>
                <p className="text-soft-gold/70 italic">May Allah protect her from all evil and bless her life</p>
              </div>
              <div>
                <p className="text-rose-gold font-arabic mb-1">الله اجعلها من المقسطين وأهل الجنة</p>
                <p className="text-soft-gold/70 italic">May Allah make her among the just and the people of Paradise</p>
              </div>
            </div>
          </motion.div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 4.5 }}
            className="space-y-4"
          >
            <p className="font-elegant text-xl text-rose-gold italic">
              \"Some souls leave softness wherever they go.\"
            </p>
            <p className="text-soft-gold/70">
              That soul is you, and we celebrate you today and always.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <GradientButton size="lg">Share Your Wishes</GradientButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-lg font-elegant text-rose-gold border-2 border-rose-gold hover:bg-rose-gold/10 transition-colors text-lg"
            >
              Return to Top
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={showContent ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 5.5 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent"
        />

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 6 }}
          className="absolute bottom-6 text-center text-soft-gold/50 text-xs"
        >
          <p>Created with respect, warmth, elegance, and heartfelt care</p>
          <p>31st May, 2024</p>
        </motion.div>
      </div>
    </div>
  );
};

export default EndingPage;
