import type { Metadata } from 'next';
import Image from 'next/image';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FooterMini } from '@/components/FooterMini';
import { SectionHeader } from '@/components/SectionHeader';
import { SignalDot } from '@/components/SignalDot';

const parcoursIds = ['prepa', 'ensisa', 'kyoto', 'tessan'] as const;

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage({ params }: LocaleParams) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('about');

  return (
    <>
      <Breadcrumb items={['~', t('breadcrumb')]} />

      <section className="border-hairline border-b px-6 pt-16 pb-16 lg:px-14 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[140px_1fr_320px]">
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
            <p className="text-mute mb-5 flex items-center gap-2 font-mono text-xs">
              <SignalDot />
              <span>{t('available')}</span>
            </p>
            <h1 className="text-fg-bright m-0 text-[32px] leading-[1.1] font-medium tracking-[-0.8px] sm:text-[38px] lg:text-[44px] lg:tracking-[-1px]">
              {t('name')} {t('lastName')}
            </h1>
            <p className="text-fg-muted mt-6 max-w-[540px] text-lg leading-[1.55] lg:text-[20px]">
              {t('intro')}
            </p>
          </div>

          <aside
            aria-label="portrait"
            className="flex flex-col gap-3 lg:max-w-[320px]"
          >
            <div className="border-hairline mx-auto max-w-[280px] overflow-hidden rounded-md border lg:mx-0 lg:max-w-none">
              <Image
                src="/marian.jpg"
                alt={t('photoAlt')}
                width={499}
                height={598}
                priority
                className="block h-auto w-full"
              />
            </div>
            <div className="text-mute mx-auto font-mono text-[11px] lg:mx-0">
              {t('photoCaption')}
            </div>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="parcours-heading"
        className="border-hairline border-b px-6 py-12 lg:px-14 lg:py-16"
      >
        <div id="parcours-heading">
          <SectionHeader>{t('parcours.label')}</SectionHeader>
        </div>
        <ol className="mt-10 flex flex-col gap-y-7">
          {parcoursIds.map((id) => (
            <li
              key={id}
              className="grid grid-cols-1 gap-2 lg:grid-cols-[140px_1fr] lg:gap-8"
            >
              <div className="text-accent font-mono text-[13px] tracking-[0.08em] uppercase">
                {t(`parcours.${id}.tag`)}
              </div>
              <p className="text-fg-muted max-w-[680px] text-base leading-[1.6] lg:text-[17px]">
                {t(`parcours.${id}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="conviction-heading"
        className="px-6 py-12 lg:px-14 lg:py-16"
      >
        <div id="conviction-heading">
          <SectionHeader>{t('conviction.label')}</SectionHeader>
        </div>
        <blockquote className="text-fg-bright mt-10 max-w-[760px] text-2xl leading-[1.4] font-medium tracking-tight lg:text-[30px] lg:leading-[1.3]">
          <span aria-hidden className="text-accent mr-2">
            ↳
          </span>
          {t('conviction.body')}
        </blockquote>
      </section>

      <FooterMini />
    </>
  );
}
