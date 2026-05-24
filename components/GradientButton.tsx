'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Premium luxury button component
 */
export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-lg font-elegant font-semibold transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${sizeClasses[size]} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #d4a574 0%, #a0825c 100%)',
        boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)',
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 text-dark-bg">
        {children}
      </span>

      {/* Hover glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        className="absolute inset-0 bg-white"
      />
    </motion.button>
  );
};

export default GradientButton;
