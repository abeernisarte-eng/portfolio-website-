'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: i % 5 === 0 ? 2 : 1,
  delay: (i % 9) * 0.4,
  duration: 6 + (i % 6) * 1.4,
  opacity: 0.25 + (i % 4) * 0.12,
}));

export default function LabAtmosphere() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.45,
  });

  // Soft maroon bloom drifts through the viewport as sections scroll
  const glowX = useTransform(scrollSmooth, [0, 0.22, 0.45, 0.68, 1], ['50%', '62%', '38%', '70%', '48%']);
  const glowY = useTransform(scrollSmooth, [0, 0.22, 0.45, 0.68, 1], ['42%', '18%', '58%', '32%', '72%']);
  const glowScale = useTransform(scrollSmooth, [0, 0.35, 0.7, 1], [1, 1.12, 0.92, 1.08]);
  const glowOpacity = useTransform(scrollSmooth, [0, 0.15, 0.5, 0.85, 1], [0.18, 0.28, 0.22, 0.3, 0.2]);

  const scrollGlow = useMotionTemplate`radial-gradient(ellipse 58% 48% at ${glowX} ${glowY}, rgba(90, 28, 42, 0.22) 0%, rgba(50, 12, 24, 0.1) 36%, transparent 68%)`;
  const scrollGlowSoft = useMotionTemplate`radial-gradient(ellipse 42% 36% at ${glowX} ${glowY}, rgba(120, 40, 58, 0.08) 0%, transparent 60%)`;

  const orbitX = glowX;
  const orbitY = glowY;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 48, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 48, damping: 26, mass: 0.6 });
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(30rem circle at ${spotX} ${spotY}, rgba(122, 32, 56, 0.14), transparent 64%)`;

  useEffect(() => {
    document.documentElement.classList.add('site-gradient', 'lab-atmosphere-active');
    return () => {
      document.documentElement.classList.remove('site-gradient', 'lab-atmosphere-active');
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduceMotion]);

  return (
    <div ref={rootRef} className="lab-atmosphere" aria-hidden>
      <div className="lab-atmosphere-base" />

      {/* Scroll-linked maroon gradient bloom (replaces fixed circle wash) */}
      <motion.div
        className="lab-atmosphere-scroll-glow"
        style={{
          background: scrollGlow,
          opacity: reduceMotion ? 0.22 : glowOpacity,
          scale: reduceMotion ? 1 : glowScale,
        }}
      />
      <motion.div
        className="lab-atmosphere-scroll-glow lab-atmosphere-scroll-glow--soft"
        style={{ background: scrollGlowSoft }}
      />

      {/* Radar orbits follow the same scroll center */}
      <motion.div
        className="lab-atmosphere-radar"
        style={{
          left: orbitX,
          top: orbitY,
        }}
      >
        <span className="lab-atmosphere-radar__rings" />
        <span className="lab-atmosphere-radar__spokes" />
      </motion.div>

      <div className="lab-atmosphere-grid" />
      <div className="lab-atmosphere-grid lab-atmosphere-grid--major" />

      {!reduceMotion && (
        <motion.div className="lab-atmosphere-spotlight" style={{ background: spotlight }} />
      )}

      <div className="lab-atmosphere-grain" />
      <div className="lab-atmosphere-edge" />

      {!reduceMotion &&
        STARS.map((p) => (
          <span
            key={p.id}
            className="lab-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
    </div>
  );
}
