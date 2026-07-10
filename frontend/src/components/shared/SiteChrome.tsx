'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import SiteGradient from '@/components/shared/SiteGradient';
import CustomCursor from '@/components/ui/CustomCursor';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteGradient />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
