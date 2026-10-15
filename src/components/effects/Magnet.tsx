import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';

/** Wrapper that gently pulls its child toward the cursor ("Magnet" effect). */
export function Magnet({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div className={className} style={{ x: sx, y: sy, display: 'inline-block' }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}
