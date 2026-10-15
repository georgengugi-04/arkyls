import { useRef, type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/cn';

/** Card with a cursor-following emerald spotlight (React Bits "Spotlight Card" style). */
export function SpotlightCard({ className, children, onMouseMove, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-card transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-line-strong',
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(16 185 129 / 0.14), transparent 60%)' }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
