import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FooterMini } from '@/components/FooterMini';
import { SignalDot } from '@/components/SignalDot';
import { contactChannels } from '@/lib/contacts';

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage({ params }: LocaleParams) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('contact.page');

  const emailChannel = contactChannels.find((c) => c.key === 'email');
  const linkedinChannel = contactChannels.find((c) => c.key === 'linkedin');

  return (
    <>
      <Breadcrumb items={['~', t('breadcrumb')]} />
      <main className="border-hairline border-b px-6 pt-16 pb-20 lg:px-14 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[140px_1fr_380px]">
          <aside
            aria-label="index"
            className="text-mute font-mono text-[11px] leading-[1.9]"
          >
            <div className="text-accent">{'// CONTACT'}</div>
            <ul className="mt-3">
              <li>01 — message</li>
              <li>02 — channels</li>
            </ul>
          </aside>

          <div>
            <p className="text-mute mb-5 flex items-center gap-2 font-mono text-xs">
              <SignalDot />
              <span>{t('available')}</span>
            </p>
            <h1 className="text-fg-bright m-0 text-[56px] leading-[0.98] font-medium tracking-[-1.5px] sm:text-[72px] lg:text-[84px] lg:tracking-[-3px]">
              {t('headline')}
            </h1>
            <p className="text-fg-muted mt-6 max-w-[540px] text-lg leading-[1.55] lg:text-[20px]">
              {t('intro')}
            </p>
            <div className="mt-10 flex flex-wrap gap-3 font-mono text-[13px]">
              {emailChannel && (
                <a
                  href={emailChannel.href}
                  className="bg-accent text-bg inline-flex items-center gap-2 rounded px-5 py-3 font-semibold transition-opacity hover:opacity-90"
                >
                  <span aria-hidden>→</span>
                  <span>{t('ctaEmail')}</span>
                </a>
              )}
              {linkedinChannel && (
                <a
                  href={linkedinChannel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-mute-soft text-fg hover:border-mute hover:text-fg-bright inline-flex items-center gap-2 rounded border px-5 py-3 transition-colors"
                >
                  <span>{t('ctaLinkedIn')}</span>
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>

          <aside
            aria-label="channels"
            className="flex flex-col gap-8 lg:max-w-[380px]"
          >
            <div>
              <div className="text-mute mb-4 font-mono text-[11px]">
                <span className="text-accent">02 — </span>
                {t('channelsLabel')}
              </div>
              <ul className="font-mono text-[13px]">
                {contactChannels.map((channel) => (
                  <li key={channel.key}>
                    <a
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      className="group border-hairline hover:bg-fg/[0.02] flex items-center justify-between border-b py-3.5 transition-colors"
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

            <div className="border-hairline rounded-md border p-4">
              <div className="text-accent mb-2 font-mono text-[11px]">
                {'// LOCATION'}
              </div>
              <div className="text-fg text-sm">{t('locationPlace')}</div>
              <div className="text-mute mt-1 font-mono text-[11px]">
                {t('locationMeta')}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <FooterMini />
    </>
  );
}
