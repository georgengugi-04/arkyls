import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/** Masked word-by-word rise for headings. Text stays real text (accessible, selectable). */
export function LineReveal({ children, delay = 0, stagger = 0.06, trigger = 'mount' }: { children: string; delay?: number; stagger?: number; trigger?: 'mount' | 'view' }) {
  const reduce = useReducedMotion();
  const words = children.split(' ');
  const state = { initial: reduce ? false : { y: '110%' }, transition: (i: number) => ({ duration: 1, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] as const }) };
  const wrap = (i: number, w: string): ReactNode => (
    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      {trigger === 'view' ? (
        <motion.span className="inline-block" initial={state.initial} whileInView={{ y: 0 }} viewport={{ once: true }} transition={state.transition(i)}>{w}</motion.span>
      ) : (
        <motion.span className="inline-block" initial={state.initial} animate={{ y: 0 }} transition={state.transition(i)}>{w}</motion.span>
      )}
      {i < words.length - 1 ? '\u00A0' : ''}
    </span>
  );
  // Visual words are aria-hidden; one plain-text copy gives assistive tech a correct, spaced name.
  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{words.map((w, i) => wrap(i, w))}</span>
    </>
  );
}
