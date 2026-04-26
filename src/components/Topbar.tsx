import { Link } from '@/i18n/navigation';
import { navItems } from '@/lib/nav';
import { LangToggle } from './LangToggle';
import { SignalDot } from './SignalDot';

export function Topbar() {
  return (
    <header className="border-hairline border-b">
      <div className="text-mute flex flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-xs lg:px-14">
        <div className="flex items-center gap-2.5">
          <SignalDot />
          <Link
            href="/"
            className="text-fg hover:text-fg-bright transition-colors"
          >
            marian.szawelski
          </Link>
          <span className="text-mute-soft">/</span>
          <span>portfolio</span>
          <span className="text-mute-soft ml-2">v0.3.2</span>
        </div>
        <nav
          aria-label="primary"
          className="flex items-center gap-7 text-[13px]"
        >
          {navItems.map((item) =>
            item.enabled ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-mute hover:text-fg transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.href}
                aria-disabled="true"
                className="text-mute-soft cursor-default"
              >
                {item.label}
              </span>
            ),
          )}
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
