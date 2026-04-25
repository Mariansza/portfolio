import { useTranslations } from 'next-intl';
import { contactChannels } from '@/lib/contacts';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="px-6 pt-14 pb-10 lg:px-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-mute mb-3.5 font-mono text-[11px]">
            <span className="text-accent">04 — </span>
            {t('contact.label')}
          </p>
          <h2 className="text-fg-bright m-0 text-[40px] leading-[1.05] font-medium tracking-[-1.2px] lg:text-[44px]">
            {t('contact.headlineLine1')}
            <br />
            {t('contact.headlineLine2')}
          </h2>
          <p className="text-fg-dim mt-4 max-w-[420px] text-base leading-[1.55]">
            {t('contact.pitch')}
          </p>
        </div>
        <ul className="self-end font-mono text-[13px]">
          {contactChannels.map((channel) => (
            <li key={channel.key}>
              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group border-hairline hover:bg-fg/[0.02] flex items-center justify-between border-b py-3 transition-colors"
              >
                <span className="text-mute">{channel.key}</span>
                <span className="text-fg">
                  {channel.value}
                  <span
                    aria-hidden
                    className="text-accent ml-1.5 inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
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
