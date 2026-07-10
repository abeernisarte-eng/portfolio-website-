'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ServicesAboutImageMorphProps = {
  servicesImageSrc: string;
  aboutImageSrc: string;
  servicesImageFrameRef: React.RefObject<HTMLDivElement | null>;
  aboutImageFrameRef: React.RefObject<HTMLDivElement | null>;
  badgeLeft?: string;
  badgeRight?: string;
};

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function readAngle(el: HTMLElement) {
  const transform = window.getComputedStyle(el).transform;
  if (!transform || transform === 'none') return 0;
  const matrix = new DOMMatrix(transform);
  return Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
}

function getViewportMetrics(el: HTMLElement, angle: number) {
  const rect = el.getBoundingClientRect();
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    width,
    height,
    angle,
  };
}

export default function ServicesAboutImageMorph({
  servicesImageSrc,
  aboutImageSrc,
  servicesImageFrameRef,
  aboutImageFrameRef,
  badgeLeft = 'Design',
  badgeRight = 'Craft',
}: ServicesAboutImageMorphProps) {
  const morphRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const anglesRef = useRef({ from: -6, to: -5 });
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const source = servicesImageFrameRef.current;
    const target = aboutImageFrameRef.current;
    const morph = morphRef.current;
    const inner = innerRef.current;

    if (!source || !target || !morph || !inner) return;

    const sourceWrap = source.closest('.services-main-image-wrap') as HTMLElement | null;

    const refreshAngles = () => {
      anglesRef.current = {
        from: readAngle(source),
        to: readAngle(target),
      };
    };

    const setVisibility = (progress: number) => {
      const morphing = progress > 0.02 && progress < 0.98;

      source.style.visibility = morphing ? 'hidden' : '';
      target.style.visibility = progress >= 0.98 ? '' : 'hidden';

      if (sourceWrap) {
        sourceWrap.style.visibility = morphing ? 'hidden' : '';
      }

      morph.classList.toggle('is-active', morphing);
    };

    const applyMorph = (rawProgress: number) => {
      const progress = gsap.utils.clamp(0, 1, rawProgress);
      setVisibility(progress);

      if (progress <= 0.02 || progress >= 0.98) return;

      const { from: fromAngle, to: toAngle } = anglesRef.current;
      const from = getViewportMetrics(source, fromAngle);
      const to = getViewportMetrics(target, toAngle);

      const cx = lerp(from.cx, to.cx, progress);
      const cy = lerp(from.cy, to.cy, progress);
      const width = lerp(from.width, to.width, progress);
      const height = lerp(from.height, to.height, progress);
      const rotate = lerp(fromAngle, toAngle, progress);
      const x = cx - width / 2;
      const y = cy - height / 2;

      morph.style.setProperty('--morph-x', `${x}px`);
      morph.style.setProperty('--morph-y', `${y}px`);
      morph.style.setProperty('--morph-w', `${width}px`);
      morph.style.setProperty('--morph-h', `${height}px`);
      morph.style.setProperty('--morph-rotate', `${rotate}deg`);
      morph.style.setProperty('--morph-radius', `${lerp(32, 28, progress)}px`);
      morph.style.setProperty('--morph-progress', String(progress));
      morph.style.setProperty('--morph-badge', String(Math.max(0, 1 - progress * 1.6)));
      morph.style.setProperty('--morph-dot', String(Math.max(0, (progress - 0.45) * 1.8)));
    };

    const trigger = ScrollTrigger.create({
      trigger: source,
      start: 'top 70%',
      endTrigger: target,
      end: 'top 45%',
      scrub: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onRefresh: refreshAngles,
      onUpdate: (self) => applyMorph(self.progress),
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(source);
    resizeObserver.observe(target);

    refreshAngles();
    target.style.visibility = 'hidden';
    applyMorph(trigger.progress);

    const refreshAfterImages = () => ScrollTrigger.refresh();
    void Promise.all(
      [servicesImageSrc, aboutImageSrc].map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(refreshAfterImages);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      trigger.kill();

      morph.classList.remove('is-active');
      source.style.visibility = '';
      target.style.visibility = '';
      if (sourceWrap) sourceWrap.style.visibility = '';
    };
  }, [mounted, reducedMotion, servicesImageFrameRef, aboutImageFrameRef, servicesImageSrc, aboutImageSrc]);

  if (!mounted || reducedMotion) return null;

  return createPortal(
    <div ref={morphRef} className="services-about-morph" aria-hidden>
      <div ref={innerRef} className="services-about-morph-inner">
        <div className="services-about-morph-layer services-about-morph-layer--from">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={servicesImageSrc}
            alt=""
            className="services-about-morph-image"
            loading="eager"
            decoding="async"
          />
          <div className="services-main-image-overlay" />
          <div className="services-main-image-shine" />
        </div>

        <div className="services-about-morph-layer services-about-morph-layer--to">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aboutImageSrc}
            alt=""
            className="services-about-morph-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="services-main-image-badge services-about-morph-badge">
          <span>{badgeLeft}</span>
          <span className="services-main-image-badge-dot" />
          <span>{badgeRight}</span>
        </div>

        <span className="about-home-image-dot services-about-morph-dot" />
      </div>
    </div>,
    document.body,
  );
}
