'use client';

import { fallbackData } from '@/services/apiService';
import HeroSection from '@/components/shared/HeroSection';
import IntroProcessJourney from '@/components/shared/IntroProcessJourney';
import FeaturedProjectsStack from '@/components/shared/FeaturedProjectsStack';
import ToolsBucketSection from '@/components/shared/ToolsBucketSection';
import { useCms } from '@/context/CmsContext';
import { cmsDefaults } from '@/lib/cmsDefaults';
import { normalizeHeroSettings } from '@/lib/heroContent';
import { resolveResumeUrl } from '@/lib/resume';

export default function Home() {
  const { cms, loading, getContent } = useCms();
  const settings = cms.settings as Record<string, string>;
  const about = getContent<typeof cmsDefaults.content['home.about']>('home.about');
  const featured = getContent<typeof cmsDefaults.content['home.featuredProjects']>('home.featuredProjects');

  const featuredProjects = (cms.projects as typeof fallbackData.projects).filter((p) => p.featured).slice(0, 4);
  const displayProjects = loading
    ? fallbackData.projects.filter((p) => p.featured).slice(0, 4)
    : featuredProjects.length
      ? featuredProjects
      : fallbackData.projects.filter((p) => p.featured).slice(0, 4);

  const stats = about.stats?.length
    ? about.stats
    : [
        { value: '2+', label: 'Years of Experience' },
        { value: String(displayProjects.length || 4), label: 'Completed Projects' },
        { value: '5+', label: 'Clients Worldwide' },
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

      <IntroProcessJourney
        brandName={(settings.brandName as string) || cmsDefaults.settings.brandName}
        ctaLabel={about.ctaLabel === 'My Story' ? 'About me' : about.ctaLabel || 'About me'}
        ctaHref={about.ctaHref || '/about'}
        processTitle="MY DESIGN PROCESS"
      />

      <FeaturedProjectsStack
        projects={displayProjects}
        title=""
        intro=""
        browseAllLabel={featured.browseAllLabel || 'View All Projects'}
      />

      <ToolsBucketSection />
    </div>
  );
}
