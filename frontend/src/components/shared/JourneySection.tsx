'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export default function JourneySection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={`lab-journey-block ${className}`.trim()}>{children}</div>;
  }

  return (
    <motion.div
      className={`lab-journey-block ${className}`.trim()}
      initial={{ opacity: 0.82, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12, margin: '-4% 0px -8% 0px' }}
      transition={{ duration: 0.75, ease }}
    >
      {children}
    </motion.div>
  );
}
