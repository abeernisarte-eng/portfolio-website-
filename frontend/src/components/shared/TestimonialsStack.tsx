'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

const ease = [0.16, 1, 0.3, 1] as const;

export type TestimonialItem = {
  id: string;
  clientName: string;
  clientRole?: string;
  company?: string;
  review: string;
  clientPhoto?: string;
};

type TestimonialsStackProps = {
  testimonials: TestimonialItem[];
};

function photoFor(t: TestimonialItem) {
  return (
    resolveImageUrl(t.clientPhoto) ||
    (t.clientName === 'Sardar Azam'
      ? '/images/testimonials/sardar-azam.jpg'
      : '/images/testimonials/waseem-khan.jpg')
  );
}

function NavFacet({ direction }: { direction: 'prev' | 'next' }) {
  const isNext = direction === 'next';
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="testimonials-nav-icon"
    >
      <path
        d={
          isNext
            ? 'M14 10 L26 20 L14 30'
            : 'M26 10 L14 20 L26 30'
        }
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={
          isNext
            ? 'M18 14 L24 20 L18 26'
            : 'M22 14 L16 20 L22 26'
        }
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
    </svg>
  );
}

export default function TestimonialsStack({ testimonials }: TestimonialsStackProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const count = testimonials.length;

  if (!count) return null;

  const goTo = (nextIndex: number, dir: number) => {
    if (count < 2) return;
    setDirection(dir);
    setActive(((nextIndex % count) + count) % count);
  };

  const goPrev = () => goTo(active - 1, -1);
  const goNext = () => goTo(active + 1, 1);

  const item = testimonials[active];
  const peek = count > 1 ? testimonials[(active + 1) % count] : null;

  return (
    <div
      className="testimonials-stack"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="testimonials-stack-rail">
        {count > 1 && (
          <button
            type="button"
            className="testimonials-nav interactive-cursor"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <NavFacet direction="prev" />
          </button>
        )}

        <div className="testimonials-stack-stage">
          {peek && (
            <div className="testimonials-stack-peek" aria-hidden>
              <blockquote className="testimonials-stack-card glass-surface rounded-2xl border border-[var(--border)] p-8 sm:p-10 theme-transition">
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
                  &ldquo;{peek.review}&rdquo;
                </p>
                <footer className="mt-8 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                    <Image src={photoFor(peek)} alt="" fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{peek.clientName}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {peek.clientRole}
                      {peek.company ? `, ${peek.company}` : ''}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          )}

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.blockquote
              key={item.id}
              custom={direction}
              className="testimonials-stack-card testimonials-stack-card--front glass-surface rounded-2xl border border-[var(--border)] p-8 sm:p-10 theme-transition"
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 48 : -48,
                  y: dir > 0 ? 18 : -10,
                  rotate: dir > 0 ? 6 : -6,
                  opacity: 0,
                  scale: 0.96,
                  filter: 'blur(2px)',
                }),
                center: {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                },
                exit: (dir: number) => ({
                  x: dir > 0 ? -64 : 64,
                  y: dir > 0 ? -28 : 18,
                  rotate: dir > 0 ? -10 : 10,
                  opacity: 0,
                  scale: 0.94,
                  filter: 'blur(1.5px)',
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease }}
            >
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem] sm:leading-7">
                &ldquo;{item.review}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                  <Image
                    src={photoFor(item)}
                    alt={item.clientName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.clientName}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.clientRole}
                    {item.company ? `, ${item.company}` : ''}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <button
            type="button"
            className="testimonials-nav interactive-cursor"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <NavFacet direction="next" />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="testimonials-stack-index" aria-live="polite">
          <span className="testimonials-stack-index-current">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="testimonials-stack-index-sep" aria-hidden>
            /
          </span>
          <span className="testimonials-stack-index-total">
            {String(count).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
