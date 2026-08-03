'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  href,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.75, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.75, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * 0.38);
      yTo(y * 0.38);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const sharedClass = `relative inline-flex items-center justify-center ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        className={sharedClass}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={sharedClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
