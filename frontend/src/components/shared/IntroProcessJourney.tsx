'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { id: 'discover', label: 'Discover' },
  { id: 'define', label: 'Define' },
  { id: 'design', label: 'Design' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'deliver', label: 'Deliver' },
] as const;

type IntroProcessJourneyProps = {
  brandName?: string;
  ctaLabel?: string;
  ctaHref?: string;
  processTitle?: string;
};

function splitTitle(title: string): [string, string] {
  const cleaned = title.trim().replace(/\s+/g, ' ');
  const mid = cleaned.lastIndexOf(' ');
  if (mid === -1) return [cleaned, ''];
  return [cleaned.slice(0, mid), cleaned.slice(mid + 1)];
}

function shortestDelta(from: number, to: number) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function IntroProcessJourney({
  brandName = 'Abeer Nisar',
  ctaLabel = 'About me',
  ctaHref = '/about',
  processTitle = 'MY DESIGN PROCESS',
}: IntroProcessJourneyProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [line1, line2] = splitTitle(processTitle);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const spacer = spacerRef.current;
    const copy = copyRef.current;
    const ring = ringRef.current;
    const center = centerRef.current;
    if (!root || !stage || !spacer || !copy || !ring || !center) return;

    const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];
    const orbs = orbRefs.current.filter(Boolean) as HTMLSpanElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (circles.length !== STEPS.length) return;

    if (reduceMotion) {
      gsap.set(copy, { opacity: 0, visibility: 'hidden' });
      gsap.set(ring, { opacity: 1 });
      gsap.set(center, { opacity: 1 });
      gsap.set(labels, { opacity: 1 });
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const step = (Math.PI * 2) / circles.length;
    const orbitTurns = 0.55;
    const finalScale = isMobile ? 0.88 : 0.86;
    const spacingBlendDuration = 0.22;
    const circleSpin = STEPS.map((_, i) => 120 + i * 36);
    const labelGap = isMobile ? 22 : 28;
    const glowPad = isMobile ? 12 : 16;

    let orbitLoop: gsap.core.Tween | null = null;
    let starts: { x: number; y: number; angle: number; radius: number }[] = [];
    let viewportCenterX = 0;
    let viewportCenterY = 0;
    let orbitRadius = 0;
    let startCenterX = 0;
    let startCenterY = 0;
    let startRadius = 0;
    let baseEndAngle = -Math.PI / 2;

    const orbitData = {
      t: 0,
      radius: 0,
      scale: 1,
      centerX: 0,
      centerY: 0,
      currentAngle: 0,
    };

    const loopData = { angle: 0 };
    const loopState = { startAngleDegrees: 0 };
    const loopBaseRotation = circleSpin.map(() => 0);
    const loopSpin = circleSpin.map(() => 0.85);

    const labelOffsetFor = (scale: number) => {
      const orbSize = orbs[0]?.offsetWidth || 80;
      return (orbSize * scale) / 2 + labelGap + glowPad;
    };

    const placeLabel = (label: HTMLElement, angle: number, scale: number) => {
      const dist = labelOffsetFor(scale);
      gsap.set(label, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        xPercent: -50,
        yPercent: -50,
        rotation: 0,
        force3D: true,
      });
    };

    const measure = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      viewportCenterX = vw / 2;
      viewportCenterY = vh / 2;

      const orbSize = orbs[0]?.offsetWidth || (isMobile ? 54 : 80);
      const labelReach = (orbSize * finalScale) / 2 + labelGap + glowPad + 28;
      const maxRadius = Math.min(vw, vh) / 2 - labelReach;
      const preferred = isMobile
        ? Math.max(130, Math.min(vh * 0.3, 170))
        : Math.max(200, Math.min(vh * 0.34, 270));
      orbitRadius = Math.min(preferred, Math.max(120, maxRadius));

      gsap.set(ring, {
        width: orbitRadius * 2,
        height: orbitRadius * 2,
      });

      startCenterX = viewportCenterX;
      startCenterY = viewportCenterY + (isMobile ? 160 : 220);

      const stageRect = stage.getBoundingClientRect();
      starts = circles.map((el) => {
        const x = stageRect.left + el.offsetLeft + el.offsetWidth / 2;
        const y = stageRect.top + el.offsetTop + el.offsetHeight / 2;
        return {
          x,
          y,
          angle: Math.atan2(y - startCenterY, x - startCenterX),
          radius: Math.hypot(x - startCenterX, y - startCenterY),
        };
      });

      startRadius = (starts.reduce((sum, s) => sum + s.radius, 0) / starts.length) * 1.1;
      baseEndAngle = -Math.PI / 2;

      orbitData.radius = startRadius;
      orbitData.scale = 1;
      orbitData.centerX = startCenterX;
      orbitData.centerY = startCenterY;
    };

    const updateOrbit = () => {
      const t = orbitData.t;

      if (t < 0.001) {
        circles.forEach((circle, i) => {
          gsap.set(circle, { x: 0, y: 0, force3D: true });
          if (orbs[i]) gsap.set(orbs[i], { rotation: 0, scale: 1 });
          if (labels[i]) {
            gsap.set(labels[i], {
              x: 0,
              y: 0,
              xPercent: -50,
              yPercent: -50,
              rotation: 0,
            });
          }
        });
        return;
      }

      const spacingBlend = Math.min(t / spacingBlendDuration, 1);
      const orbitSpin = Math.PI * 2 * orbitTurns * t;
      let firstAngle = 0;

      circles.forEach((circle, i) => {
        const start = starts[i];
        if (!start) return;
        const targetAngle = baseEndAngle + step * i;
        const angle =
          start.angle + shortestDelta(start.angle, targetAngle) * spacingBlend + orbitSpin;
        if (i === 0) firstAngle = angle;
        const radius = lerp(start.radius, orbitData.radius, spacingBlend);

        // Never scale the circle wrapper — that would shrink label offsets too.
        gsap.set(circle, {
          x: orbitData.centerX + Math.cos(angle) * radius - start.x,
          y: orbitData.centerY + Math.sin(angle) * radius - start.y,
          force3D: true,
        });
        if (orbs[i]) {
          gsap.set(orbs[i], {
            rotation: circleSpin[i] * t,
            scale: orbitData.scale,
          });
        }
        if (labels[i]) placeLabel(labels[i], angle, orbitData.scale);
      });

      orbitData.currentAngle = firstAngle;
    };

    const updateLoop = () => {
      const firstAngle = loopData.angle;
      const loopAngleDegrees = (firstAngle * 180) / Math.PI;
      const loopAngleDelta = loopAngleDegrees - loopState.startAngleDegrees;

      circles.forEach((circle, i) => {
        const start = starts[i];
        if (!start) return;
        const angle = firstAngle + step * i;
        const rotation = loopBaseRotation[i] + loopSpin[i] * loopAngleDelta;
        gsap.set(circle, {
          x: viewportCenterX + Math.cos(angle) * orbitRadius - start.x,
          y: viewportCenterY + Math.sin(angle) * orbitRadius - start.y,
          force3D: true,
        });
        if (orbs[i]) gsap.set(orbs[i], { rotation, scale: finalScale });
        if (labels[i]) placeLabel(labels[i], angle, finalScale);
      });
    };

    const ctx = gsap.context(() => {
      measure();
      gsap.set(circles, { x: 0, y: 0, clearProps: 'scale', transformOrigin: '50% 50%' });
      gsap.set(orbs, { rotation: 0, scale: 1, transformOrigin: '50% 50%' });
      gsap.set(labels, { opacity: 0, x: 0, y: 0, xPercent: -50, yPercent: -50 });
      gsap.set(ring, { opacity: 0 });
      gsap.set(center, { opacity: 0 });
      updateOrbit();

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${spacer.offsetHeight}`,
        pin: stage,
        pinSpacing: false,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${spacer.offsetHeight * 1.05}`,
          scrub: isMobile ? 1.35 : 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            measure();
            updateOrbit();
          },
          onLeave: () => {
            orbitData.t = 1;
            orbitData.radius = orbitRadius;
            orbitData.scale = finalScale;
            orbitData.centerX = viewportCenterX;
            orbitData.centerY = viewportCenterY;
            updateOrbit();

            loopBaseRotation.forEach((_, i) => {
              loopBaseRotation[i] = circleSpin[i] * orbitData.t;
            });
            loopState.startAngleDegrees = (orbitData.currentAngle * 180) / Math.PI;
            gsap.set(loopData, { angle: orbitData.currentAngle });
            gsap.killTweensOf(loopData);
            orbitLoop?.invalidate().restart();
          },
          onEnterBack: () => {
            orbitLoop?.pause();
            gsap.killTweensOf(loopData);
            gsap.to(loopData, {
              angle: orbitData.currentAngle,
              duration: 0.3,
              ease: 'power2.out',
              onUpdate: updateLoop,
              onComplete: () => orbitLoop?.pause(0),
            });
          },
          onLeaveBack: () => {
            gsap.set(labels, { opacity: 0 });
            gsap.set(ring, { opacity: 0 });
            gsap.set(center, { opacity: 0 });
          },
          onRefresh: () => {
            measure();
            updateOrbit();
          },
        },
      });

      tl.to(
        copy,
        {
          filter: 'blur(18px)',
          opacity: 0,
          y: isMobile ? 60 : 90,
          duration: 0.22,
          ease: 'power2.inOut',
        },
        0,
      )
        .to(
          orbitData,
          {
            t: 1,
            radius: orbitRadius,
            scale: finalScale,
            centerY: viewportCenterY,
            duration: 1,
            ease: 'power2.inOut',
            onUpdate: updateOrbit,
          },
          0,
        )
        .to(labels, { opacity: 1, duration: 0.12, ease: 'power1.out' }, 0.68)
        .to(ring, { opacity: 1, duration: 0.12, ease: 'power1.out' }, 0.78)
        .to(center, { opacity: 1, duration: 0.12, ease: 'power1.out' }, 0.8);

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${spacer.offsetHeight}`,
        scrub: 1,
        onUpdate: (self) => {
          const fadeStart = 0.84;
          if (self.progress < fadeStart) {
            gsap.set(stage, { opacity: 1 });
            return;
          }
          const raw = (self.progress - fadeStart) / (1 - fadeStart);
          const eased = raw < 1 ? 1 - (1 - raw) ** 1.5 : 1;
          gsap.set(stage, { opacity: 1 - eased * 0.15 });
        },
      });

      orbitLoop = gsap.to(loopData, {
        angle: `+=${Math.PI * 2}`,
        duration: 50,
        repeat: -1,
        ease: 'none',
        paused: true,
        onUpdate: updateLoop,
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const onLenisReady = () => refresh();
    window.addEventListener('lenis-ready', onLenisReady);
    window.addEventListener('resize', refresh);
    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener('lenis-ready', onLenisReady);
      window.removeEventListener('resize', refresh);
      orbitLoop?.kill();
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="intro-process-journey">
      <section
        ref={stageRef}
        className="intro-process-journey__stage"
        aria-label="Intro and design process"
      >
        <div className="intro-process-journey__shapes" aria-hidden={!reduceMotion}>
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`intro-process-journey__circle intro-process-journey__circle--${index}`}
              ref={(el) => {
                circleRefs.current[index] = el;
              }}
            >
              <span
                className="intro-process-journey__orb"
                ref={(el) => {
                  orbRefs.current[index] = el;
                }}
              />
              <span
                className="intro-process-journey__label"
                ref={(el) => {
                  labelRefs.current[index] = el;
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div ref={ringRef} className="intro-process-journey__ring" aria-hidden />

        <div ref={centerRef} className="intro-process-journey__center">
          <h2 id="process-orbit-title" className="intro-process-journey__title">
            <span className="intro-process-journey__title-line">{line1}</span>
            {line2 ? <span className="intro-process-journey__title-line">{line2}</span> : null}
          </h2>
        </div>

        <div ref={copyRef} className="intro-process-journey__copy">
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

          <p className="intro-statement__body">
            I specialize in designing user-centered interfaces, scalable design systems, and
            immersive saas web experiences that combine aesthetics with usability.
          </p>

          <MagneticButton
            href={ctaHref}
            className="intro-statement__cta interactive-cursor"
            aria-label={ctaLabel}
          >
            <span className="intro-statement__cta-label">{ctaLabel}</span>
            <span className="intro-statement__cta-icon" aria-hidden>
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          </MagneticButton>
        </div>
      </section>

      <div ref={spacerRef} className="intro-process-journey__spacer" aria-hidden />
    </div>
  );
}
