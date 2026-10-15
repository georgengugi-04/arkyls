import { Link } from 'react-router-dom';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ArrowRight } from './Icons';

type Variant = 'solid' | 'outline' | 'link';

const base = 'group/btn inline-flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';
const variants: Record<Variant, string> = {
  solid: 'bg-accent px-6 py-4 text-ink hover:bg-fg',
  outline: 'border border-fg/40 px-6 py-4 text-fg hover:border-accent hover:bg-accent hover:text-ink',
  link: 'border-b border-current pb-1 text-fg hover:text-accent',
};

interface Common { variant?: Variant; className?: string; children: ReactNode; arrow?: boolean }
type LinkProps = Common & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;
type AnchorProps = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;
type NativeProps = Common & { to?: undefined; href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/** Polymorphic: router <Link> (`to`), external/hash <a> (`href`) or <button>. */
export function Button(props: LinkProps | AnchorProps | NativeProps) {
  const { variant = 'solid', className, children, arrow = true, ...rest } = props;
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight width={16} height={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </>
  );

  if ('to' in rest && rest.to) {
    const { to, ...a } = rest as Omit<LinkProps, keyof Common>;
    return <Link to={to} className={cls} {...a}>{inner}</Link>;
  }
  if ('href' in rest && rest.href) {
    const { href, ...a } = rest as Omit<AnchorProps, keyof Common>;
    return <a href={href} className={cls} {...a}>{inner}</a>;
  }
  const { to: _t, href: _h, ...b } = rest as Omit<NativeProps, keyof Common>;
  void _t; void _h;
  return <button type="button" className={cls} {...b}>{inner}</button>;
}
