import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/ProjectsSection';
import { StackSection } from '@/components/StackSection';
import { Topbar } from '@/components/Topbar';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Topbar />
      <main className="flex flex-col">
        <Hero />
        <ProjectsSection />
        <StackSection />
      </main>
      <Footer />
    </>
  );
}
