import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from './SectionHeader';

export function AboutTeaser() {
  const t = useTranslations('aboutTeaser');

  return (
    <section aria-labelledby="about-teaser-heading">
      <div className="border-hairline border-b px-6 pt-12 pb-12 lg:px-14">
        <div id="about-teaser-heading">
          <SectionHeader>{t('label')}</SectionHeader>
        </div>
        <p className="text-fg-muted mt-8 max-w-[680px] text-lg leading-[1.55] lg:text-[20px]">
          {t('text')}
        </p>
        <Link
          href="/about"
          className="text-mute hover:text-fg-bright mt-6 inline-flex items-center gap-1.5 font-mono text-[13px] transition-colors"
        >
          <span>{t('cta')}</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
