import { useEffect, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, stagger, useAnimate, useReducedMotion } from 'motion/react';
import { transitionFor } from '@/data/transitions';

const PANELS = 6;
const ease = [0.76, 0, 0.24, 1] as const;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Route transition: architectural "louvre" panels close over the page, a short message for the
 * destination is shown, then the panels open on the new page. The outgoing page is held in
 * place (AnimatePresence "wait") until the panels have fully covered it.
 */
export function PageTransition() {
  const { pathname, hash } = useLocation();
  const outlet = useOutlet();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const prev = useRef(pathname);
  const copy = transitionFor(pathname);

  useEffect(() => {
    const goToTarget = (smooth: boolean) => {
      const el = hash ? document.getElementById(hash.slice(1)) : null;
      if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
      else if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    };

    if (prev.current === pathname) { if (hash) goToTarget(true); return; }
    prev.current = pathname;

    const root = scope.current;
    if (reduce || !root) { setTimeout(() => goToTarget(false), 160); return; }

    let live = true;
    const origin = (o: string) => animate('[data-panel]', { transformOrigin: o }, { duration: 0 });

    (async () => {
      await animate(root, { visibility: 'visible' }, { duration: 0 });
      await origin('50% 100%');
      await animate('[data-panel]', { scaleY: [0, 1] }, { duration: 0.45, delay: stagger(0.045, { from: 'center' }), ease });
      if (!live) return;
      await sleep(80); // new page mounts behind the panels
      goToTarget(false);
      animate('[data-msg]', { opacity: [0, 1], y: [28, 0] }, { duration: 0.55, ease: [0.16, 1, 0.3, 1] });
      await sleep(900);
      await animate('[data-msg]', { opacity: 0, y: -16 }, { duration: 0.25 });
      await origin('50% 0%');
      await animate('[data-panel]', { scaleY: [1, 0] }, { duration: 0.55, delay: stagger(0.045, { from: 'center' }), ease });
      await animate(root, { visibility: 'hidden' }, { duration: 0 });
    })();
    return () => { live = false; };
  }, [pathname, hash, reduce, animate, scope]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={pathname} exit={{ opacity: 0.999 }} transition={{ duration: reduce ? 0.12 : 0.62 }}>
          {outlet}
        </motion.div>
      </AnimatePresence>

      <div ref={scope} aria-hidden="true" className="theme-dark pointer-events-none invisible fixed inset-0 z-[150]" style={{ visibility: 'hidden' }}>
        <div className="absolute inset-0 flex">
          {Array.from({ length: PANELS }, (_, i) => (
            <div key={i} data-panel style={{ transform: 'scaleY(0)' }} className="h-full flex-1 bg-base outline outline-1 -outline-offset-1 outline-rule" />
          ))}
        </div>
        <div data-msg className="absolute inset-0 flex flex-col justify-center gap-5 p-[clamp(1.25rem,4vw,3.5rem)] opacity-0">
          <p className="mono text-accent">({copy.index}) &nbsp;{copy.title}</p>
          <p className="display max-w-[16ch] text-[clamp(2.5rem,7vw,6.5rem)] text-fg">{copy.message}</p>
        </div>
      </div>
    </>
  );
}
