import { Fragment } from 'react';

type BreadcrumbProps = {
  items: readonly string[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="border-hairline text-mute border-b px-6 py-6 font-mono text-xs lg:px-14"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="text-mute-soft mx-2.5">
              /
            </span>
          )}
          <span className={i === items.length - 1 ? 'text-fg' : 'text-mute'}>
            {item}
          </span>
        </Fragment>
      ))}
    </nav>
  );
}
