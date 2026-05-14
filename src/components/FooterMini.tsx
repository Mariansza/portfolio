import { useTranslations } from 'next-intl';
import { contactChannels } from '@/lib/contacts';

export function FooterMini() {
  const t = useTranslations('footer');
  const channels = contactChannels.filter((c) => c.key !== 'cv');

  return (
    <footer className="border-hairline border-t">
      <div className="text-mute flex flex-wrap items-center justify-between gap-2 px-6 py-7 font-mono text-[11px] lg:px-14">
        <span>{channels.map((c) => c.value).join(' · ')}</span>
        <span>
          status:{' '}
          <span aria-hidden className="text-accent">
            ●
          </span>{' '}
          <span className="text-accent">{t('status')}</span>
        </span>
      </div>
    </footer>
  );
}
