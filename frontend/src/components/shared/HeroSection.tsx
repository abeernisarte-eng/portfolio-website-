'use client';

import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownToLine, Moon, Sun } from 'lucide-react';
import { ObermannLogo } from '@/components/ui/ObermannMark';
import { useTheme } from '@/context/ThemeContext';
import { DEFAULT_RESUME_URL, downloadResume, resolveResumeUrl } from '@/lib/resume';
import { useCms } from '@/context/CmsContext';

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = '#ae0c40';

interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: { value: string; label: string }[];
  brandName?: string;
}

function useEntranceReady() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (reduceMotion) {
      setReady(true);
      return;
    }
    const start = () => setReady(true);
    if (document.body.classList.contains('create-intro-active')) {
      window.addEventListener('abeer-create-intro-exit', start, { once: true });
      window.addEventListener('abeer-create-intro-done', start, { once: true });
      const observer = new MutationObserver(() => {
        if (!document.body.classList.contains('create-intro-active')) start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      return () => {
        window.removeEventListener('abeer-create-intro-exit', start);
        window.removeEventListener('abeer-create-intro-done', start);
        observer.disconnect();
      };
    }
    const frame = requestAnimationFrame(start);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return ready;
}

/** Crisp play control — vector only. */
function PlayControl({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden>
      <defs>
        <radialGradient id="play-fill" cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="rgba(200,30,80,0.55)" />
          <stop offset="45%" stopColor="rgba(50,8,20,0.96)" />
          <stop offset="100%" stopColor="rgba(6,1,3,0.99)" />
        </radialGradient>
        <linearGradient id="play-rim" x1="16" y1="10" x2="64" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6b9a" />
          <stop offset="0.4" stopColor="#ae0c40" />
          <stop offset="1" stopColor="#4a061c" />
        </linearGradient>
        <filter id="play-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="figma-hero__play-orbit">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke={ACCENT}
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="4 10"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke={ACCENT}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="14 220"
          filter="url(#play-soft-glow)"
        />
      </g>

      <circle cx="40" cy="40" r="24" fill="url(#play-fill)" />
      <circle
        cx="40"
        cy="40"
        r="24"
        stroke="url(#play-rim)"
        strokeWidth="1.6"
        filter="url(#play-soft-glow)"
      />
      <circle cx="40" cy="40" r="19" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path
        d="M34.2 28.2v23.6L52.8 40 34.2 28.2Z"
        fill="#fff"
        filter="url(#play-soft-glow)"
      />
    </svg>
  );
}

/** Face-on concentric orbits — SVG/CSS, not baked into a photo. */
function OrbitRings() {
  return (
    <svg className="figma-hero__ring-svg" viewBox="0 0 800 800" fill="none" aria-hidden>
      <defs>
        <linearGradient id="orbit-stroke" x1="120" y1="80" x2="680" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ae0c40" stopOpacity="0.15" />
          <stop offset="35%" stopColor="#ae0c40" stopOpacity="0.7" />
          <stop offset="55%" stopColor="#ff4d7a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ae0c40" stopOpacity="0.12" />
        </linearGradient>
        <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="figma-hero__rings-base">
        <circle cx="400" cy="400" r="360" stroke="url(#orbit-stroke)" strokeWidth="1.1" />
        <circle cx="400" cy="400" r="300" stroke={ACCENT} strokeOpacity="0.28" strokeWidth="1" />
        <circle
          cx="400"
          cy="400"
          r="246"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
        <circle cx="400" cy="400" r="188" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="1" />
      </g>

      <g className="figma-hero__rings-spin figma-hero__rings-spin--cw" filter="url(#orbit-glow)">
        <circle
          cx="400"
          cy="400"
          r="360"
          stroke={ACCENT}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="110 2150"
        />
        <circle
          cx="400"
          cy="400"
          r="300"
          stroke="#ff4d7a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="70 1820"
          strokeDashoffset="420"
          opacity="0.9"
        />
      </g>

      <g className="figma-hero__rings-spin figma-hero__rings-spin--ccw" filter="url(#orbit-glow)">
        <circle
          cx="400"
          cy="400"
          r="246"
          stroke={ACCENT}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="58 1490"
          strokeDashoffset="200"
        />
      </g>
    </svg>
  );
}

function StatusIndicator({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden>
      <defs>
        <filter id="status-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="22" cy="22" r="20.5" stroke="#520820" strokeWidth="1.25" fill="#030000" />
      <circle cx="22" cy="22" r="5" fill="#AE0C40" filter="url(#status-glow)" />
    </svg>
  );
}

export default function HeroSection({
  brandName = 'Abeer Nisar',
  secondaryCtaHref,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const ready = useEntranceReady() || !!reduceMotion;
  const pinRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme, mounted } = useTheme();
  const { cms } = useCms();
  const settings = cms.settings as Record<string, string>;
  const resumeUrl = resolveResumeUrl(
    String(secondaryCtaHref || settings.resumeUrl || DEFAULT_RESUME_URL),
  );

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });
  const portfolioY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const agentY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const handleResume = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await downloadResume(resumeUrl);
  };

  const openMenu = () => {
    window.dispatchEvent(new CustomEvent('abeer-open-nav'));
  };

  return (
    <section
      ref={pinRef}
      className="figma-hero"
      aria-labelledby="figma-hero-title"
      data-node-id="1:3"
    >
      <div className="figma-hero__canvas">
        {/* Built atmosphere — not a hero photo */}
        <div className="figma-hero__scene" aria-hidden>
          <div className="figma-hero__scene-base" />
          <div className="figma-hero__scene-bloom" />
          <div className="figma-hero__scene-bloom figma-hero__scene-bloom--soft" />
          <div className="figma-hero__scene-grid" />
          <div className="figma-hero__scene-floor" />
          <div className="figma-hero__scene-vignette" />
          <div className="figma-hero__scene-noise" />
        </div>

        {/* PORTFOLIO watermark — live type */}
        <motion.div
          className="figma-hero__portfolio"
          style={reduceMotion ? undefined : { y: portfolioY }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          aria-hidden
        >
          <span className="figma-hero__portfolio-text">PORTFOLIO</span>
        </motion.div>

        {/* Crisp SVG orbits + play locked to ring geometry */}
        <div className="figma-hero__rings">
          <motion.div
            className="figma-hero__rings-motion"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.05, ease }}
          >
            <OrbitRings />
          </motion.div>

          <motion.button
            type="button"
            className="figma-hero__play interactive-cursor"
            aria-label="Play showreel"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease }}
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            {!reduceMotion && <span className="figma-hero__play-pulse" aria-hidden />}
            <PlayControl className="figma-hero__play-svg" />
          </motion.button>
        </div>

        {/* Astronaut cutout only */}
        <div className="figma-hero__agent-wrap">
          <motion.div
            className="figma-hero__agent"
            style={reduceMotion ? undefined : { y: agentY }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease }}
          >
            <div className="figma-hero__agent-glow" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/figma-hero/astronaut-clean.png"
              alt=""
              className="figma-hero__agent-img"
              draggable={false}
            />
            <div className="figma-hero__agent-shadow" aria-hidden />
          </motion.div>
        </div>

        <header className="figma-hero__header">
          <Link href="/" className="figma-hero__logo interactive-cursor" aria-label={brandName}>
            <ObermannLogo size={28} className="figma-hero__logo-mark" />
            <span className="figma-hero__logo-name">{brandName}</span>
          </Link>

          <div className="figma-hero__header-actions">
            <a
              href={resumeUrl}
              onClick={handleResume}
              className="figma-hero__resume interactive-cursor"
            >
              <span>Download Resume</span>
              <span className="figma-hero__resume-icon" aria-hidden>
                <ArrowDownToLine size={16} strokeWidth={1.75} />
              </span>
            </a>
            <button
              type="button"
              className="figma-hero__menu interactive-cursor"
              aria-label="Open navigation"
              onClick={openMenu}
            >
              <span className="figma-hero__menu-lines" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>

        <motion.div
          className="figma-hero__copy"
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          animate={ready ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          <h1 id="figma-hero-title" className="figma-hero__title">
            <span>Designing</span>
            <span>Digital</span>
            <span className="figma-hero__title-accent">Experiences.</span>
          </h1>
          <div className="figma-hero__rule" aria-hidden />
          <p className="figma-hero__subtitle">Interface that feel effortless.</p>
        </motion.div>

        <div className="figma-hero__footer">
          <div className="figma-hero__status" aria-hidden>
            <StatusIndicator className="figma-hero__status-svg" />
          </div>

          <button
            type="button"
            className="figma-hero__scroll interactive-cursor"
            aria-label="Scroll down"
            onClick={() =>
              pinRef.current?.nextElementSibling?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
          >
            <span className="figma-hero__scroll-icon" aria-hidden>
              <span className="figma-hero__scroll-wheel" />
            </span>
          </button>

          <button
            type="button"
            className={`figma-hero__theme interactive-cursor ${
              mounted ? `is-${theme}` : 'is-dark'
            }`}
            aria-label={
              mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            onClick={toggleTheme}
          >
            <span className="figma-hero__theme-track" aria-hidden>
              <Sun size={15} strokeWidth={1.75} className="figma-hero__theme-sun" />
              <Moon size={15} strokeWidth={1.75} className="figma-hero__theme-moon" />
            </span>
            <motion.span
              className="figma-hero__theme-thumb"
              initial={false}
              animate={{ x: !mounted || theme === 'dark' ? 34 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 520, damping: 34 }
              }
              aria-hidden
            />
          </button>
        </div>
      </div>
    </section>
  );
}
