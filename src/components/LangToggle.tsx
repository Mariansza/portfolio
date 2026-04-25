'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function LangToggle() {
  const pathname = usePathname();
  const locale = useLocale();
  const cls = (target: string) =>
    target === locale ? 'text-fg' : 'text-mute transition-colors hover:text-fg';

  return (
    <span className="font-mono text-xs" aria-label="language">
      <Link href={pathname} locale="fr" className={cls('fr')}>
        FR
      </Link>
      <span aria-hidden className="text-mute-soft mx-2">
        ·
      </span>
      <Link href={pathname} locale="en" className={cls('en')}>
        EN
      </Link>
    </span>
  );
}
