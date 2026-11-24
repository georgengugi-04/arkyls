import { useState } from 'react';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Section } from '@/components/ui/Section';
import { Lightbox } from '@/components/ui/Lightbox';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';
import { CtaBanner } from '@/components/features/CtaBanner';
import { collections, portfolio, totalViews } from '@/data/portfolio';
import { cn } from '@/lib/cn';

const PREVIEW = 7; // thumbnails shown before the "+N more" tile

export default function Portfolio() {
  const [open, setOpen] = useState<{ slug: string; index: number } | null>(null);
  const active = collections.find((c) => c.slug === open?.slug);

  return (
    <>
      <Seo title="Portfolio" description={`${portfolio.name}: ${collections.length} design studies and ${totalViews} architectural visualisations by ARKYLS, Nairobi.`} />

      <Section className="pt-[clamp(9rem,16vw,14rem)] pb-[clamp(3rem,6vw,6rem)]">
        <p className="mono mb-8 text-dim"><span className="text-accent">(01)</span> &nbsp;{portfolio.name}</p>
        <h1 className="display text-[clamp(3.25rem,11vw,11rem)]"><LineReveal>{portfolio.title}</LineReveal></h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="max-w-xl text-[1.15rem] text-dim lg:col-span-6">{portfolio.intro}</p>
          <dl className="mono grid grid-cols-2 gap-px border border-rule bg-rule lg:col-span-4 lg:col-start-9">
            <div className="bg-base p-5"><dt className="text-dim">Studies</dt><dd className="display mt-2 text-[2.5rem]">{collections.length}</dd></div>
            <div className="bg-base p-5"><dt className="text-dim">Views</dt><dd className="display mt-2 text-[2.5rem]">{totalViews}</dd></div>
          </dl>
        </div>
        <p className="mono mt-8 text-dim">{portfolio.note}</p>
      </Section>

      <nav aria-label="Portfolio collections" className="sticky top-[72px] z-20 border-y border-rule bg-base/90 backdrop-blur theme-dark">
        <ul className="wrap mono flex gap-x-8 overflow-x-auto py-4 text-dim">
          {collections.map((c) => (
            <li key={c.slug} className="shrink-0"><a href={`#${c.slug}`} className="transition-colors hover:text-fg">{c.title}</a></li>
          ))}
        </ul>
      </nav>

      {collections.map((c, n) => {
        const cover = c.photos[0];
        if (!cover) return null;
        const light = n % 2 === 1;
        const rest = c.photos.length - PREVIEW;
        return (
          <Section key={c.slug} id={c.slug} theme={light ? 'light' : 'dark'} className="scroll-mt-32">
            <div className="grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="mono text-dim"><span className="text-accent">({String(n + 1).padStart(2, '0')})</span> &nbsp;{c.category} · {c.photos.length} views</p>
                <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,4.25rem)]">{c.title}</h2>
                <p className="mt-4 text-[1.1rem] text-fg">{c.tagline}</p>
                <p className="mt-6 text-[0.98rem] leading-relaxed text-dim">{c.description}</p>
                <div className="mt-8"><Button type="button" variant="link" onClick={() => setOpen({ slug: c.slug, index: 0 })}>View all {c.photos.length}</Button></div>
              </Reveal>

              <Reveal delay={0.1} className="lg:col-span-8">
                <button type="button" onClick={() => setOpen({ slug: c.slug, index: 0 })} aria-label={`Open ${c.title} gallery`} className="group block aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-raise">
                  <Photo photo={cover} sizes="(min-width: 1024px) 64vw, 100vw" className="transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
                </button>
                <ul className="mt-px grid grid-cols-4 gap-px bg-rule">
                  {c.photos.slice(1, PREVIEW).map((p, i) => (
                    <li key={p.id} className="bg-base">
                      <button type="button" onClick={() => setOpen({ slug: c.slug, index: i + 1 })} aria-label={`Open: ${p.alt}`} className="group block aspect-[4/3] w-full cursor-zoom-in overflow-hidden">
                        <Photo photo={p} sizes="(min-width: 1024px) 16vw, 25vw" className="transition-transform duration-700 group-hover:scale-[1.08]" />
                      </button>
                    </li>
                  ))}
                  {rest > 0 && (
                    <li className="bg-base">
                      <button type="button" onClick={() => setOpen({ slug: c.slug, index: PREVIEW })} className={cn('mono grid aspect-[4/3] w-full place-items-center text-dim transition-colors hover:text-accent')}>+{rest} more</button>
                    </li>
                  )}
                </ul>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Lightbox photos={active?.photos ?? []} index={active ? open!.index : null} onChange={(i) => setOpen(i === null || !open ? null : { slug: open.slug, index: i })} />
      <CtaBanner label="Start your journey" title="Have a plot in mind?" body="Tell us about your site and your brief. We will draw it, walk you through it, and refine it together." cta="Contact us" secondary={{ to: '/projects', label: 'Featured projects' }} />
    </>
  );
}
