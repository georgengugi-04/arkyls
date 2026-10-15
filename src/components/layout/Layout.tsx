import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Intro } from './Intro';
import { PageTransition } from './PageTransition';
import { ArrowUp } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={cn('fixed bottom-6 right-6 z-40 grid size-12 place-items-center bg-accent text-ink transition-all duration-300 hover:bg-paper', show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0')}>
      <ArrowUp width={18} />
    </button>
  );
}

export function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-accent focus:px-5 focus:py-2 focus:font-semibold focus:text-ink">Skip to content</a>
      <Intro />
      <Header />
      <main id="main"><PageTransition /></main>
      <Footer />
      <BackToTop />
    </>
  );
}
