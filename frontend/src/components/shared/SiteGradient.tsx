'use client';

import { useEffect } from 'react';

export default function SiteGradient() {
  useEffect(() => {
    document.documentElement.classList.add('site-gradient');
    return () => document.documentElement.classList.remove('site-gradient');
  }, []);

  return null;
}
