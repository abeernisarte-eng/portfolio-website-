'use client';

import { useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SESSION_KEY = 'abeer-create-intro-seen';
const TOTAL_MS = 5000;
const ease = [0.16, 1, 0.3, 1] as const;

const PALETTE = ['#E5B7A1', '#C99A82', '#7A1F38', '#3A1018', '#FFFFFF'] as const;

type IntroItem =
  | { id: string; kind: 'type'; delay: number; pos: string }
  | { id: string; kind: 'palette'; delay: number; pos: string }
  | { id: string; kind: 'button'; delay: number; pos: string }
  | { id: string; kind: 'pill'; delay: number; pos: string; label: string; tone?: 'soft' | 'solid' | 'outline' }
  | { id: string; kind: 'spacing'; delay: number; pos: string }
  | { id: string; kind: 'grid'; delay: number; pos: string }
  | { id: string; kind: 'icon'; delay: number; pos: string }
  | { id: string; kind: 'card'; delay: number; pos: string };

const ITEMS: IntroItem[] = [
  { id: 'type', kind: 'type', delay: 2.4, pos: 'type' },
  { id: 'palette', kind: 'palette', delay: 2.55, pos: 'palette' },
  { id: 'button', kind: 'button', delay: 2.7, pos: 'button' },
  { id: 'spacing', kind: 'spacing', delay: 2.85, pos: 'spacing' },
  { id: 'grid', kind: 'grid', delay: 3.0, pos: 'grid' },
  { id: 'icon', kind: 'icon', delay: 3.1, pos: 'icon' },
  { id: 'card', kind: 'card', delay: 3.2, pos: 'card' },
  { id: 'pill-layout', kind: 'pill', delay: 3.3, pos: 'pill-a', label: 'Layout', tone: 'soft' },
  { id: 'pill-motion', kind: 'pill', delay: 3.4, pos: 'pill-b', label: 'Motion', tone: 'outline' },
  { id: 'pill-ai', kind: 'pill', delay: 3.5, pos: 'pill-c', label: 'AI', tone: 'solid' },
  { id: 'pill-ux', kind: 'pill', delay: 3.6, pos: 'pill-d', label: 'UX Flow', tone: 'soft' },
  { id: 'pill-radius', kind: 'pill', delay: 3.7, pos: 'pill-e', label: 'Radius 16', tone: 'outline' },
  { id: 'pill-tokens', kind: 'pill', delay: 3.8, pos: 'pill-f', label: 'Tokens', tone: 'soft' },
];

function IntroElement({ item, exiting }: { item: IntroItem; exiting: boolean }) {
  const enterDelay = item.delay;
  const shared = {
    initial: { opacity: 0, y: 22, scale: 0.94, filter: 'blur(8px)' },
    animate: exiting
      ? { opacity: 0, scale: 0.62, y: 0, filter: 'blur(12px)' }
      : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: {
      duration: exiting ? 0.38 : 0.42,
      delay: exiting ? 0 : enterDelay,
      ease,
    },
  } as const;

  if (item.kind === 'type') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-chip-kicker">Aa</span>
        <span className="create-intro-chip-label">Typography</span>
      </motion.div>
    );
  }

  if (item.kind === 'palette') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-swatches" aria-hidden>
          {PALETTE.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </span>
        <span className="create-intro-chip-label">Color Palette</span>
      </motion.div>
    );
  }

  if (item.kind === 'button') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-mini-btn">Button</span>
        <span className="create-intro-chip-label">UI Button</span>
      </motion.div>
    );
  }

  if (item.kind === 'spacing') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-spacing" aria-hidden>
          <i /><i /><i /><i />
        </span>
        <span className="create-intro-chip-label">Spacing</span>
      </motion.div>
    );
  }

  if (item.kind === 'grid') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-mini-grid" aria-hidden>
          <i /><i /><i /><i />
        </span>
        <span className="create-intro-chip-label">Grid</span>
      </motion.div>
    );
  }

  if (item.kind === 'icon') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-icons" aria-hidden>
          <svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
          <svg viewBox="0 0 16 16" width="14" height="14"><rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 2.5l5.5 9.5H2.5L8 2.5z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" /></svg>
        </span>
        <span className="create-intro-chip-label">Icons</span>
      </motion.div>
    );
  }

  if (item.kind === 'card') {
    return (
      <motion.div className={`create-intro-chip create-intro-pos--${item.pos}`} {...shared}>
        <span className="create-intro-mini-card" aria-hidden>
          <span className="create-intro-mini-card-bar" />
          <span className="create-intro-mini-card-line" />
          <span className="create-intro-mini-card-line is-short" />
        </span>
        <span className="create-intro-chip-label">Card</span>
      </motion.div>
    );
  }

  return (
    <motion.span
      className={`create-intro-pill create-intro-pill--${item.tone ?? 'soft'} create-intro-pos--${item.pos}`}
      {...shared}
    >
      {item.label}
    </motion.span>
  );
}

