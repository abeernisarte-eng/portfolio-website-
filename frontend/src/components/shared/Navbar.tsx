'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ObermannLogo } from '@/components/ui/ObermannMark';
import { useTheme } from '@/context/ThemeContext';
import { useCms } from '@/context/CmsContext';
import { cmsDefaults } from '@/lib/cmsDefaults';

const defaultNav = cmsDefaults.settings.navItems as { name: string; path: string }[];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { cms } = useCms();
  const { theme, mounted: themeMounted } = useTheme();
  const settings = cms.settings as Record<string, string>;
  const navItems = (Array.isArray(cms.settings.navItems) && cms.settings.navItems.length
    ? cms.settings.navItems
    : defaultNav) as { name: string; path: string }[];
  const brandName = settings.brandName || 'Abeer Nisar';
  const contactEmail = settings.contactEmail || 'abeernisar11@gmail.com';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('abeer-open-nav', onOpen);
    return () => window.removeEventListener('abeer-open-nav', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/projects') return pathname.startsWith('/projects');
    return pathname === path;
  };

  return (
    <>
      <header
        className={`lab-chrome ${isHome ? 'lab-chrome--figma-hero' : ''} ${open ? 'is-open' : ''}`}
        aria-hidden={isHome ? true : undefined}
      >
        {!isHome && (
          <>
            <Link
              href="/"
              className="lab-chrome-brand interactive-cursor"
              onClick={() => setOpen(false)}
            >
              <ObermannLogo
                size={16}
                className={themeMounted && theme === 'dark' ? 'nav-logo-mark-dark' : ''}
              />
              <span className="lab-chrome-brand-name">{brandName}</span>
            </Link>

            <div className="lab-chrome-actions">
              <ThemeToggle onHero={!themeMounted || theme === 'dark'} />
              <button
                type="button"
                className={`lab-dot-menu interactive-cursor ${open ? 'is-open' : ''}`}
                aria-expanded={open}
                aria-controls="lab-nav-overlay"
                aria-label={open ? 'Close navigation' : 'Open navigation'}
                onClick={() => setOpen((v) => !v)}
              >
                <i /><i /><i />
              </button>
            </div>
          </>
        )}
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="lab-nav-overlay"
            className="lab-nav"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' }}
            animate={{ clipPath: 'circle(160% at calc(100% - 2.75rem) 2.75rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)' }}
            transition={{ duration: 0.75, ease }}
          >
            <div className="lab-nav-mesh" aria-hidden />
            <div className="lab-nav-grain" aria-hidden />

            <nav className="lab-nav-list" aria-label="Primary">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.06, ease }}
                >
                  <Link
                    href={item.path}
                    className={`lab-nav-link interactive-cursor ${isActive(item.path) ? 'is-active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="lab-nav-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="lab-nav-label">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="lab-nav-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <p className="lab-nav-kicker">Design Lab</p>
              <a href={`mailto:${contactEmail}`} className="lab-nav-email interactive-cursor">
                {contactEmail}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
