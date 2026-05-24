'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { Card3D } from '@/components/Card3D';
import { GradientButton } from '@/components/GradientButton';
import { ParticleSystem } from '@/components/ParticleSystem';

interface Game {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const games: Game[] = [
  {
    id: 'quiz',
    title: 'Qualities Quiz',
    description: 'Test how well you know the qualities that make her special',
    emoji: '🧠',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Medium',
  },
  {
    id: 'memory',
    title: 'Memory Game',
    description: 'Match pairs of cherished moments and shared experiences',
    emoji: '🎮',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Easy',
  },
  {
    id: 'dua',
    title: 'Dua Challenge',
    description: 'Learn and match Islamic duas for guidance and blessings',
    emoji: '📿',
    color: 'from-amber-500 to-rose-500',
    difficulty: 'Medium',
  },
  {
    id: 'story',
    title: 'Story Puzzle',
    description: 'Arrange the chapters of her beautiful journey in order',
    emoji: '📖',
    color: 'from-emerald-500 to-teal-500',
    difficulty: 'Hard',
  },
  {
    id: 'wishes',
    title: 'Wishes Garden',
    description: 'Plant seeds of wishes and watch them bloom into blessings',
    emoji: '🌱',
    color: 'from-green-500 to-lime-500',
    difficulty: 'Easy',
  },
  {
    id: 'constellation',
    title: 'Constellation Builder',
    description: 'Connect dots to reveal the constellation of her qualities',
    emoji: '⭐',
    color: 'from-indigo-500 to-violet-500',
    difficulty: 'Medium',
  },
];

const difficultyColors: Record<string, string> = {
  Easy: 'text-green-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
};

/**
 * Interactive Games Page
 * Engaging games that celebrate her qualities
 */
const GamesPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [completedGames, setCompletedGames] = useState<string[]>([]);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCompleteGame = (gameId: string) => {
    if (!completedGames.includes(gameId)) {
      setCompletedGames([...completedGames, gameId]);
    }
    setTimeout(() => setSelectedGame(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-bg via-royal-blue/10 to-dark-bg py-24 px-4">
      <ParticleSystem count={50} color="#d4a574" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader
            title="Celebration Games"
            subtitle="Engaging activities to honor her and create joyful moments"
          />
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-soft-gold/70 text-sm">Your Progress</span>
            <span className="text-rose-gold font-elegant">
              {completedGames.length} / {games.length}
            </span>
          </div>
          <div className="w-full bg-card-dark rounded-full h-2 overflow-hidden border border-rose-gold/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedGames.length / games.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-rose-gold to-soft-gold"
            />
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {games.map((game, idx) => {
            const isCompleted = completedGames.includes(game.id);
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card3D className="h-full">
                  <div className="space-y-4 h-full flex flex-col">
                    {/* Game Icon */}
                    <div className="text-5xl text-center">{game.emoji}</div>

                    {/* Title */}
                    <h3 className="font-elegant text-xl text-rose-gold text-center">
                      {game.title}
                    </h3>

                    {/* Description */}
                    <p className="text-soft-gold/70 text-sm flex-1">
                      {game.description}
                    </p>

                    {/* Difficulty & Status */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={difficultyColors[game.difficulty]}>
                        {game.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="text-green-400 font-bold">✓ Completed</span>
                      )}
                    </div>

                    {/* Play Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlayGame(game)}
                      className="w-full mt-auto px-4 py-2 rounded-lg font-elegant text-sm bg-gradient-to-r from-rose-gold to-soft-gold text-dark-bg hover:shadow-lg transition-shadow"
                    >
                      {isCompleted ? 'Play Again' : 'Play Now'}
                    </motion.button>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onComplete={() => handleCompleteGame(selectedGame.id)}
        />
      )}
    </div>
  );
};

interface GameModalProps {
  game: Game;
  onClose: () => void;
  onComplete: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-card-dark to-maroon/30 border border-rose-gold/50 rounded-lg p-8 max-w-2xl w-full backdrop-blur-lg space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{game.emoji}</span>
            <h2 className="font-elegant text-3xl text-rose-gold">{game.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-soft-gold/50 hover:text-soft-gold transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Game Content */}
        <div className="space-y-6">
          <p className="text-soft-gold/80">{game.description}</p>

          <div className="bg-royal-blue/20 border border-rose-gold/30 rounded-lg p-6 text-center space-y-4">
            <p className="text-soft-gold/70">🎮 Game mechanics loading...</p>
            <p className="text-sm text-soft-gold/50">
              Interactive game coming soon in full implementation
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="flex-1 px-6 py-3 rounded-lg font-elegant bg-gradient-to-r from-rose-gold to-soft-gold text-dark-bg hover:shadow-lg transition-shadow"
            >
              Complete Game
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg font-elegant border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 transition-colors"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GamesPage;