export default function CreateIntro() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return;
    } catch {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }

    setVisible(true);
    document.documentElement.classList.add('create-intro-active');
    document.body.classList.add('create-intro-active');

    const exitAt = window.setTimeout(() => {
      setExiting(true);
      window.dispatchEvent(new Event('abeer-create-intro-exit'));
    }, TOTAL_MS - 450);
    const hideAt = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove('create-intro-active');
      document.body.classList.remove('create-intro-active');
      window.dispatchEvent(new Event('abeer-create-intro-done'));
    }, TOTAL_MS);

    return () => {
      window.clearTimeout(exitAt);
      window.clearTimeout(hideAt);
      document.documentElement.classList.remove('create-intro-active');
      document.body.classList.remove('create-intro-active');
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="create-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          aria-hidden
        >
          <div className="create-intro-grid" />
          <div className="create-intro-glow create-intro-glow--a" />
          <div className="create-intro-glow create-intro-glow--b" />

          <div className="create-intro-stage">
            <motion.div
              className="create-intro-create"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: exiting ? 0 : 1,
                scale: exiting ? 0.88 : 1,
              }}
              transition={{ duration: exiting ? 0.35 : 0.5, delay: exiting ? 0 : 0.15, ease }}
            >
              <motion.span
                className="create-intro-create-glow"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="create-intro-create-label">Create</span>
              <motion.span
                className="create-intro-ripple"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.4, 1.6, 2] }}
                transition={{ duration: 0.55, delay: 2.15, ease }}
              />
            </motion.div>

            {ITEMS.map((item) => (
              <IntroElement key={item.id} item={item} exiting={exiting} />
            ))}

            <motion.div
              className="create-intro-merge"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                exiting
                  ? { opacity: [0.5, 0], scale: [1, 1.35] }
                  : { opacity: [0, 0.55, 0.35], scale: [0.6, 1.05, 1] }
              }
              transition={{ duration: exiting ? 0.45 : 0.7, delay: exiting ? 0 : 4.15, ease }}
            />
          </div>

          <motion.div
            className="create-intro-mouse"
            initial={{ x: '-42vw', y: 28, opacity: 0 }}
            animate={{
              x: ['-42vw', '0vw', '0vw', '6vw', '6vw', '0vw'],
              y: [28, 8, 8, -4, -4, 0],
              opacity: [0, 1, 1, 1, 1, exiting ? 0 : 1],
              scale: [1, 1, 1, 0.94, 1, exiting ? 0.85 : 1],
            }}
            transition={{
              duration: 4.6,
              times: [0, 0.22, 0.32, 0.42, 0.48, 1],
              ease,
            }}
          >
            <motion.div
              className="create-intro-mouse-body"
              animate={{ rotate: [0, 0, -8, 8, -6, 0, 0, 0] }}
              transition={{ duration: 4.6, times: [0, 0.22, 0.28, 0.34, 0.38, 0.42, 0.5, 1], ease }}
            >
              <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden>
                <circle cx="16" cy="14" r="9" fill="#EDE6F7" />
                <circle cx="48" cy="14" r="9" fill="#EDE6F7" />
                <circle cx="16" cy="14" r="5" fill="#C4B0E0" />
                <circle cx="48" cy="14" r="5" fill="#C4B0E0" />
                <ellipse cx="32" cy="36" rx="20" ry="18" fill="#F5F0FA" />
                <ellipse cx="32" cy="34" rx="14" ry="12" fill="#FFFFFF" opacity="0.35" />
                <motion.g
                  animate={{ x: [0, 0, -2.5, 2.5, -1.5, 0, 0] }}
                  transition={{ duration: 4.6, times: [0, 0.22, 0.28, 0.34, 0.38, 0.42, 1], ease }}
                >
                  <circle cx="25" cy="32" r="2.6" fill="#1A1224" />
                  <circle cx="39" cy="32" r="2.6" fill="#1A1224" />
                  <circle cx="25.7" cy="31.2" r="0.9" fill="#FFFFFF" />
                  <circle cx="39.7" cy="31.2" r="0.9" fill="#FFFFFF" />
                </motion.g>
                <ellipse cx="32" cy="38" rx="2.2" ry="1.6" fill="#B89BCF" />
                <path d="M28 42c2.2 2 5.8 2 8 0" stroke="#9A7FB8" strokeWidth="1.4" strokeLinecap="round" />
                <g className="create-intro-legs">
                  <ellipse className="create-intro-leg create-intro-leg--l" cx="24" cy="52" rx="4" ry="2.5" fill="#D9CDE8" />
                  <ellipse className="create-intro-leg create-intro-leg--r" cx="40" cy="52" rx="4" ry="2.5" fill="#D9CDE8" />
                </g>
                <path
                  d="M14 40c-6 2-9 8-8 12"
                  stroke="#C4B0E0"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
