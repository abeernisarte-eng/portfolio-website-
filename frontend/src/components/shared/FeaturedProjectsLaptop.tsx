'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  images?: string[];
};

type FeaturedProjectsLaptopProps = {
  projects: Project[];
  title?: string;
  intro?: string;
  browseAllLabel?: string;
};

function padIndex(n: number) {
  return String(n).padStart(2, '0');
}

export default function FeaturedProjectsLaptop({
  projects,
  title = 'Featured Projects',
  intro,
  browseAllLabel = 'View All Projects',
}: FeaturedProjectsLaptopProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const screenGlowRef = useRef<HTMLDivElement>(null);
  const screenPowerRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const items = projects.slice(0, 4);
  const projectKey = items.map((p) => p.id).join('|');

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const rig = rigRef.current;
    const lid = lidRef.current;
    const screenGlow = screenGlowRef.current;
    const screenPower = screenPowerRef.current;
    const reflection = reflectionRef.current;
    const shadow = shadowRef.current;
    const bloom = bloomRef.current;
    const caption = captionRef.current;
    const meta = metaRef.current;
    const cta = ctaRef.current;
    const progressEl = progressRef.current;
    if (!section || !rig || !lid || !items.length) return;

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    const images = imagesRef.current.filter(Boolean) as HTMLImageElement[];
    if (slides.length !== items.length) return;

    if (reducedMotion) {
      gsap.set(rig, { y: 0, opacity: 1, rotateX: 52, rotateY: 0, rotateZ: 0, scale: 1 });
      gsap.set(lid, { rotateX: -12 });
      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });
      gsap.set([caption, meta, cta, header], { opacity: 1, y: 0, filter: 'none' });
      gsap.set([screenGlow, screenPower], { opacity: 1 });
      gsap.set([shadow, reflection, bloom], { opacity: 0.7 });
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const scrollLength = Math.round(
      window.innerHeight * (isMobile ? 3.4 : 4.6) + items.length * window.innerHeight * 0.85,
    );

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(rig, {
        y: isMobile ? 320 : 480,
        opacity: 0,
        scale: 0.78,
        rotateX: 78,
        rotateY: 0,
        rotateZ: 0,
        transformOrigin: '50% 72%',
      });
      gsap.set(lid, { rotateX: 88, transformOrigin: '50% 100%' });
      gsap.set(slides, { opacity: 0, scale: 1.08, y: 18, filter: 'blur(10px)' });
      gsap.set(images, { scale: 1.12, yPercent: 4 });
      gsap.set(caption, { opacity: 0, y: 28, filter: 'blur(10px)' });
      gsap.set(meta, { opacity: 0, y: 16 });
      gsap.set(cta, { opacity: 0, y: 48, scale: 0.92, pointerEvents: 'none' });
      gsap.set(screenGlow, { opacity: 0 });
      gsap.set(screenPower, { opacity: 0 });
      gsap.set(reflection, { opacity: 0, scaleY: 0.35 });
      gsap.set(shadow, { opacity: 0, scaleX: 0.55 });
      gsap.set(bloom, { opacity: 0, scale: 0.75 });
      if (progressEl) gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollLength}`,
          pin: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressEl) gsap.set(progressEl, { scaleX: self.progress });
          },
        },
      });

      // 1) Product rises into frame — closed, heavy, cinematic
      tl.to(
        rig,
        {
          y: isMobile ? 40 : 60,
          opacity: 1,
          scale: 0.94,
          rotateX: 68,
          duration: 1.2,
          ease: 'power3.out',
        },
        0,
      );
      tl.to(shadow, { opacity: 0.55, scaleX: 0.85, duration: 1, ease: 'power2.out' }, 0.1);
      tl.to(bloom, { opacity: 0.35, scale: 0.9, duration: 1.1, ease: 'power2.out' }, 0.15);
      tl.to(header, { opacity: 0.22, y: -22, duration: 0.9, ease: 'power2.inOut' }, 0.3);

      // 2) Lid opens + camera settles to Apple product angle
      tl.to(
        lid,
        {
          rotateX: -14,
          duration: 1.55,
          ease: 'power2.inOut',
        },
        0.95,
      );
      tl.to(
        rig,
        {
          y: 0,
          scale: 1,
          rotateX: 52,
          rotateY: 0,
          rotateZ: 0,
          duration: 1.55,
          ease: 'power2.inOut',
        },
        0.95,
      );
      tl.to(shadow, { opacity: 0.95, scaleX: 1, duration: 1.2, ease: 'power2.out' }, 1.1);
      tl.to(reflection, { opacity: 0.55, scaleY: 1, duration: 1.25, ease: 'power2.out' }, 1.2);
      tl.to(bloom, { opacity: 0.7, scale: 1, duration: 1.1, ease: 'power2.out' }, 1.25);

      // Screen powers on
      tl.to(screenPower, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 1.85);
      tl.to(screenGlow, { opacity: 0.9, duration: 0.7, ease: 'power2.out' }, 1.95);

      // 3) Meta + first caption
      tl.to(meta, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 2.15);
      tl.to(
        caption,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          ease: 'power3.out',
        },
        2.25,
      );

      // 4) Project reel — filmic transitions + Ken Burns
      const slideStart = 2.55;
      const slideDur = 1.35;
      const slideGap = 0.12;

      items.forEach((_, index) => {
        const start = slideStart + index * (slideDur + slideGap);
        const slide = slides[index];
        const image = images[index];
        const prev = index > 0 ? slides[index - 1] : null;
        const prevImage = index > 0 ? images[index - 1] : null;

        tl.call(() => setActiveIndex(index), undefined, start);

        if (prev) {
          tl.to(
            prev,
            {
              opacity: 0,
              scale: 1.06,
              y: -12,
              filter: 'blur(8px)',
              duration: 0.7,
              ease: 'power2.inOut',
            },
            start,
          );
          if (prevImage) {
            tl.to(prevImage, { scale: 1.18, yPercent: -3, duration: 0.7, ease: 'power1.in' }, start);
          }
        }

        tl.fromTo(
          slide,
          {
            opacity: 0,
            scale: 1.04,
            y: 20,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
          },
          start + 0.04,
        );

        if (image) {
          tl.fromTo(
            image,
            { scale: 1.14, yPercent: index % 2 === 0 ? 5 : -4 },
            { scale: 1.02, yPercent: index % 2 === 0 ? -2 : 2, duration: slideDur, ease: 'none' },
            start,
          );
        }

        // Soft screen breathing
        tl.to(
          screenGlow,
          {
            opacity: 0.72 + (index % 2) * 0.18,
            duration: 0.5,
            ease: 'sine.inOut',
          },
          start,
        );

        // Caption pulse on change
        if (index > 0) {
          tl.to(
            caption,
            {
              opacity: 0,
              y: 14,
              filter: 'blur(8px)',
              duration: 0.28,
              ease: 'power2.in',
            },
            start,
          );
          tl.to(
            caption,
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.45,
              ease: 'power3.out',
            },
            start + 0.28,
          );
        }

        tl.to({}, { duration: Math.max(slideDur - 0.55, 0.4) }, start + 0.5);
      });

      // 5) Finale — laptop settles, CTA arrives
      const ctaAt = slideStart + items.length * (slideDur + slideGap) + 0.05;
      tl.to(
        caption,
        {
          opacity: 0.18,
          y: -10,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        ctaAt,
      );
      tl.to(
        meta,
        {
          opacity: 0.35,
          duration: 0.35,
          ease: 'power2.out',
        },
        ctaAt,
      );
      tl.to(
        cta,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out',
          onStart: () => {
            if (cta) cta.style.pointerEvents = 'auto';
          },
          onReverseComplete: () => {
            if (cta) cta.style.pointerEvents = 'none';
          },
        },
        ctaAt + 0.08,
      );
      tl.to(
        rig,
        {
          scale: 0.94,
          rotateX: 48,
          y: -28,
          duration: 0.8,
          ease: 'power2.out',
        },
        ctaAt,
      );
      tl.to(header, { opacity: 0.5, y: -10, duration: 0.5, ease: 'power2.out' }, ctaAt);
      tl.to(bloom, { opacity: 0.9, duration: 0.55, ease: 'power1.out' }, ctaAt + 0.1);
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('lenis-ready', refresh);
    window.addEventListener('resize', refresh);
    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener('lenis-ready', refresh);
      window.removeEventListener('resize', refresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- projectKey tracks identity
  }, [projectKey, reducedMotion]);

  if (!items.length) return null;

  const active = items[activeIndex] ?? items[0];

  return (
    <section
      ref={sectionRef}
      className="featured-laptop"
      aria-labelledby="featured-laptop-heading"
    >
      <div className="featured-laptop__pin">
        <div className="featured-laptop__atmosphere" aria-hidden>
          <span className="featured-laptop__studio" />
          <span className="featured-laptop__grid" />
          <span className="featured-laptop__vignette" />
        </div>

        <div ref={headerRef} className="featured-laptop__header">
          <p className="featured-laptop__eyebrow">Selected work</p>
          <h2 id="featured-laptop-heading" className="featured-laptop__heading">
            {title}
          </h2>
          {intro ? <p className="featured-laptop__intro">{intro}</p> : null}
        </div>

        <div className="featured-laptop__stage">
          <div ref={bloomRef} className="featured-laptop__bloom" aria-hidden />
          <div ref={shadowRef} className="featured-laptop__shadow" aria-hidden />

          <div ref={rigRef} className="featured-laptop__rig">
            <div className="featured-laptop__device">
              {/* Lid */}
              <div ref={lidRef} className="featured-laptop__lid">
                <div className="featured-laptop__lid-back" aria-hidden>
                  <span className="featured-laptop__mark">A</span>
                </div>
                <div className="featured-laptop__lid-front">
                  <div className="featured-laptop__bezel">
                    <div className="featured-laptop__camera" aria-hidden>
                      <span />
                    </div>
                    <div className="featured-laptop__screen">
                      <div ref={screenPowerRef} className="featured-laptop__screen-power" aria-hidden />
                      <div ref={screenGlowRef} className="featured-laptop__screen-glow" aria-hidden />
                      {items.map((project, index) => {
                        const imageSrc =
                          resolveImageUrl(project.images?.[0]) ||
                          '/images/projects/protego-os.jpg';
                        return (
                          <div
                            key={project.id}
                            className="featured-laptop__slide"
                            ref={(el) => {
                              slidesRef.current[index] = el;
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              ref={(el) => {
                                imagesRef.current[index] = el;
                              }}
                              src={imageSrc}
                              alt={project.title}
                              className="featured-laptop__slide-image"
                              loading={index === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </div>
                        );
                      })}
                      <div className="featured-laptop__glass" aria-hidden />
                      <div className="featured-laptop__screen-edge" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>

              <div className="featured-laptop__hinge" aria-hidden>
                <span />
                <span />
              </div>

              {/* Base */}
              <div className="featured-laptop__base">
                <div className="featured-laptop__deck">
                  <div className="featured-laptop__keyboard" aria-hidden>
                    {Array.from({ length: 56 }, (_, i) => (
                      <span key={i} className="featured-laptop__key" />
                    ))}
                  </div>
                  <div className="featured-laptop__trackpad" aria-hidden />
                </div>
                <div className="featured-laptop__front-lip" aria-hidden />
                <div className="featured-laptop__underside" aria-hidden />
              </div>
            </div>
          </div>

          <div ref={reflectionRef} className="featured-laptop__reflection" aria-hidden />
        </div>

        <div ref={metaRef} className="featured-laptop__meta">
          <span className="featured-laptop__index">
            {padIndex(activeIndex + 1)}
            <span className="featured-laptop__index-sep">/</span>
            {padIndex(items.length)}
          </span>
          <div className="featured-laptop__dots" aria-hidden>
            {items.map((project, index) => (
              <span
                key={project.id}
                className={`featured-laptop__dot${index === activeIndex ? ' is-active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div ref={captionRef} className="featured-laptop__caption">
          {active.category ? (
            <span className="featured-laptop__badge">{active.category}</span>
          ) : null}
          <h3 className="featured-laptop__title">{active.title}</h3>
          {active.description ? (
            <p className="featured-laptop__desc">{active.description}</p>
          ) : null}
          <Link
            href={`/projects/${active.id}`}
            className="featured-laptop__case interactive-cursor"
          >
            View case study
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </Link>
        </div>

        <div ref={ctaRef} className="featured-laptop__cta-wrap">
          <Link href="/projects" className="featured-laptop__cta interactive-cursor">
            <span className="featured-laptop__cta-glow" aria-hidden />
            <span>{browseAllLabel}</span>
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
          </Link>
        </div>

        <div className="featured-laptop__progress" aria-hidden>
          <div ref={progressRef} className="featured-laptop__progress-bar" />
        </div>
      </div>
    </section>
  );
}
