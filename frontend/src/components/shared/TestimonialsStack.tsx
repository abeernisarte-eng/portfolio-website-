'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

const ease = [0.16, 1, 0.3, 1] as const;
const HOVER_ADVANCE_MS = 2000;

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

const STACK = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, blur: 0, z: 30 },
  { x: 28, y: 18, rotate: -8, scale: 0.965, opacity: 0.78, blur: 0.4, z: 20 },
  { x: 48, y: 34, rotate: -14, scale: 0.93, opacity: 0.45, blur: 1, z: 10 },
] as const;

export default function TestimonialsStack({ testimonials }: TestimonialsStackProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = testimonials.length;

  const clearAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const advance = () => {
    if (count < 2) return;
    setActive((prev) => (prev + 1) % count);
  };

  const startAdvance = () => {
    if (count < 2 || timerRef.current) return;
    advance();
    timerRef.current = setInterval(advance, HOVER_ADVANCE_MS);
  };

  useEffect(() => () => clearAdvance(), []);

  if (!count) return null;

  const depth = Math.min(3, count);
  const stackItems = Array.from({ length: depth }, (_, offset) => {
    const index = (active + offset) % count;
    return { offset, index, item: testimonials[index] };
  });

  return (
    <div
      className="testimonials-stack interactive-cursor"
      onMouseEnter={startAdvance}
      onMouseLeave={clearAdvance}
      onFocus={startAdvance}
      onBlur={clearAdvance}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      tabIndex={0}
    >
      <div className="testimonials-stack-stage">
        <AnimatePresence initial={false} mode="popLayout">
          {stackItems.map(({ offset, item }) => {
            const pose = STACK[offset] ?? STACK[STACK.length - 1];

            return (
              <motion.blockquote
                key={item.id}
                layout
                className="testimonials-stack-card glass-surface rounded-2xl border border-[var(--border)] p-8 theme-transition"
                initial={{
                  x: 40,
                  y: 32,
                  rotate: -12,
                  scale: 0.92,
                  opacity: 0,
                  filter: 'blur(1.2px)',
                }}
                animate={{
                  x: pose.x,
                  y: pose.y,
                  rotate: pose.rotate,
                  scale: pose.scale,
                  opacity: pose.opacity,
                  zIndex: pose.z,
                  filter: `blur(${pose.blur}px)`,
                }}
                exit={{
                  x: -56,
                  y: -22,
                  rotate: 12,
                  scale: 0.94,
                  opacity: 0,
                  filter: 'blur(1.6px)',
                  zIndex: 40,
                }}
                transition={{ duration: 0.75, ease }}
                style={{ pointerEvents: offset === 0 ? 'auto' : 'none' }}
              >
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                  &ldquo;{item.review}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
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
            );
          })}
        </AnimatePresence>
      </div>

      {count > 1 && (
        <p className="testimonials-stack-hint" aria-hidden>
          Hover to shuffle
        </p>
      )}
    </div>
  );
}
