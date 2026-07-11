const LOCAL_IMAGE_FALLBACKS: Record<string, string> = {
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80':
    '/images/testimonials/waseem-khan.jpg',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80':
    '/images/testimonials/waseem-khan.jpg',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80':
    '/images/testimonials/sardar-azam.jpg',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80':
    '/images/testimonials/sardar-azam.jpg',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80':
    '/images/contact/cta-background.jpg',
};

export function resolveImageUrl(url?: string | null) {
  if (!url) return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('/images/')) return trimmed;

  if (trimmed.startsWith('/uploads/')) {
    const fileName = trimmed.split('/').pop() || '';
    if (fileName.includes('waseem')) return '/images/testimonials/waseem-khan.jpg';
    if (fileName.includes('sardar')) return '/images/testimonials/sardar-azam.jpg';
    if (fileName.includes('cta') || fileName.includes('contact') || fileName.includes('footer')) {
      return '/images/contact/cta-background.jpg';
    }
    return '';
  }

  if (LOCAL_IMAGE_FALLBACKS[trimmed]) {
    return LOCAL_IMAGE_FALLBACKS[trimmed];
  }

  if (trimmed.startsWith('http://localhost:') || trimmed.startsWith('https://localhost:')) {
    return '';
  }

  return trimmed;
}

export const DEFAULT_TESTIMONIAL_PHOTOS = {
  waseem: '/images/testimonials/waseem-khan.jpg',
  sardar: '/images/testimonials/sardar-azam.jpg',
} as const;

export const DEFAULT_CONTACT_CTA_BACKGROUND = '/images/contact/cta-background.jpg';
