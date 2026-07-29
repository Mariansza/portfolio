import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';

type BreadcrumbProps = {
  items: readonly string[];
  backHref?: '/' | '/projects' | '/about' | '/contact';
};

export function Breadcrumb({ items, backHref = '/' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="border-hairline border-b px-6 py-5 font-mono text-xs lg:px-14"
    >
      <div className="flex items-center gap-3.5">
        <Link
          href={backHref}
          aria-label="back"
          className="border-mute bg-fg/[0.03] text-mute hover:border-fg-dim hover:bg-fg/[0.06] hover:text-fg-bright inline-flex h-7 w-7 items-center justify-center rounded border leading-none transition-colors"
        >
          <span aria-hidden>←</span>
        </Link>
        <div className="text-mute">
          {items.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <span aria-hidden className="text-mute-soft mx-2.5">
                  /
                </span>
              )}
              <span
                className={i === items.length - 1 ? 'text-fg' : 'text-mute'}
              >
                {item}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
