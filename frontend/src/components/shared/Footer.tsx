'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { useCms } from '@/context/CmsContext';
import { cmsDefaults } from '@/lib/cmsDefaults';

const defaultFooterLinks = cmsDefaults.settings.footerLinks as { name: string; path: string }[];
const defaultSocial = cmsDefaults.settings.socialLinks as { platform: string; url: string }[];

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p.includes('insta')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (p.includes('behan')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        <path d="M8.2 6.4c1.7 0 3 .5 3.9 1.5.7.8 1.1 1.9 1.1 3.2 0 1.2-.3 2.1-.9 2.8.9.5 1.5 1.2 1.9 2.1.4.9.6 1.9.6 2.9 0 1.5-.4 2.8-1.3 3.8-.9 1-2.3 1.5-4.2 1.5H3.5V6.4h4.7zm-.4 5.8h1.7c.7 0 1.2-.2 1.6-.5.4-.3.5-.8.5-1.4 0-.7-.2-1.2-.6-1.5-.4-.3-.9-.5-1.6-.5H7.8v3.9zm.2 6.6h1.9c.8 0 1.4-.2 1.9-.6.5-.4.7-1 .7-1.8 0-.8-.2-1.4-.7-1.8-.5-.4-1.1-.6-1.9-.6H8v4.8zM20.2 11.3c1 .4 1.7 1 2.2 1.9.5.9.7 1.9.7 3.1 0 1.4-.3 2.6-1 3.6-.7 1-1.8 1.6-3.3 1.8l.1 1.5h-2.3l-.2-1.3c-.5.1-1 .1-1.5.1h-3.3v-2h.5c.5 0 .8-.1 1-.4.1-.2.2-.6.2-1.2V8.4c0-.5-.1-.8-.2-1-.2-.2-.5-.3-1-.3h-.5V5.2h3.5c1.2 0 2.1.1 2.8.4.9.3 1.6.8 2.1 1.5.5.7.8 1.5.8 2.5 0 .9-.2 1.6-.6 2.2-.3.5-.8.9-1.5 1.1zm-2.6 6.5c.7-.2 1.2-.6 1.5-1.2.3-.6.5-1.3.5-2.1 0-.9-.2-1.6-.5-2.1-.3-.5-.8-.8-1.5-.9v6.3zm.1-7.8c.6-.2 1-.5 1.3-1 .3-.5.4-1 .4-1.7 0-.7-.1-1.2-.4-1.6-.3-.4-.7-.7-1.3-.8v5.1z" />
      </svg>
    );
  }
  if (p.includes('dribb')) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M5 9.5c3.5 0 8.5-.5 13.5-3.5M4.5 13.5c2.8.8 5.2.9 8.5.3 3.2-.6 6.2-1.9 8-3.3M8 19.5c1.8-3.2 3.7-6.4 8.8-9.5" />
      </svg>
    );
  }
  // X / twitter default
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.935L2.25 2.25h5.908l4.26 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export default function Footer() {
  const { cms, getContent } = useCms();
  const settings = cms.settings as Record<string, string>;
  const contactCta = getContent<typeof cmsDefaults.content['home.contactCta']>('home.contactCta');

  const footerLinks = (Array.isArray(cms.settings.footerLinks) && cms.settings.footerLinks.length
    ? cms.settings.footerLinks
    : defaultFooterLinks) as { name: string; path: string }[];

  const socialLinks = (Array.isArray(cms.settings.socialLinks) && cms.settings.socialLinks.length
    ? cms.settings.socialLinks
    : defaultSocial) as { platform: string; url: string }[];

  const brandName = settings.brandName || 'Abeer Nisar';
  const contactEmail = settings.contactEmail || 'abeernisar11@gmail.com';
  const copyright = settings.copyrightText || `${new Date().getFullYear()} ${brandName}`;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent('Project inquiry from portfolio');
    const body = encodeURIComponent(`Hi Abeer,\n\nI'd like to talk about a project.\n\nFrom: ${trimmed}\n`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__atmosphere" aria-hidden>
        <span className="site-footer__orb site-footer__orb--a" />
        <span className="site-footer__orb site-footer__orb--b" />
        <span className="site-footer__orb site-footer__orb--c" />
        <span className="site-footer__ribbon site-footer__ribbon--a" />
        <span className="site-footer__ribbon site-footer__ribbon--b" />
        <span className="site-footer__grain" />
      </div>

      <div className="site-footer__inner">
        <FadeIn>
          <div className="site-footer__badge">
            <Sparkles size={13} strokeWidth={2} aria-hidden />
            <span>Available for work</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="site-footer__headline">{contactCta.heading || "Let's work together"}</h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="site-footer__card">
            <h3 className="site-footer__card-title">
              {contactCta.greeting === 'Hi' ? 'Start a conversation' : contactCta.greeting || 'Start a conversation'}
            </h3>
            <p className="site-footer__card-body">
              {contactCta.body ||
                "Let's build something impactful together — whether it's your brand, your website, or your next big idea."}
            </p>

            <form className="site-footer__form" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="footer-email">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="site-footer__input"
              />
              <button type="submit" className="site-footer__submit interactive-cursor">
                {status === 'sent' ? 'Opening mail…' : contactCta.ctaLabel || 'Get in touch'}
              </button>
            </form>

            <div className="site-footer__card-actions">
              <Link
                href={contactCta.ctaHref || '/contact'}
                className="site-footer__text-link interactive-cursor"
              >
                Or go to contact page
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </FadeIn>

        {socialLinks.length > 0 ? (
          <FadeIn delay={0.18}>
            <ul className="site-footer__social">
              {socialLinks.slice(0, 4).map((item) => (
                <li key={`${item.platform}-${item.url}`}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="site-footer__social-btn interactive-cursor"
                    aria-label={item.platform}
                  >
                    <SocialIcon platform={item.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}
      </div>

      <div className="site-footer__bottom">
        <nav className="site-footer__links" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.path} href={link.path} className="interactive-cursor">
              {link.name}
            </Link>
          ))}
        </nav>
        <p className="site-footer__copy">
          © {copyright.includes('©') ? copyright.replace(/^©\s*/, '') : copyright}
        </p>
      </div>
    </footer>
  );
}
