import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface Props {
  /** Words (or <em> nodes) to animate in sequence. */
  words: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Word-by-word blur-in headline, in the spirit of React Bits' "Blur Text". */
export function BlurText({ words, className, delay = 0.1, stagger = 0.07 }: Props) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={reduce ? false : { opacity: 0, filter: 'blur(12px)', y: 24 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}
