'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { fallbackData } from '@/services/apiService';
import FadeIn from '@/components/ui/FadeIn';
import HeroSection from '@/components/shared/HeroSection';
import JourneySection from '@/components/shared/JourneySection';
import IntroStatementSection from '@/components/shared/IntroStatementSection';
import FeaturedProjectsStack from '@/components/shared/FeaturedProjectsStack';
import TestimonialsStack from '@/components/shared/TestimonialsStack';
import { useCms } from '@/context/CmsContext';
import { cmsDefaults } from '@/lib/cmsDefaults';
import { normalizeHeroSettings } from '@/lib/heroContent';
import { resolveImageUrl, DEFAULT_CONTACT_CTA_BACKGROUND } from '@/lib/resolveImageUrl';
import { resolveResumeUrl } from '@/lib/resume';

const ease = [0.16, 1, 0.3, 1] as const;

const DEFAULT_FAQS = [
  { question: 'What services do you offer?', answer: 'I offer UI/UX design, web and mobile interface design, prototyping in Figma, design systems, and branding support for digital products.' },
  { question: 'How does the design process work?', answer: 'We start with discovery and research, move into wireframes and user flows, then create high-fidelity prototypes with revisions before developer handoff.' },
  { question: 'How long does a project usually take?', answer: 'A landing page takes 1–2 weeks. A full application design with research and prototypes typically takes 4–6 weeks depending on scope.' },
  { question: 'What do I need to provide before starting?', answer: 'Share your goals, target audience, brand assets if available, and any reference sites or competitors you admire.' },
  { question: 'Do you offer revisions?', answer: 'Yes. Each project includes structured revision rounds at wireframe and high-fidelity stages to ensure alignment before final delivery.' },
  { question: 'How do I get started?', answer: 'Send a message through the contact form with your project details, timeline, and budget range. I will respond within 24–48 hours.' },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  x: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.527-8.603L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  behance: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6.5 10.5c1.4 0 2.3-.7 2.3-1.8 0-1.1-.8-1.7-2.1-1.7H3.8v3.5H6.5zm-2.7 5.3h2.9c1.5 0 2.5-.7 2.5-2s-1-2-2.5-2H3.8v4zm10.4-2.1c.1 1.2.8 1.8 1.9 1.8.9 0 1.5-.4 1.7-1.1h2c-.3 1.9-1.9 3.1-3.8 3.1-2.5 0-4.2-1.8-4.2-4.3s1.7-4.3 4.1-4.3c2.4 0 3.9 1.8 3.9 4.4v.4h-5.6zm2.4-5.2h4.1V7.1H13.8v1.4zm-2.2 3.4h3.3c-.1-1-.8-1.6-1.7-1.6-.9 0-1.5.6-1.6 1.6zM8.5 15.3H6.5v.1h2z" />
    </svg>
  ),
  dribbble: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.61 5.67a8 8 0 0 1 1.28 4.48c-.45-.1-5-.95-7.56-.41-.08-.18-.16-.37-.24-.56a22 22 0 0 0-.54-1.1c2.74-1.12 5.04-2.86 7.06-2.41zM12 3.9c1.83 0 3.5.66 4.8 1.75-1.76.55-3.75 2.1-6.22 3.17A36 36 0 0 0 7.4 4.78 8.05 8.05 0 0 1 12 3.9zM5.6 6.1c.84.98 2.65 3.17 4.2 6.07-3.15.92-8.45 1.05-8.54 1.05A8.07 8.07 0 0 1 5.6 6.1zM3.92 14.6s4.97-.1 8.03-1.2c.22.58.44 1.17.63 1.76-.03 0-6.25 2.12-8.66 5.51A8.06 8.06 0 0 1 3.92 14.6zm5.18 6.36c1.6-2.77 3.66-4.55 4.6-5.2a27 27 0 0 1 2.88 7.14 8 8 0 0 1-7.48-1.94zm8.86-.1a26 26 0 0 0-2.62-6.73c1.86-.3 4.65.16 5.93.64a8.08 8.08 0 0 1-3.31 6.09z" />
    </svg>
  ),
};

