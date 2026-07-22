export type NavItem = {
  label: string;
  href: '/about' | '/projects' | '/contact';
  enabled: boolean;
};

export const navItems: readonly NavItem[] = [
  { label: '~/work', href: '/projects', enabled: true },
  { label: '~/about', href: '/about', enabled: true },
  { label: '~/contact', href: '/contact', enabled: true },
];
