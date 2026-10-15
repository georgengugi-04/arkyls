import type { SVGProps } from 'react';
import type { ServiceIcon } from '@/data/services';

type P = SVGProps<SVGSVGElement>;
const base = (p: P): P => ({ width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...p });

export const ArrowRight = (p: P) => <svg {...base({ strokeWidth: 2, ...p })}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
export const ArrowLeft = (p: P) => <svg {...base({ strokeWidth: 2, ...p })}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
export const ArrowUp = (p: P) => <svg {...base({ strokeWidth: 2.5, ...p })}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
export const ArrowDown = (p: P) => <svg {...base({ strokeWidth: 2, ...p })}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;
export const Check = (p: P) => <svg {...base({ strokeWidth: 2.5, ...p })}><path d="M20 6 9 17l-5-5" /></svg>;
export const Close = (p: P) => <svg {...base({ strokeWidth: 2, ...p })}><path d="M18 6 6 18M6 6l12 12" /></svg>;
export const Menu = (p: P) => <svg {...base({ strokeWidth: 2, ...p })}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const Pin = (p: P) => <svg {...base(p)}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" /><circle cx="12" cy="9" r="2.5" /></svg>;
export const Phone = (p: P) => <svg {...base(p)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>;
export const Mail = (p: P) => <svg {...base(p)}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>;
export const Clock = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
export const Instagram = (p: P) => <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>;
export const Linkedin = (p: P) => <svg {...base(p)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" /></svg>;
export const XIcon = (p: P) => <svg {...base(p)}><path d="M4 4l16 16M20 4 4 20" /></svg>;

const serviceIcons: Record<ServiceIcon, (p: P) => React.JSX.Element> = {
  home: (p) => <svg {...base(p)}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22V12h6v10" /></svg>,
  building: (p) => <svg {...base(p)}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></svg>,
  leaf: (p) => <svg {...base(p)}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" /><path d="M2 21c0-3 1.9-5.5 6-7" /></svg>,
  map: (p) => <svg {...base(p)}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></svg>,
  sofa: (p) => <svg {...base(p)}><path d="M20 9V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" /><path d="M2 11a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0v6H2Z" /><path d="M5 20v-3M19 20v-3" /></svg>,
  tree: (p) => <svg {...base(p)}><path d="M12 22v-6" /><path d="M7 16a5 5 0 0 1-1-9.9A6 6 0 0 1 17.9 6 5 5 0 0 1 17 16Z" /></svg>,
};
export const ServiceGlyph = ({ name, ...p }: P & { name: ServiceIcon }) => serviceIcons[name](p);
