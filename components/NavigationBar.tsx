'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Navigation bar with controls
 */
export const NavigationBar: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'Story', href: '/#story', id: 'story' },
    { label: 'Garden', href: '/#garden', id: 'garden' },
    { label: 'Cake', href: '/#cake', id: 'cake' },
    { label: 'Letter', href: '/#letter', id: 'letter' },
    { label: 'AI', href: '/#ai', id: 'ai' },
    { label: 'Memories', href: '/#memories', id: 'memories' },
    { label: 'Games', href: '/#games', id: 'games' },
    { label: 'Wishes', href: '/#wishes', id: 'wishes' },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 glass-effect backdrop-blur-xl border-b border-rose-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-soft-gold flex items-center justify-center">
              <span className="text-dark-bg font-elegant font-bold">Z</span>
            </div>
            <span className="hidden sm:inline font-elegant text-rose-gold text-lg">ZAHRA FATIMA</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ color: '#f4d4a8' }}
                className="text-sm font-modern text-soft-gold hover:text-soft-gold transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 hover:bg-rose-gold/10 rounded-lg transition-colors"
              aria-label="Toggle sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-rose-gold" />
              ) : (
                <VolumeX className="w-5 h-5 text-rose-gold/50" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-rose-gold/10 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-rose-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-rose-gold/10 py-4"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-soft-gold hover:bg-rose-gold/10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavigationBar;
