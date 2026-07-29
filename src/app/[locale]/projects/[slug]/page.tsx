import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FooterMini } from '@/components/FooterMini';
import { SectionHeader } from '@/components/SectionHeader';
import { Tag } from '@/components/Tag';
import { Link } from '@/i18n/navigation';
import { getProjectById, projects } from '@/lib/projects';

type Params = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudyReady)
    .map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectById(slug);
  if (!project || !project.caseStudyReady) return {};
  const t = await getTranslations({
    locale,
    namespace: `projects.items.${project.id}.caseStudy.metadata`,
  });
  return {
    title: t('title'),
    description: t('description'),
  };
}

const approachBlockIds = [
  'arch',
  'rag',
  'orchestration',
  'autoDetect',
  'humanLoop',
  'autopilot',
  'meta',
] as const;

const outcomeBlockIds = ['impact', 'scale', 'build'] as const;

export default function CaseStudyPage({ params }: Params) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const project = getProjectById(slug);
  if (!project || !project.caseStudyReady) notFound();

  const t = useTranslations('projects');
  const tPage = useTranslations('projects.page');
  const tCase = useTranslations(`projects.items.${project.id}.caseStudy`);

  const objectives = tCase.raw('challenge.objectives') as readonly string[];

  const richEm = {
    strong: (chunks: React.ReactNode) => (
      <strong className="text-fg-bright font-medium">{chunks}</strong>
    ),
  };

  return (
    <>
      <Breadcrumb
        items={['~', tPage('breadcrumb'), tCase('breadcrumb')]}
        backHref="/projects"
      />

      <section className="border-hairline border-b px-6 pt-16 pb-16 lg:px-14 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[140px_1fr_280px]">
          <aside
            aria-label="case study index"
            className="text-mute font-mono text-[11px] leading-[1.9]"
          >
            <div className="text-accent">
              {'// '}
              {tCase('indexLabel')}
            </div>
          </aside>

          <div>
            <div className="text-mute mb-5 flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-accent">{project.num}</span>
              <span>{project.year}</span>
              <span className="text-mute-soft">·</span>
              <span>{tPage(`status.${project.status}`)}</span>
            </div>
            <h1 className="text-fg-bright m-0 text-[40px] leading-[1.05] font-medium tracking-[-1.5px] sm:text-[52px] lg:text-[64px] lg:tracking-[-2.5px]">
              {t(`items.${project.id}.title`)}
            </h1>
            <p className="text-fg-muted mt-6 max-w-[620px] text-lg leading-[1.55] lg:text-[20px]">
              {t(`items.${project.id}.pitch`)}
            </p>
          </div>

          <aside
            aria-label="stack tags"
            className="flex flex-col gap-4 lg:max-w-[280px]"
          >
            <div className="text-accent font-mono text-[11px] tracking-[0.08em] uppercase">
              {'// '}
              {tCase('tagsLabel')}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        id="context"
        aria-labelledby="context-heading"
        className="border-hairline border-b px-6 py-12 lg:px-14 lg:py-16"
      >
        <div id="context-heading">
          <SectionHeader>{tCase('context.title')}</SectionHeader>
        </div>
        <p className="text-fg-muted mt-10 max-w-[760px] text-base leading-[1.65] lg:text-[17px]">
          {tCase('context.body')}
        </p>
      </section>

      <section
        id="challenge"
        aria-labelledby="challenge-heading"
        className="border-hairline border-b px-6 py-12 lg:px-14 lg:py-16"
      >
        <div id="challenge-heading">
          <SectionHeader>{tCase('challenge.title')}</SectionHeader>
        </div>
        <p className="text-fg-muted mt-10 max-w-[760px] text-base leading-[1.65] lg:text-[17px]">
          {tCase('challenge.intro')}
        </p>
        <p className="text-fg-bright mt-8 font-mono text-[12px] tracking-[0.08em] uppercase">
          {tCase('challenge.objectivesLabel')}
        </p>
        <ul className="mt-3 max-w-[760px] space-y-2">
          {objectives.map((obj, i) => (
            <li
              key={i}
              className="text-fg-muted flex gap-3 text-base leading-[1.55] lg:text-[17px]"
            >
              <span aria-hidden className="text-accent mt-1">
                →
              </span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="approach"
        aria-labelledby="approach-heading"
        className="border-hairline border-b px-6 py-12 lg:px-14 lg:py-16"
      >
        <div id="approach-heading">
          <SectionHeader>{tCase('approach.title')}</SectionHeader>
        </div>
        <div className="mt-10 max-w-[760px] space-y-6">
          {approachBlockIds.map((id) => (
            <p
              key={id}
              className="text-fg-muted text-base leading-[1.65] lg:text-[17px]"
            >
              {tCase.rich(`approach.blocks.${id}`, richEm)}
            </p>
          ))}
        </div>
      </section>

      <section
        id="outcome"
        aria-labelledby="outcome-heading"
        className="border-hairline border-b px-6 py-12 lg:px-14 lg:py-16"
      >
        <div id="outcome-heading">
          <SectionHeader>{tCase('outcome.title')}</SectionHeader>
        </div>
        <p className="text-fg-muted mt-10 max-w-[760px] text-base leading-[1.65] lg:text-[17px]">
          {tCase('outcome.intro')}
        </p>
        <div className="mt-6 max-w-[760px] space-y-6">
          {outcomeBlockIds.map((id) => (
            <p
              key={id}
              className="text-fg-muted text-base leading-[1.65] lg:text-[17px]"
            >
              {tCase.rich(`outcome.blocks.${id}`, richEm)}
            </p>
          ))}
        </div>
      </section>

      <nav aria-label="back" className="px-6 py-10 lg:px-14">
        <Link
          href="/projects"
          className="text-mute hover:text-fg-bright inline-flex items-center py-1 -my-1 font-mono text-[13px] underline underline-offset-4 decoration-1 transition-colors"
        >
          <span aria-hidden>← </span>
          {tCase('backToList')}
        </Link>
      </nav>

      <FooterMini />
    </>
  );
}
