'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { GradientButton } from '@/components/GradientButton';
import { ParticleSystem } from '@/components/ParticleSystem';
import { Heart } from 'lucide-react';

interface Wish {
  id: string;
  text: string;
  dua: string;
  category: 'health' | 'happiness' | 'success' | 'peace' | 'barakah';
  emoji: string;
}

const suggestedWishes: Wish[] = [
  {
    id: '1',
    text: 'Good health and strength for many years to come',
    dua: 'Allahumma aafina wa aafi azziz jameeah',
    category: 'health',
    emoji: '💚',
  },
  {
    id: '2',
    text: 'Endless happiness in every chapter of your life',
    dua: 'Allahumma idkhilha wa ahluha wal imamuha wal imamuha wa ahlaha al-jannah',
    category: 'happiness',
    emoji: '😊',
  },
  {
    id: '3',
    text: 'Success in all your endeavors and goals',
    dua: 'Allahumma adkhilha jannataka barahmtaka ya arhamar rahimeen',
    category: 'success',
    emoji: '⭐',
  },
  {
    id: '4',
    text: 'Inner peace that never wavers',
    dua: 'Allahumma hadina wa aslihi balana',
    category: 'peace',
    emoji: '🕊️',
  },
  {
    id: '5',
    text: 'Barakah in your time, wealth, and relationships',
    dua: 'Allahumma barik laha fee kuli shay',
    category: 'barakah',
    emoji: '✨',
  },
];

const categoryEmojis: Record<string, string> = {
  health: '💚',
  happiness: '😊',
  success: '⭐',
  peace: '🕊️',
  barakah: '✨',
};

/**
 * Wishes & Duas Page
 * A sacred space to make wishes and send blessings
 */
const WishesPage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [customWish, setCustomWish] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Wish['category']>('peace');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAddWish = () => {
    if (!customWish.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      text: customWish,
      dua: 'Allahumma aqbil minna wa taqqabal minna wa ihdinaa sirat al-mustaqeem',
      category: selectedCategory,
      emoji: categoryEmojis[selectedCategory],
    };

    setWishes([newWish, ...wishes]);
    setCustomWish('');
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const handleAddSuggestedWish = (wish: Wish) => {
    if (!wishes.find((w) => w.id === wish.id)) {
      setWishes([wish, ...wishes]);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-bg via-maroon/10 to-dark-bg py-24 px-4">
      <ParticleSystem count={40} color="#d4a574" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader
            title="Garden of Wishes"
            subtitle="Plant seeds of blessings and watch them bloom"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {/* Left Column - Wish Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Create Custom Wish */}
            <div className="bg-gradient-to-br from-card-dark/50 to-royal-blue/20 border border-rose-gold/20 rounded-lg p-6 backdrop-blur-sm space-y-4">
              <h3 className="font-elegant text-xl text-rose-gold">Make a Wish</h3>

              {/* Wish Text Input */}
              <div className="space-y-2">
                <label className="text-sm text-soft-gold/70">Your Wish</label>
                <textarea
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  placeholder="Write a heartfelt wish for Zahra Fatima..."
                  className="w-full bg-card-dark border border-rose-gold/20 rounded-lg px-4 py-3 text-soft-gold placeholder-soft-gold/40 focus:outline-none focus:border-rose-gold/50 resize-none h-24 transition-colors"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-sm text-soft-gold/70">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['health', 'happiness', 'success', 'peace', 'barakah'] as Wish['category'][]).map(
                    (cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-2 rounded-lg text-sm font-elegant capitalize transition-all ${
                          selectedCategory === cat
                            ? 'bg-rose-gold text-dark-bg'
                            : 'bg-card-dark border border-rose-gold/20 text-soft-gold/70 hover:border-rose-gold/50'
                        }`}
                      >
                        {categoryEmojis[cat]} {cat}
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddWish}
                disabled={!customWish.trim()}
                className="w-full px-6 py-3 rounded-lg font-elegant bg-gradient-to-r from-rose-gold to-soft-gold text-dark-bg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="inline-block mr-2 w-5 h-5" />
                Plant This Wish
              </motion.button>
            </div>

            {/* Wish Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-royal-blue/20 border border-rose-gold/20 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-elegant text-rose-gold">{wishes.length}</p>
              <p className="text-sm text-soft-gold/70">Wishes Planted</p>
            </motion.div>
          </motion.div>

          {/* Middle & Right Columns - Wishes Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Suggested Wishes */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="font-elegant text-xl text-rose-gold">Suggested Wishes</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {suggestedWishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-card-dark/30 to-maroon/10 border border-rose-gold/20 rounded-lg p-4 hover:border-rose-gold/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <p className="text-soft-gold/80 text-sm">{wish.text}</p>
                        <p className="text-xs text-soft-gold/50 italic">{wish.dua}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddSuggestedWish(wish)}
                        className="text-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ➕
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Your Wishes */}
            {wishes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="font-elegant text-xl text-rose-gold">Your Wishes</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  <AnimatePresence>
                    {wishes.map((wish, idx) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-gradient-to-br from-rose-gold/20 to-soft-gold/10 border border-rose-gold/50 rounded-lg p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">{wish.emoji}</span>
                          <div className="flex-1">
                            <p className="text-soft-gold/80 text-sm">{wish.text}</p>
                            <p className="text-xs text-soft-gold/50 italic mt-2 font-arabic">
                              {wish.dua}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Wish Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                y: [-50, -500],
                opacity: [1, 0],
              }}
              transition={{ duration: 2 }}
              className="text-6xl"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishesPage;
