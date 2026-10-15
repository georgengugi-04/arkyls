import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps { children: ReactNode; className?: string; theme?: 'dark' | 'light'; id?: string; as?: ElementType; flush?: boolean }

/** Full-bleed band that sets the colour theme for everything inside it. */
export function Section({ children, className, theme = 'dark', id, as: Tag = 'section', flush }: SectionProps) {
  return (
    <Tag id={id} className={cn(theme === 'light' ? 'theme-light' : 'theme-dark', 'bg-base text-fg', !flush && 'py-[clamp(5rem,10vw,10rem)]', className)}>
      <div className="wrap">{children}</div>
    </Tag>
  );
}

/** Numbered section header: "(02) Selected work" on the left, title on the right. */
export function SectionHead({ index, label, title, aside }: { index: string; label: string; title?: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-[clamp(2.5rem,5vw,5rem)] grid gap-6 border-t border-rule pt-5 lg:grid-cols-12">
      <p className="mono text-dim lg:col-span-3"><span className="text-accent">({index})</span> &nbsp;{label}</p>
      {title && <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] lg:col-span-7">{title}</h2>}
      {aside && <div className="lg:col-span-2 lg:justify-self-end">{aside}</div>}
    </div>
  );
}
