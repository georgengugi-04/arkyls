export const site = {
  name: 'ARKYLS',
  tagline: 'Architecture & Design Studio — Nairobi',
  description: 'Innovative architecture and sustainable design in Nairobi, Kenya.',
  email: 'info@arkyls.com',
  phone: '+254 718 470 465',
  phoneHref: 'tel:+254718470465',
  address: ['123 Design Avenue', 'Nairobi, Kenya'],
  hours: 'Mon – Fri: 8:00 AM – 6:00 PM EAT',
  mapsUrl: 'https://maps.google.com?q=Nairobi+Kenya',
  founded: 2023,
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
  ],
} as const;

export const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;
