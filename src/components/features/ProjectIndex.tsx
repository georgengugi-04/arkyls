import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { Project } from '@/data/projects';
import { Photo } from '@/components/ui/Photo';
import { ArrowRight } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

/** Typographic project list; on pointer devices a cover image trails the cursor. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  return (
    <>
      <ul onMouseMove={(e) => { x.set(e.clientX + 28); y.set(e.clientY - 120); }} onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-rule last:border-b">
            <Link to={`/projects#${p.slug}`} onMouseEnter={() => setActive(p)} onFocus={() => setActive(p)} onBlur={() => setActive(null)} className={cn('group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 transition-opacity duration-300 md:grid-cols-12 md:py-8', active && active.slug !== p.slug && 'md:opacity-35')}>
              <span className="mono text-dim md:col-span-1">0{i + 1}</span>
              <span className="display text-[clamp(1.75rem,4.2vw,4rem)] transition-transform duration-500 group-hover:translate-x-3 md:col-span-6">{p.title}</span>
              <span className="mono hidden text-dim md:col-span-3 md:block">{p.category}</span>
              <span className="mono flex items-center justify-end gap-3 text-dim md:col-span-2">{p.year}<ArrowRight width={16} className="text-accent opacity-0 transition-opacity group-hover:opacity-100" /></span>
            </Link>
          </li>
        ))}
      </ul>
      {!reduce && (
        <AnimatePresence>
          {active && (
            <motion.div key={active.slug} aria-hidden style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }} className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/3] w-[340px] overflow-hidden border border-rule md:block">
              <Photo photo={active.cover} sizes="340px" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
