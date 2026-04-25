export type NavItem = {
  label: string;
  href: '/' | '/about' | '/projects' | '/cv' | '/contact';
};

export const navItems: readonly NavItem[] = [
  { label: '~/work', href: '/projects' },
  { label: '~/about', href: '/about' },
  { label: '~/cv', href: '/cv' },
  { label: '~/contact', href: '/contact' },
];
