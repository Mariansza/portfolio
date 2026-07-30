import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { AboutTeaser } from '@/components/AboutTeaser';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Reveal } from '@/components/Reveal';
import { StackSection } from '@/components/StackSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <Reveal>
          <ProjectsSection />
        </Reveal>
        <Reveal>
          <AboutTeaser />
        </Reveal>
        <Reveal>
          <StackSection />
        </Reveal>
      </main>
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}
