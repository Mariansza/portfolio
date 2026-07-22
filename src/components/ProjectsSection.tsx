import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects } from '@/lib/projects';
import { SectionHeader } from './SectionHeader';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const featured = projects.filter((p) => p.featured);

  return (
    <section aria-labelledby="work-heading">
      <div className="border-hairline flex items-baseline justify-between border-b px-6 pt-12 pb-5 lg:px-14">
        <div id="work-heading">
          <SectionHeader>{t('label')}</SectionHeader>
        </div>
        <span className="text-mute font-mono text-xs">
          <Link
            href="/projects"
            className="hover:text-fg-bright transition-colors"
          >
            {t('viewAll')} →
          </Link>
        </span>
      </div>
      <ul>
        {featured.map((project) => (
          <li
            key={project.id}
            className="border-hairline hover:bg-fg/[0.02] border-b transition-colors"
          >
            <article className="grid grid-cols-1 items-start gap-4 px-6 py-9 lg:grid-cols-[80px_1fr] lg:gap-8 lg:px-14">
              <div className="text-mute font-mono text-xs">
                {project.year}
              </div>
              <div>
                <h3 className="text-fg-bright m-0 text-2xl font-medium tracking-[-0.6px] lg:text-[32px]">
                  {t(`items.${project.id}.title`)}
                </h3>
                <p className="text-fg-dim mt-2.5 max-w-[620px] text-base leading-[1.5]">
                  {t(`items.${project.id}.pitch`)}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
