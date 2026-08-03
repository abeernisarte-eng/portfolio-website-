'use client';

import { motion, useReducedMotion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

const ease = [0.16, 1, 0.3, 1] as const;

const DEFAULT_STEPS = [
  { id: 'discover', label: 'Discover' },
  { id: 'define', label: 'Define' },
  { id: 'design', label: 'Design' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'deliver', label: 'Deliver' },
] as const;

type ProcessStep = { id: string; label: string };

type ProcessOrbitSectionProps = {
  title?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  steps?: ProcessStep[];
};

function splitTitle(title: string): [string, string] {
  const cleaned = title.trim().replace(/\s+/g, ' ');
  const mid = cleaned.lastIndexOf(' ');
  if (mid === -1) return [cleaned, ''];
  return [cleaned.slice(0, mid), cleaned.slice(mid + 1)];
}

/** Evenly space steps on a circle (0° = top, clockwise). */
function nodePosition(index: number, total: number, radiusPercent = 38) {
  const angleDeg = (360 / total) * index - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = 50 + radiusPercent * Math.cos(angleRad);
  const y = 50 + radiusPercent * Math.sin(angleRad);
  return { left: `${x}%`, top: `${y}%` };
}

export default function ProcessOrbitSection({
  title,
  titleLine1,
  titleLine2,
  subtitle,
  steps = [...DEFAULT_STEPS],
}: ProcessOrbitSectionProps) {
  const reduceMotion = useReducedMotion();
  const items = steps.length >= 3 ? steps : [...DEFAULT_STEPS];
  const [line1, line2] = title
    ? splitTitle(title)
    : [titleLine1 ?? 'MY DESIGN', titleLine2 ?? 'PROCESS'];

  return (
    <section className="process-orbit lab-flow-section" aria-labelledby="process-orbit-title">
      <div className="process-orbit__inner">
        <FadeIn className="process-orbit__fade">
          <div className="process-orbit__stage">
            <div className="process-orbit__ring" aria-hidden />

            <div className="process-orbit__center">
              <h2 id="process-orbit-title" className="process-orbit__title">
                <span className="process-orbit__title-line">{line1}</span>
                {line2 ? <span className="process-orbit__title-line">{line2}</span> : null}
              </h2>
              {subtitle ? <p className="process-orbit__subtitle">{subtitle}</p> : null}
            </div>

            <ul className="process-orbit__nodes">
              {items.map((step, index) => (
                <li
                  key={step.id}
                  className="process-orbit__node"
                  style={nodePosition(index, items.length)}
                >
                  <div className="process-orbit__node-anchor">
                    <motion.div
                      className="process-orbit__node-inner"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: 0.06 * index, ease }}
                      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                    >
                      <span className="process-orbit__orb" aria-hidden />
                      <span className="process-orbit__label">{step.label}</span>
                    </motion.div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
