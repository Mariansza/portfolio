import { useTranslations } from 'next-intl';
import { stackGroups } from '@/lib/stack';
import { SectionHeader } from './SectionHeader';

export function StackSection() {
  const t = useTranslations('stack');

  return (
    <section
      aria-labelledby="stack-heading"
      className="border-hairline border-b px-6 py-12 lg:px-14"
    >
      <div id="stack-heading">
        <SectionHeader number="03">{t('label')}</SectionHeader>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-10 lg:grid-cols-4">
        {stackGroups.map((group) => (
          <div key={group.id}>
            <div className="text-mute mb-3 font-mono text-[11px]">
              {'// '}
              {t(`groups.${group.id}`)}
            </div>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item} className="text-fg text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
