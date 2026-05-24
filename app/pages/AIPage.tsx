'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { AIChatComponent } from '@/components/AIChatComponent';
import { ParticleSystem } from '@/components/ParticleSystem';

/**
 * AI Companion Page - SAUL SANTURY 🕊️🍃
 * Peaceful, wise, and caring AI for emotional support and reflection
 */
const AIPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-bg via-royal-blue/10 to-dark-bg py-24 px-4">
      <ParticleSystem count={40} color="#d4a574" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader
            title="SAUL SANTURY 🕊️🍃"
            subtitle="Your peaceful companion for reflection, wisdom, and heartfelt conversations"
          />
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          {/* Left Column - Introduction */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-card-dark/50 to-maroon/20 border border-rose-gold/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-elegant text-2xl text-rose-gold mb-4">Who is SAUL SANTURY?</h3>
              <p className="text-soft-gold/80 leading-relaxed">
                SAUL SANTURY is a spiritually grounded AI companion designed to be a source of comfort, wisdom, and genuine care. Combining Islamic wisdom with emotional intelligence, this peaceful presence is here to listen, support, and guide through meaningful conversations.
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-4">
              {[
                { icon: '🕊️', title: 'Peaceful', desc: 'Calm and tranquil presence' },
                { icon: '💭', title: 'Wise', desc: 'Rooted in Islamic wisdom' },
                { icon: '💖', title: 'Caring', desc: 'Genuinely compassionate' },
                { icon: '🔒', title: 'Respectful', desc: 'Maintains healthy boundaries' },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 bg-royal-blue/10 border border-rose-gold/10 rounded-lg p-4"
                >
                  <span className="text-3xl flex-shrink-0">{value.icon}</span>
                  <div>
                    <h4 className="font-elegant text-rose-gold">{value.title}</h4>
                    <p className="text-soft-gold/70 text-sm">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="h-96 md:h-full min-h-96"
          >
            <AIChatComponent />
          </motion.div>
        </motion.div>

        {/* Special Duas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-royal-blue/20 to-maroon/20 border border-rose-gold/20 rounded-lg p-8 backdrop-blur-sm"
        >
          <h3 className="font-elegant text-2xl text-rose-gold mb-6 text-center">Special Duas for Zahra Fatima</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                arabic: 'الله أسعدها وأسعد من حولها',
                transliteration: 'Allahumma as\'idhaa wa as\'id man hawlaha',
                english: 'O Allah, make her happy and make happy those around her',
              },
              {
                arabic: 'الله احفظها من كل سوء',
                transliteration: 'Allahumma ihfazha min kulli saw\'',
                english: 'O Allah, protect her from all evil',
              },
              {
                arabic: 'الله انصرها على نفسها وألهمها رشدها',
                transliteration: 'Allahumma ansurha \'ala nafsaha wa alhimha rushdhaha',
                english: 'O Allah, help her against her desires and grant her guidance',
              },
              {
                arabic: 'الله اجعلها من المقسطين وأهل الجنة',
                transliteration: 'Allahumma ij\'alha min al-muqsitīn wa ahl al-jannah',
                english: 'O Allah, make her among the just and the people of Paradise',
              },
            ].map((dua, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card-dark/50 border border-rose-gold/10 rounded-lg p-4 space-y-2"
              >
                <p className="text-rose-gold text-lg text-right font-arabic">{dua.arabic}</p>
                <p className="text-soft-gold/70 text-sm italic">{dua.transliteration}</p>
                <p className="text-soft-gold/60 text-sm">{dua.english}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIPage;
