'use client';

import { motion, type Variants } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'none' | 'scale';
  once?: boolean;
}

export default function FadeIn({
  children,
  className = '',
}: FadeInProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
