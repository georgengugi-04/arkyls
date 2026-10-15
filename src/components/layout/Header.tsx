import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { nav } from '@/data/site';
import { cn } from '@/lib/cn';

/** Logo mark (transparent PNG keyed from the brand artwork) + wordmark. */
export const Wordmark = ({ className, mark = true }: { className?: string; mark?: boolean }) => (
  <span className={cn('inline-flex items-center gap-3 font-sans text-[1.35rem] font-semibold tracking-[0.28em] text-fg', className)}>
    {mark && <img src="/logo-mark.png" alt="" width={28} height={30} className="h-[30px] w-auto" />}
    ARKYLS
  </span>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className={cn('theme-dark fixed inset-x-0 top-0 z-[100] text-fg transition-colors duration-300', scrolled || open ? 'border-b border-rule bg-ink/85 backdrop-blur-md' : 'border-b border-transparent')}>
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link to="/" aria-label="ARKYLS — home" onClick={() => setOpen(false)}><Wordmark /></Link>

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {nav.filter((n) => n.to !== '/').map((n, i) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => cn('mono group flex gap-2 transition-colors', isActive ? 'text-fg' : 'text-dim hover:text-fg')}>
              {({ isActive }) => (<><span className={cn('transition-colors', isActive ? 'text-accent' : 'group-hover:text-accent')}>0{i + 1}</span>{n.label}</>)}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="mono md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Mobile" initial={{ height: 0 }} animate={{ height: 'calc(100svh - 72px)' }} exit={{ height: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} className="overflow-hidden bg-base md:hidden">
            <ul className="wrap flex h-full flex-col justify-center gap-2 pb-16">
              {nav.map((n, i) => (
                <li key={n.to} className="border-b border-rule">
                  <NavLink to={n.to} end={'end' in n} onClick={() => setOpen(false)} className={({ isActive }) => cn('display flex items-baseline gap-4 py-4 text-[clamp(2.5rem,12vw,4rem)]', isActive ? 'text-accent' : 'text-fg')}>
                    <span className="mono text-dim">0{i}</span>{n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