export default function Home() {
  const { cms, loading, getContent } = useCms();
  const settings = cms.settings as Record<string, string>;
  const about = getContent<typeof cmsDefaults.content['home.about']>('home.about');
  const featured = getContent<typeof cmsDefaults.content['home.featuredProjects']>('home.featuredProjects');
  const testimonialsSection = getContent<typeof cmsDefaults.content['home.testimonials']>('home.testimonials');
  const faqSection = getContent<{ heading?: string; intro?: string; items?: { question: string; answer: string }[] }>('home.faq');
  const contactCta = getContent<typeof cmsDefaults.content['home.contactCta']>('home.contactCta');

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const aboutPortrait =
    resolveImageUrl(about.portraitImage) || '/images/about/portrait.jpg';
  const aboutBioParagraphs = Array.isArray(about.bio)
    ? about.bio.filter(Boolean)
    : String(about.bio || '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  const featuredProjects = (cms.projects as typeof fallbackData.projects).filter((p) => p.featured).slice(0, 4);
  const displayProjects = loading ? fallbackData.projects.filter((p) => p.featured).slice(0, 4) : featuredProjects.length ? featuredProjects : fallbackData.projects.filter((p) => p.featured).slice(0, 4);

  const displayTestimonials = loading
    ? fallbackData.testimonials
    : (cms.testimonials as typeof fallbackData.testimonials).length
      ? (cms.testimonials as typeof fallbackData.testimonials)
      : fallbackData.testimonials;

  const faqs = faqSection.items?.length ? faqSection.items : DEFAULT_FAQS;
  const socialLinks = (Array.isArray(cms.settings.socialLinks) ? cms.settings.socialLinks : cmsDefaults.settings.socialLinks) as { platform: string; url: string }[];
  const stats = about.stats?.length ? about.stats : [
    { value: '2+', label: 'Years of Experience' },
    { value: String(displayProjects.length || 4), label: 'Completed Projects' },
    { value: `${Math.max(displayTestimonials.length, 5)}+`, label: 'Clients Worldwide' },
  ];

  const hero = normalizeHeroSettings(settings);

  return (
    <div className="landing-page lab-landing theme-transition">
      <HeroSection
        eyebrow={hero.heroEyebrow as string || 'UI/UX DESIGNER • PRODUCT DESIGNER'}
        title={(hero.heroTitle as string) || cmsDefaults.settings.heroTitle}
        subtitle={(hero.heroSubtitle as string) || cmsDefaults.settings.heroSubtitle}
        ctaLabel={(hero.heroCtaLabel as string) || 'View My Work'}
        ctaHref={(hero.heroCtaHref as string) || '/projects'}
        secondaryCtaLabel={(hero.heroSecondaryCtaLabel as string) || 'Download Resume'}
        secondaryCtaHref={resolveResumeUrl(settings.resumeUrl as string)}
        brandName={settings.brandName as string || cmsDefaults.settings.brandName}
        stats={stats}
      />

      <JourneySection>
        <IntroStatementSection
          brandName={(settings.brandName as string) || cmsDefaults.settings.brandName}
          ctaLabel={about.ctaLabel === 'My Story' ? 'About me' : about.ctaLabel || 'About me'}
          ctaHref={about.ctaHref || '/about'}
        />
      </JourneySection>

      {/* About */}
      <JourneySection>
      <section
        className="lab-flow-section px-6 py-20 theme-transition sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <FadeIn delay={0.15} className="flex justify-center lg:justify-start">
            <div className="about-home-image-wrap">
              <div className="about-home-image-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aboutPortrait}
                  alt={settings.brandName || 'Portrait'}
                  width={640}
                  height={800}
                  className="about-home-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <h2 className="about-home-heading">{about.heading || 'About me'}</h2>
              {aboutBioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`about-home-bio${index > 0 ? ' about-home-bio--follow' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="about-home-stats">
                {stats.map((stat) => (
                  <motion.div key={stat.label} whileHover={{ y: -3 }} transition={{ duration: 0.3 }} className="about-home-stat">
                    <p className="about-home-stat-value">{stat.value}</p>
                    <p className="about-home-stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="about-home-contact">
                <div>
                  <p className="about-home-contact-label">Email :</p>
                  <a href={`mailto:${settings.contactEmail}`} className="about-home-contact-value interactive-cursor">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="about-home-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-home-social interactive-cursor"
                    aria-label={social.platform}
                  >
                    {SOCIAL_ICONS[social.platform] || SOCIAL_ICONS.x}
                  </a>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link href={about.ctaHref || '/about'} className="about-home-cta interactive-cursor">
                {about.ctaLabel || 'My Story'}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
      </JourneySection>

      <JourneySection>
        <FeaturedProjectsStack
          projects={displayProjects}
          title={featured.title}
          intro={featured.intro}
          browseAllLabel={featured.browseAllLabel}
        />
      </JourneySection>

      {displayTestimonials.length > 0 && (
        <JourneySection>
        <section className="lab-flow-section px-6 py-20 theme-transition sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 className="brand-heading mb-4">{testimonialsSection.heading}</h2>
              <p className="mb-16 max-w-2xl text-[var(--muted-foreground)]">{testimonialsSection.intro}</p>
            </FadeIn>
            <div className="testimonials-section-layout">
              <FadeIn>
                <TestimonialsStack testimonials={displayTestimonials} />
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="testimonials-stats-row theme-transition">
                  <div className="testimonials-stats-main">
                    <p className="text-sm opacity-60">{testimonialsSection.statCard?.prefix || "I've worked with"}</p>
                    <p className="portavia-stat mt-1">{displayTestimonials.length}+</p>
                    <p className="text-sm opacity-60">{testimonialsSection.statCard?.suffix || 'happy clients'}</p>
                  </div>
                  <div className="testimonials-stats-metrics">
                    {(testimonialsSection.statCard?.metrics || [
                      { value: '100%', label: 'Satisfaction Rate' },
                      { value: '2x', label: 'Faster Delivery' },
                    ]).map((m) => (
                      <div key={m.label} className="testimonials-stats-metric">
                        <p className="text-2xl font-semibold sm:text-3xl">{m.value}</p>
                        <p className="mt-1 text-xs opacity-50">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        </JourneySection>
      )}

      <JourneySection>
      <section className="lab-flow-section px-6 py-20 theme-transition sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <h2 className="brand-heading mb-4">{faqSection.heading || 'Frequently Asked Questions'}</h2>
            <p className="mb-12 text-[var(--muted-foreground)]">{faqSection.intro}</p>
          </FadeIn>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] lab-glass-panel">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="interactive-cursor flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:opacity-80">
                  <span className="font-medium">{idx + 1}. {faq.question}</span>
                  <motion.span animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openFaq === idx ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                      <p className="pb-6 text-sm leading-relaxed text-[var(--muted-foreground)]">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      </JourneySection>

      <JourneySection>
      <section className="lab-flow-section relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={resolveImageUrl(contactCta.backgroundImage) || DEFAULT_CONTACT_CTA_BACKGROUND}
            alt=""
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]/88" />
        </div>
        <div className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm text-[var(--muted-foreground)]">{contactCta.greeting}</p>
            <h2 className="portavia-hero-word mb-8 !text-[clamp(2.5rem,8vw,5rem)]">{contactCta.heading}</h2>
            <p className="mx-auto mb-10 max-w-lg text-[var(--muted-foreground)]">{contactCta.body}</p>
            <Link href={contactCta.ctaHref || '/contact'} className="btn-primary interactive-cursor px-10 py-4 text-sm">
              {contactCta.ctaLabel} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
      </JourneySection>
    </div>
  );
}
