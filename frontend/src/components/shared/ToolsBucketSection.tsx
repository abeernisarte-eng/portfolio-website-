'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Tool = {
  id: string;
  name: string;
  icon: React.ReactNode;
  left: number;
  top: number;
  rotate: number;
};

const TOOLS: Tool[] = [
  {
    id: 'figma',
    name: 'Figma',
    left: 38,
    top: 36,
    rotate: -12,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <path fill="#F24E1E" d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" />
        <path fill="#A259FF" d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" />
        <path fill="#1ABCFE" d="M12 4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V4z" />
        <path fill="#0ACF83" d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" />
        <path fill="#FF7262" d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" />
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    left: 60,
    top: 37,
    rotate: 6,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <rect width="24" height="24" rx="5" fill="#001E36" />
        <text x="5" y="17" fill="#31A8FF" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">
          Ps
        </text>
      </svg>
    ),
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    left: 77,
    top: 31,
    rotate: 14,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <rect width="24" height="24" rx="5" fill="#330000" />
        <text x="5.5" y="17" fill="#FF9A00" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">
          Ai
        </text>
      </svg>
    ),
  },
  {
    id: 'cursor',
    name: 'Cursor',
    left: 23,
    top: 43,
    rotate: -8,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <rect width="24" height="24" rx="5" fill="#111" />
        <path fill="#fff" d="M7 4l10 6.5-4.2 1.2L15.5 20 12 12.8 7 16.2V4z" />
      </svg>
    ),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    left: 72,
    top: 50,
    rotate: -16,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <rect width="24" height="24" rx="5" fill="#1a080e" />
        <circle cx="12" cy="12" r="6.5" fill="none" stroke="#ae0c40" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.2" fill="#ae0c40" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#ae0c40" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'vscode',
    name: 'VS Code',
    left: 17,
    top: 60,
    rotate: 12,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <path
          fill="#007ACC"
          d="M17.8 2.2 9.4 9.3 4.8 5.9 2 7.3v9.4l2.8 1.4 4.6-3.4 8.4 7.1L22 19.7V4.3L17.8 2.2zm0 4.3v11l-6.2-5.2 6.2-5.8z"
        />
      </svg>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    left: 49,
    top: 51,
    rotate: 10,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#00C4CC" />
        <path
          fill="#fff"
          d="M9.2 15.8c-1.8 0-3.1-1.4-3.1-3.5S7.4 8.8 9.4 8.8c.9 0 1.6.3 2.1.8l-.8 1.1c-.3-.3-.7-.5-1.2-.5-1.1 0-1.8.9-1.8 2.1s.7 2.1 1.8 2.1c.7 0 1.2-.3 1.6-.8l1 .9c-.6.8-1.5 1.3-2.9 1.3zm5.1-.1c-1.9 0-3.2-1.4-3.2-3.5s1.4-3.5 3.3-3.5 3.2 1.4 3.2 3.5-1.3 3.5-3.3 3.5zm0-1.4c1 0 1.6-.9 1.6-2.1s-.6-2.1-1.6-2.1-1.6.9-1.6 2.1.6 2.1 1.6 2.1z"
        />
      </svg>
    ),
  },
  {
    id: 'lovable',
    name: 'Lovable',
    left: 30,
    top: 56,
    rotate: -6,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <rect width="24" height="24" rx="5" fill="#1a0a10" />
        <path
          fill="#FF6B8A"
          d="M12 19s-6.2-3.8-6.2-8.1C5.8 8.4 7.5 7 9.2 7c1.1 0 2 .5 2.8 1.5C12.8 7.5 13.7 7 14.8 7c1.7 0 3.4 1.4 3.4 3.9C18.2 15.2 12 19 12 19z"
        />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    left: 64,
    top: 59,
    rotate: 8,
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <rect width="24" height="24" rx="5" fill="#1c1410" />
        <path
          fill="#D97757"
          d="M12.8 4.2 8.3 19.8h-2.6L10.4 4.2h2.4zm3.5 0 4.5 15.6h-2.6l-1.1-4H13l-1.1 4H9.4L13.9 4.2h2.4zm.2 9.2-1.5-5.4-1.5 5.4h3z"
        />
      </svg>
    ),
  },
];

