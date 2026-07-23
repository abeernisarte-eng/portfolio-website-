'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

const ease = [0.16, 1, 0.3, 1] as const;

type IntroStatementSectionProps = {
  brandName?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function IntroStatementSection({
  brandName = 'Abeer Nisar',
  ctaLabel = 'About me',
  ctaHref = '/about',
}: IntroStatementSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="intro-statement lab-flow-section"
      aria-labelledby="intro-statement-heading"
    >
      <div className="intro-statement__inner">
        <FadeIn>
          <h2 id="intro-statement-heading" className="intro-statement__headline">
            <span className="intro-statement__plain">I&apos;m {brandName} – </span>
            <span className="intro-statement__accent">a UI/UX Designer &amp; Design Engineer</span>
            <span className="intro-statement__plain">
              {' '}
              creating intuitive, high-performance digital experiences{' '}
            </span>
            <span className="intro-statement__accent">
              where design meets modern AI-powered development.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="intro-statement__body">
            I specialize in designing user-centered interfaces, scalable design systems, and
            immersive saas web experiences that combine aesthetics with usability.
          </p>
        </FadeIn>

        <FadeIn delay={0.14}>
          <Link
            href={ctaHref}
            className="intro-statement__cta interactive-cursor"
            aria-label={ctaLabel}
          >
            <motion.span
              className="intro-statement__cta-label"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
            >
              {ctaLabel}
            </motion.span>
            <motion.span
              className="intro-statement__cta-icon"
              aria-hidden
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
              transition={{ duration: 0.25, ease }}
            >
              <ArrowUpRight size={16} strokeWidth={2} />
            </motion.span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
