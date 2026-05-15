export type NavItem = {
  label: string;
  href: '/about' | '/projects' | '/cv' | '/contact';
  enabled: boolean;
};

export const navItems: readonly NavItem[] = [
  { label: '~/work', href: '/projects', enabled: true },
  { label: '~/about', href: '/about', enabled: true },
  { label: '~/cv', href: '/cv', enabled: false },
  { label: '~/contact', href: '/contact', enabled: true },
];
