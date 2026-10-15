import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';

/** 3D tilt on hover — a lightweight take on React Bits' "Tilted Card". */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 180, damping: 20 });
  const spy = useSpring(py, { stiffness: 180, damping: 20 });
  const rotateY = useTransform(spx, [0, 1], [-7, 7]);
  const rotateX = useTransform(spy, [0, 1], [7, -7]);

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { px.set(0.5); py.set(0.5); };

  return (
    <div style={{ perspective: 1000 }} className={className} onMouseMove={move} onMouseLeave={leave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}
