'use client';

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import ObermannMark from '@/components/ui/ObermannMark';
import { useTheme } from '@/context/ThemeContext';
import {
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
  heroSubtitleLines,
  heroTitleLines,
} from '@/lib/heroContent';
import { DEFAULT_RESUME_URL, downloadResume } from '@/lib/resume';

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

function useCameraEntranceReady() {
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

export default function HeroSection({
  eyebrow = 'UI/UX DESIGNER • PRODUCT DESIGNER',
  title = DEFAULT_HERO_TITLE,
  subtitle = DEFAULT_HERO_SUBTITLE,
  ctaLabel = 'View My Work',
  ctaHref = '/projects',
  secondaryCtaLabel = 'Download Resume',
  secondaryCtaHref = DEFAULT_RESUME_URL,
}: HeroSectionProps) {
  const { theme, mounted: themeMounted } = useTheme();
  const isLightHero = themeMounted && theme === 'light';
  const reduceMotion = useReducedMotion();
  const entranceReady = useCameraEntranceReady();

  const handleResumeDownload = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await downloadResume(secondaryCtaHref);
  };

  const play = entranceReady || !!reduceMotion;

  return (
    <section className="obermann-hero">
      <motion.div
        className="obermann-hero-camera"
        initial={reduceMotion ? false : { scale: 1.12, opacity: 0.28 }}
        animate={
          play
            ? { scale: 1, opacity: 1 }
            : { scale: 1.12, opacity: 0.28 }
        }
        transition={{ duration: reduceMotion ? 0 : 1.7, ease }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 1.22, y: 28 }}
            animate={
              play
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 1.22, y: 28 }
            }
            transition={{ duration: reduceMotion ? 0 : 2.05, ease }}
            className="relative h-[min(78vw,580px)] w-[min(78vw,580px)]"
          >
            <ObermannMark
              variant={isLightHero ? 'default' : 'minimal'}
              className="obermann-hero-mark h-full w-full"
            />
          </motion.div>
        </div>

        <motion.div
          className="obermann-hero-content"
          initial={reduceMotion ? false : 'hidden'}
          animate={play ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.08,
                delayChildren: reduceMotion ? 0 : 0.18,
              },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.95, ease },
              },
            }}
            className="obermann-hero-eyebrow"
          >
            {eyebrow}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 1.05, ease },
              },
            }}
            className="obermann-hero-title-wrap"
          >
            <h1 className="obermann-hero-title">
              {heroTitleLines(title).slice(0, 2).map((line, index) => (
                <span key={index} className="obermann-hero-title-line">
                  {line}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.95, ease },
              },
            }}
            className="obermann-hero-subtitle-wrap"
          >
            <p className="obermann-hero-subtitle">
              {heroSubtitleLines(subtitle).join('\n')}
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease },
              },
            }}
            className="obermann-hero-actions"
          >
            <Link href={ctaHref} className="btn-obermann interactive-cursor">
              {ctaLabel}
            </Link>
            {secondaryCtaHref && (
              <a
                href={secondaryCtaHref}
                onClick={handleResumeDownload}
                className="btn-obermann-outline interactive-cursor"
              >
                {secondaryCtaLabel}
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: reduceMotion ? 0 : 1.15, duration: 0.9, ease }}
          className="absolute bottom-8 left-6 z-10 text-[0.6875rem] lowercase tracking-[0.12em] text-white/50 sm:left-10 lg:left-12"
        >
          scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
}