export default function ToolsBucketSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<(HTMLDivElement | null)[]>([]);
  const nestRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const bucket = bucketRef.current;
    if (!section || !stage || !bucket) return;

    const flyCards = flyRef.current.filter(Boolean) as HTMLDivElement[];
    const nestCards = nestRef.current.filter(Boolean) as HTMLDivElement[];
    if (flyCards.length !== TOOLS.length || nestCards.length !== TOOLS.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layoutFly = () => {
      flyCards.forEach((card, i) => {
        const tool = TOOLS[i];
        gsap.set(card, {
          left: `${tool.left}%`,
          top: `${tool.top}%`,
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotate: tool.rotate,
          scale: reduceMotion ? 0 : 0.92,
          opacity: reduceMotion ? 0 : 0,
          zIndex: 6 + i,
        });
      });
    };

    layoutFly();
    gsap.set(nestCards, { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16, scale: 0.9 });

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const mouthFor = (index: number) => {
        const stageBox = stage.getBoundingClientRect();
        const bucketBox = bucket.getBoundingClientRect();
        const x = bucketBox.left + bucketBox.width / 2 - stageBox.left + ((index % 3) - 1) * 22;
        const y = bucketBox.top + bucketBox.height * 0.12 - stageBox.top;
        return { x, y };
      };

      const originFor = (index: number) => ({
        x: (TOOLS[index].left / 100) * stage.offsetWidth,
        y: (TOOLS[index].top / 100) * stage.offsetHeight,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1) Reveal spread tools
      tl.to(
        flyCards,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0,
      );

      tl.to({}, { duration: 0.5 }, 0.55);

      // 2) Dive toward bucket mouth
      flyCards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: () => mouthFor(i).x - originFor(i).x,
            y: () => mouthFor(i).y - originFor(i).y,
            rotate: (i % 2 === 0 ? -1 : 1) * 10,
            scale: 0.55,
            duration: 1.05,
            ease: 'power2.inOut',
          },
          0.9 + i * 0.06,
        );
      });

      // 3) Disappear into bucket + show neat nested grid
      tl.to(
        flyCards,
        {
          opacity: 0,
          scale: 0.35,
          y: '+=48',
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.in',
        },
        1.85,
      );

      tl.to(
        bucket,
        {
          scale: 1.05,
          duration: 0.28,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        },
        1.9,
      );

      tl.to(
        nestCards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.04,
          ease: 'power2.out',
        },
        2.05,
      );
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
  }, []);

  return (
    <section ref={sectionRef} className="tools-bucket" aria-labelledby="tools-bucket-heading">
      <div className="tools-bucket__pin">
        <div className="tools-bucket__copy">
          <p className="tools-bucket__eyebrow">Toolkit</p>
          <h2 id="tools-bucket-heading" className="tools-bucket__heading">
            Tools I craft with
          </h2>
          <p className="tools-bucket__intro">
            Design, AI, and build tools that drop into every project as you scroll.
          </p>
        </div>

        <div ref={stageRef} className="tools-bucket__stage">
          <svg className="tools-bucket__paths" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path d="M12 8 C 22 33, 38 54, 50 67" />
            <path d="M36 4 C 40 28, 45 52, 50 67" />
            <path d="M50 2 C 50 26, 50 51, 50 67" />
            <path d="M64 4 C 60 28, 55 52, 50 67" />
            <path d="M88 8 C 78 33, 62 54, 50 67" />
            <path d="M8 32 C 22 46, 38 58, 50 67" />
            <path d="M92 32 C 78 46, 62 58, 50 67" />
          </svg>

          {TOOLS.map((tool, index) => (
            <div
              key={`fly-${tool.id}`}
              className="tools-bucket__card tools-bucket__card--fly"
              ref={(el) => {
                flyRef.current[index] = el;
              }}
              title={tool.name}
              style={{ left: `${tool.left}%`, top: `${tool.top}%` }}
            >
              <span className="tools-bucket__card-icon">{tool.icon}</span>
              <span className="tools-bucket__card-name">{tool.name}</span>
            </div>
          ))}

          <div ref={bucketRef} className="tools-bucket__bucket">
            <div className="tools-bucket__bucket-lip" aria-hidden />
            <div className="tools-bucket__bucket-body">
              <div className="tools-bucket__nest" aria-hidden>
                {TOOLS.map((tool, index) => (
                  <div
                    key={`nest-${tool.id}`}
                    className="tools-bucket__card tools-bucket__card--nest"
                    ref={(el) => {
                      nestRef.current[index] = el;
                    }}
                    title={tool.name}
                  >
                    <span className="tools-bucket__card-icon">{tool.icon}</span>
                  </div>
                ))}
              </div>
              <span className="tools-bucket__bucket-label">My Toolkit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
