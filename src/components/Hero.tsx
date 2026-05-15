import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SignalDot } from './SignalDot';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="border-hairline border-b px-6 pt-20 pb-20 lg:px-14 lg:pt-32 lg:pb-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[140px_1fr]">
        <aside
          aria-label="index"
          className="text-mute font-mono text-[11px] leading-[1.9]"
        >
          <div className="text-accent">
            {'// '}
            {t('indexLabel')}
          </div>
        </aside>

        <div>
          <p className="text-mute mb-8 flex items-center gap-2 font-mono text-xs tracking-[0.4px]">
            <SignalDot />
            <span>{t('available')}</span>
          </p>
          <h1 className="text-fg-bright m-0 text-[48px] leading-[0.98] font-medium tracking-[-1.5px] sm:text-[64px] sm:tracking-[-2px] lg:text-[88px] lg:tracking-[-3px]">
            {t('name')}
            <br />
            {t('lastName')}
            <br />
            <span className="text-mute">{t('role')}</span>
            <br />
            <span className="text-mute">{t('speciality')}</span>
          </h1>
          <p className="text-fg-muted mt-12 max-w-[680px] text-lg leading-[1.55] lg:text-[22px]">
            {t.rich('pitch', {
              em: (chunks) => (
                <span className="text-fg-bright font-medium">{chunks}</span>
              ),
            })}
          </p>
          <div className="mt-14 flex flex-wrap gap-3 font-mono text-[13px]">
            <Link
              href="/projects"
              className="border-mute-soft text-fg hover:border-mute hover:text-fg-bright inline-flex items-center gap-2 rounded border px-5 py-3 font-semibold transition-colors"
            >
              <span aria-hidden>→</span>
              <span>{t('ctaProjects')}</span>
            </Link>
            <a
              href="/marian-szawelski-cv.pdf"
              className="border-mute-soft text-fg hover:border-mute hover:text-fg-bright inline-flex items-center gap-2 rounded border px-5 py-3 transition-colors"
            >
              {t('ctaCV')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
