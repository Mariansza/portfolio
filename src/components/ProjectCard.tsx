import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/lib/projects';
import { Tag } from './Tag';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('projects');
  const tPage = useTranslations('projects.page');
  const title = t(`items.${project.id}.title`);
  const pitch = t(`items.${project.id}.pitch`);

  const content = (
    <article className="grid grid-cols-1 items-start gap-6 px-6 py-9 lg:grid-cols-[80px_1fr_320px] lg:gap-8 lg:px-14">
      <div className="text-mute font-mono text-xs">
        <div className="text-accent">{project.num}</div>
        <div className="mt-1.5">{project.year}</div>
        <div className="text-mute-soft mt-1.5">
          {tPage(`status.${project.status}`)}
        </div>
      </div>
      <div>
        <h3
          className={`m-0 text-2xl font-medium tracking-[-0.6px] lg:text-[32px] ${
            project.caseStudyReady ? 'text-fg-bright' : 'text-fg-muted'
          }`}
        >
          {title}
        </h3>
        <p className="text-fg-dim mt-2.5 max-w-[560px] text-base leading-[1.5]">
          {pitch}
        </p>
        {project.caseStudyReady ? (
          <p className="text-accent mt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
            <span aria-hidden>→ </span>
            {tPage('viewCaseStudy')}
          </p>
        ) : (
          <p className="text-mute-soft mt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
            {tPage('comingSoon')}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 lg:justify-end">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  );

  const baseClass = 'border-hairline block border-b transition-colors';

  if (project.caseStudyReady) {
    return (
      <Link
        href={`/projects/${project.id}`}
        aria-label={title}
        className={`${baseClass} hover:bg-fg/[0.02] focus-visible:bg-fg/[0.02] focus:outline-none`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div aria-disabled="true" className={`${baseClass} cursor-default`}>
      {content}
    </div>
  );
}
