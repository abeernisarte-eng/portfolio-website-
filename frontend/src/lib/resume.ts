export const DEFAULT_RESUME_URL = '/resume/abeer-nisar-resume.pdf';
export const DEFAULT_RESUME_FILENAME = 'Abeer-Nisar-Resume.pdf';

const BROKEN_RESUME_URLS = [
  'raw.githubusercontent.com/abeernisar/resume',
  'github.com/abeernisar/resume',
];

export function resolveResumeUrl(url?: string | null): string {
  const trimmed = String(url ?? '').trim();
  if (!trimmed) return DEFAULT_RESUME_URL;
  if (BROKEN_RESUME_URLS.some((broken) => trimmed.includes(broken))) return DEFAULT_RESUME_URL;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export function resumeFilenameFromUrl(url: string): string {
  try {
    const pathname = url.startsWith('http') ? new URL(url).pathname : url;
    const name = decodeURIComponent(pathname.split('/').pop() || DEFAULT_RESUME_FILENAME);
    return name.replace(/\s+/g, '-');
  } catch {
    return DEFAULT_RESUME_FILENAME;
  }
}

export async function downloadResume(url: string, filename = DEFAULT_RESUME_FILENAME): Promise<void> {
  const resolvedUrl = resolveResumeUrl(url);

  try {
    const response = await fetch(resolvedUrl);
    if (!response.ok) throw new Error('Resume file not found');

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || resumeFilenameFromUrl(resolvedUrl);
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    const link = document.createElement('a');
    link.href = resolvedUrl;
    link.download = filename || resumeFilenameFromUrl(resolvedUrl);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
