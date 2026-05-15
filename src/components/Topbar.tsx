'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { navItems } from '@/lib/nav';
import { LangToggle } from './LangToggle';
import { SignalDot } from './SignalDot';

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="border-hairline border-b">
      <div className="text-mute flex flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-xs lg:px-14">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="home"
            className="border-mute-soft text-mute hover:border-mute hover:bg-fg/[0.04] hover:text-fg-bright inline-flex items-center justify-center rounded border p-2 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
          <div className="flex items-center gap-2.5">
            <SignalDot />
            <span className="text-fg">marian.szawelski</span>
            <span className="text-mute-soft">/</span>
            <span>portfolio</span>
            <span className="text-mute-soft ml-2">v0.3.2</span>
          </div>
        </div>
        <nav
          aria-label="primary"
          className="flex items-center gap-7 text-[13px]"
        >
          {navItems.map((item) => {
            if (!item.enabled) {
              return (
                <span
                  key={item.href}
                  aria-disabled="true"
                  className="text-mute-soft cursor-default border-b border-transparent pb-0.5"
                >
                  {item.label}
                </span>
              );
            }
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`border-b pb-0.5 transition-colors ${
                  isActive
                    ? 'border-accent text-fg'
                    : 'text-mute hover:text-fg border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <LangToggle />
          <kbd className="border-mute-soft text-mute ml-3 rounded border px-2.5 py-1 font-mono text-[11px]">
            ⌘ K
          </kbd>
        </div>
      </div>
    </header>
  );
}
