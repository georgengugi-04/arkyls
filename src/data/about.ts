import type { Photo } from '@/lib/img';

export const values = [
  { title: 'Innovation', text: 'Pushing the boundaries of design, technology, and material science to create truly unprecedented spaces.' },
  { title: 'Sustainability', text: 'Committed to environmentally responsible design that safeguards our planet for future generations.' },
  { title: 'Collaboration', text: 'Working closely with every client to deeply understand their vision and bring it to life beyond expectations.' },
  { title: 'Excellence', text: 'Uncompromising quality in every detail — from the first sketch to the final finishing touch.' },
  { title: 'Timeliness', text: 'Delivering projects on schedule without compromise on craftsmanship or attention to detail.' },
  { title: 'Client-First', text: 'Your satisfaction is our greatest achievement. Every decision is made with your best interests at heart.' },
];

export interface Member {
  name: string;
  role: string;
  bio?: string;
  /** Only set when a real portrait exists; otherwise an initials avatar is rendered. */
  photo?: Photo;
}

export const team: Member[] = [
  {
    name: 'Lenny Kariuki',
    role: 'Founder & Principal Architect',
    bio: 'Nairobi-based visual artist working primarily in paint and pencil. He trained as an architect at the Technical University of Kenya, and that background shows in how he builds a composition — structure and proportion worked out before color is ever allowed to soften it.',
    photo: { id: 'aa', alt: 'Portrait of Lenny Kariuki' },
  },
  { name: 'George Ngugi', role: 'Web Developer', photo: { id: 'george', alt: 'Portrait of George Ngugi' } },
];

export const stats = [
  { value: 40, suffix: '+', label: 'Projects Completed' },
  { value: 12, suffix: '', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];
