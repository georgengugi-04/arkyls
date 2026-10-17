import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LineReveal } from '@/components/effects/LineReveal';
import { site } from '@/data/site';
import { INTRO_KEY as KEY, introSeen } from '@/lib/intro';


/** Welcome screen: once per browser session. Click, Esc or "Skip" dismisses it. */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !introSeen());
  const [pct, setPct] = useState(0);

  const close = useCallback(() => {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode */ }
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    const total = reduce ? 1200 : 3000;
    const t = setTimeout(close, total);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => { setPct(Math.min(100, Math.round(((now - start) / (total - 400)) * 100))); if (now - start < total) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); };
  }, [show, reduce, close]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Welcome to ARKYLS"
          className="theme-dark blueprint fixed inset-0 z-[200] flex flex-col justify-between bg-base p-[clamp(1.25rem,4vw,3.5rem)] text-fg"
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onClick={close}
        >
          <div className="mono flex items-start justify-between text-dim">
            <span>{site.name} — Architecture &amp; Design</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); close(); }} className="hover:text-accent">Skip ↗</button>
          </div>

          <div>
            <img src="/logo-mark.png" alt="" width={72} height={76} className="mb-8 h-[clamp(3.5rem,7vw,5.5rem)] w-auto" />
            <p className="mono mb-6 text-accent">Nairobi · 1°17′S 36°49′E</p>
            <p className="display text-[clamp(3rem,11vw,10.5rem)]" aria-hidden>
              <span className="block"><LineReveal delay={0.2}>Welcome to</LineReveal></span>
              <span className="block"><LineReveal delay={0.5}>ARKYLS</LineReveal></span>
            </p>
          </div>

          <div>
            <div className="mono mb-3 flex justify-between text-dim"><span>Loading studio</span><span>{String(pct).padStart(3, '0')}</span></div>
            <div className="h-px w-full bg-rule"><div className="h-px bg-accent" style={{ width: `${pct}%` }} /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
