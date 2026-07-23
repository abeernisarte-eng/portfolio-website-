'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

/** Modern pill toggle — replaces globe control in mission hero chrome. */
export default function MissionThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = !mounted || theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="mission-theme-toggle interactive-cursor"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun className="mission-theme-toggle__icon mission-theme-toggle__icon--sun" aria-hidden />
      <Moon className="mission-theme-toggle__icon mission-theme-toggle__icon--moon" aria-hidden />
      <motion.span
        className="mission-theme-toggle__thumb"
        layout
        transition={{ type: 'spring', stiffness: 520, damping: 36 }}
        animate={{ x: isDark ? 0 : 22 }}
      />
    </button>
  );
}
