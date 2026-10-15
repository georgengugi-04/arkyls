import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { Photo as PhotoData } from '@/lib/img';
import { cn } from '@/lib/cn';
import { Photo } from './Photo';
import { ArrowLeft, ArrowRight } from './Icons';

/** Embla-powered gallery slider: swipe, keyboard buttons, dots, autoplay that pauses on hover/focus. */
export function Slider({ photos, onOpen, autoplayMs = 4500 }: { photos: PhotoData[]; onOpen?: (i: number) => void; autoplayMs?: number }) {
  const [viewport, api] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const onSelect = useCallback(() => { if (api) setSelected(api.selectedScrollSnap()); }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on('select', onSelect).on('reInit', onSelect);
    return () => { api.off('select', onSelect).off('reInit', onSelect); };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || paused || reduce) return;
    const id = setInterval(() => api.scrollNext(), autoplayMs);
    return () => clearInterval(id);
  }, [api, paused, reduce, autoplayMs]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        <div ref={viewport} className="overflow-hidden">
          <div className="flex">
            {photos.map((p, i) => (
              <div key={p.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${photos.length}`} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/2 pr-4">
                <button type="button" onClick={() => onOpen?.(i)} className="block aspect-[4/3] w-full cursor-zoom-in overflow-hidden" aria-label={`Open image ${i + 1} full screen`}>
                  <Photo photo={p} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-700 hover:scale-105" />
                </button>
              </div>
            ))}
          </div>
        </div>
        {(['prev', 'next'] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
            onClick={() => (dir === 'prev' ? api?.scrollPrev() : api?.scrollNext())}
            className={cn('absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-ink/80 text-paper backdrop-blur transition hover:bg-accent hover:text-ink', dir === 'prev' ? 'left-3' : 'right-3')}
          >
            {dir === 'prev' ? <ArrowLeft width={20} /> : <ArrowRight width={20} />}
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {photos.map((p, i) => (
          <button key={p.id} type="button" aria-label={`Go to slide ${i + 1}`} aria-current={i === selected} onClick={() => api?.scrollTo(i)} className={cn('h-[3px] transition-all', i === selected ? 'w-10 bg-accent' : 'w-5 bg-fg/25 hover:bg-fg/50')} />
        ))}
      </div>
    </div>
  );
}
