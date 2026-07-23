import { resolveResumeUrl } from './resume';

export const DEFAULT_HERO_TITLE = 'Precision in Motion';

export const DEFAULT_HERO_SUBTITLE_LINES = [
  'UI/UX & product design, elevated by AI.',
] as const;

export const DEFAULT_HERO_SUBTITLE = DEFAULT_HERO_SUBTITLE_LINES.join('\n');

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Short editorial statement for the redesigned hero (2–4 words). */
export function heroStatement(title: string): string {
  const normalized = normalizeWhitespace(title).replace(/\.+$/, '');

  if (/Turning Ideas Into Beautiful/i.test(normalized)) {
    return 'Precision in Motion.';
  }

  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length >= 2 && words.length <= 4) {
    return normalized.includes('.') ? normalized : `${normalized}.`;
  }

  return 'Precision in Motion.';
}

/** One-line support copy under the statement. */
export function heroSupportLine(subtitle: string): string {
  const normalized = normalizeWhitespace(subtitle);
  if (!normalized) return DEFAULT_HERO_SUBTITLE;
  if (/passionate about creating intuitive interfaces/i.test(normalized)) {
    return DEFAULT_HERO_SUBTITLE;
  }
  const first = normalized.split(/[.!?]/)[0]?.trim() || normalized;
  if (first.length > 90) return DEFAULT_HERO_SUBTITLE;
  return first.endsWith('.') ? first : `${first}.`;
}

export function heroTitleLines(title: string): string[] {
  const normalized = normalizeWhitespace(title);

  if (title.includes('\n')) {
    const lines = title
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 2) return lines;
    if (lines.length > 2) return [lines.slice(0, -1).join(' '), lines[lines.length - 1]];
  }

  if (/Turning Ideas Into Beautiful\s*&\s*Functional Products\.?/i.test(normalized)) {
    return ['Turning Ideas Into Beautiful &', 'Functional Products.'];
  }

  if (/Precision in Motion\.?/i.test(normalized)) {
    return ['Precision in Motion.'];
  }

  const match = normalized.match(/^(.+?)\s+(Functional Products\.?)$/i);
  if (match) return [match[1].trim(), match[2].trim()];

  return [normalized];
}

export function heroSubtitleLines(subtitle: string): string[] {
  if (subtitle.includes('\n')) {
    return subtitle
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const normalized = normalizeWhitespace(subtitle);
  const defaultNormalized = normalizeWhitespace(DEFAULT_HERO_SUBTITLE);

  if (normalized === defaultNormalized || defaultNormalized.startsWith(normalized)) {
    return [...DEFAULT_HERO_SUBTITLE_LINES];
  }

  return [subtitle];
}

export function normalizeHeroSettings<T extends Record<string, unknown>>(settings: T): T {
  const title = String(settings.heroTitle ?? '');
  const subtitle = String(settings.heroSubtitle ?? '');

  return {
    ...settings,
    heroTitle: title ? heroTitleLines(title).join('\n') : DEFAULT_HERO_TITLE,
    heroSubtitle: subtitle ? heroSubtitleLines(subtitle).join('\n') : DEFAULT_HERO_SUBTITLE,
    resumeUrl: resolveResumeUrl(String(settings.resumeUrl ?? '')),
  };
}
