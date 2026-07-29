'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { navItems } from '@/lib/nav';
import { LangToggle } from './LangToggle';
import { SignalDot } from './SignalDot';

function ActiveCursor({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`ml-0.5 inline-block h-[13px] w-[7px] ${
        active ? 'bg-accent motion-safe:animate-blink' : 'bg-transparent'
      }`}
    />
  );
}

function ActivationSweep({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <span
      aria-hidden
      className="bg-accent/20 motion-safe:animate-chip-sweep pointer-events-none absolute inset-0"
    />
  );
}

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="border-hairline border-b">
      <div className="text-mute flex flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-xs lg:px-14">
        <div className="flex items-center gap-2.5">
          <SignalDot />
          <span className="text-fg">marian.szawelski</span>
          <span className="text-mute-soft">/</span>
          <span>portfolio</span>
        </div>
        <nav
          aria-label="primary"
          className="flex items-center gap-2 text-[13px]"
        >
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`relative inline-flex items-center overflow-hidden rounded-[3px] border px-3 py-1.5 transition-colors active:scale-95 ${
              pathname === '/'
                ? 'border-accent/45 bg-accent/[0.08] text-fg-bright'
                : 'border-mute-soft bg-fg/[0.03] text-mute hover:border-mute hover:bg-fg/[0.06] hover:text-fg-bright'
            }`}
          >
            <ActivationSweep active={pathname === '/'} />
            <span className="relative z-10 inline-flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
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
              <span>home</span>
              <ActiveCursor active={pathname === '/'} />
            </span>
          </Link>
          <span aria-hidden className="bg-hairline mx-1 h-5 w-px" />
          {navItems.map((item) => {
            if (!item.enabled) {
              return (
                <span
                  key={item.href}
                  aria-disabled="true"
                  className="text-mute-soft cursor-default px-3 py-1.5"
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
                className={`group relative inline-flex items-center overflow-hidden rounded-[3px] border px-3 py-1.5 transition-colors active:scale-95 ${
                  isActive
                    ? 'border-accent/45 bg-accent/[0.08] text-fg-bright'
                    : 'border-mute-soft bg-fg/[0.03] text-mute hover:border-mute hover:bg-fg/[0.06] hover:text-fg-bright'
                }`}
              >
                <ActivationSweep active={isActive} />
                <span className="relative z-10 inline-flex items-center">
                  <span
                    className={
                      isActive
                        ? 'text-accent'
                        : 'text-inherit group-hover:text-fg-dim'
                    }
                  >
                    {item.label.charAt(0)}
                  </span>
                  {item.label.slice(1)}
                  <ActiveCursor active={isActive} />
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
