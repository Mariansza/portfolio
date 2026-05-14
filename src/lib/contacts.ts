export type ContactChannel = {
  key: 'email' | 'phone' | 'linkedin' | 'github' | 'cv';
  value: string;
  href: string;
  external: boolean;
};

export const contactChannels: readonly ContactChannel[] = [
  {
    key: 'email',
    value: 'm.szawelski.pro@gmail.com',
    href: 'mailto:m.szawelski.pro@gmail.com',
    external: false,
  },
  {
    key: 'phone',
    value: '+33 7 82 80 32 33',
    href: 'tel:+33782803233',
    external: false,
  },
  {
    key: 'linkedin',
    value: 'in/marian-szawelski',
    href: 'https://www.linkedin.com/in/marian-szawelski-06b248267/',
    external: true,
  },
  {
    key: 'github',
    value: '@Mariansza',
    href: 'https://github.com/Mariansza',
    external: true,
  },
  {
    key: 'cv',
    value: 'marian-szawelski.pdf',
    href: '/marian-szawelski-cv.pdf',
    external: false,
  },
];
