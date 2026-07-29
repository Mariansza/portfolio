import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { contactChannels } from '@/lib/contacts';
import { SectionHeader } from './SectionHeader';

export function Footer() {
  const t = useTranslations();
  const emailChannel = contactChannels.find((c) => c.key === 'email');

  return (
    <footer className="px-6 pt-14 pb-10 lg:px-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-3.5">
            <SectionHeader>{t('contact.label')}</SectionHeader>
          </div>
          <h2 className="text-fg-bright m-0 text-[40px] leading-[1.05] font-medium tracking-[-1.2px] lg:text-[44px]">
            {t('contact.headlineLine1')}
            <br />
            {t('contact.headlineLine2')}
          </h2>
          <p className="text-fg-dim mt-4 max-w-[420px] text-base leading-[1.55]">
            {t('contact.pitch')}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 self-end font-mono text-[13px]">
          {emailChannel && (
            <a
              href={emailChannel.href}
              className="bg-accent text-bg inline-flex items-center gap-2 rounded px-5 py-3 font-semibold transition-opacity hover:opacity-90"
            >
              <span aria-hidden>→</span>
              <span>{t('contact.ctaPrimary')}</span>
            </a>
          )}
          <Link
            href="/contact"
            className="text-mute hover:text-fg-bright inline-flex items-center gap-1.5 py-1 -my-1 transition-colors"
          >
            <span>{t('contact.ctaAllChannels')}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <div className="border-hairline text-mute mt-16 flex flex-wrap items-center justify-between gap-2 border-t pt-6 font-mono text-[11px]">
        <span>{t('footer.signature')}</span>
        <span>
          status:{' '}
          <span className="text-accent" aria-hidden>
            ●
          </span>{' '}
          <span className="text-accent">{t('footer.status')}</span>
        </span>
      </div>
    </footer>
  );
}
