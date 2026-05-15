import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FooterMini } from '@/components/FooterMini';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProjectsPage({ params }: LocaleParams) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('projects.page');

  return (
    <>
      <Breadcrumb items={['~', t('breadcrumb')]} />

      <section className="border-hairline border-b px-6 pt-16 pb-12 lg:px-14 lg:pt-20 lg:pb-16">
        <div className="max-w-[760px]">
          <div className="text-accent mb-5 font-mono text-[11px] tracking-[0.08em] uppercase">
            {'// '}
            {t('breadcrumb')}
          </div>
          <h1 className="text-fg-bright m-0 text-[56px] leading-[0.98] font-medium tracking-[-1.5px] sm:text-[72px] lg:text-[84px] lg:tracking-[-3px]">
            {t('headline')}
          </h1>
          <p className="text-fg-muted mt-6 max-w-[620px] text-lg leading-[1.55] lg:text-[20px]">
            {t('intro')}
          </p>
        </div>
      </section>

      <main>
        <ul className="m-0 list-none p-0">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </main>

      <FooterMini />
    </>
  );
}
