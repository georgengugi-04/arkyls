import { lazy, useState } from 'react';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Section, SectionHead } from '@/components/ui/Section';
import { Slider } from '@/components/ui/Slider';
import { Lightbox } from '@/components/ui/Lightbox';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';
import { Scene } from '@/components/three/Scene';
import type { ModelKind } from '@/components/three/ViewerScene';
import { ProjectTile } from '@/components/features/ProjectTile';
import { Poster } from '@/components/features/Poster';
import { CtaBanner } from '@/components/features/CtaBanner';
import { archive, kiserian, projects } from '@/data/projects';
import { cn } from '@/lib/cn';

const ViewerScene = lazy(() => import('@/components/three/ViewerScene'));
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))] as const;
const models: { kind: ModelKind; label: string; note: string }[] = [
  { kind: 'tower', label: 'Mid-rise', note: 'Six-storey frame with cantilevered balconies and a service core.' },
  { kind: 'aframe', label: 'A-frame', note: 'Glazed gable, mezzanine and timber deck on a sloping plot.' },
  { kind: 'villa', label: 'Courtyard villa', note: 'L-plan single storey with cantilevered roof, deck and pool.' },
];

function ModelStudio() {
  const [kind, setKind] = useState<ModelKind>('tower');
  const [sun, setSun] = useState(35);
  const [exploded, setExploded] = useState(false);
  const current = models.find((m) => m.kind === kind)!;

  return (
    <Section id="model-studio">
      <SectionHead index="02" label="Model studio" title="Walk around the massing." />
      <div className="grid gap-px border border-rule bg-rule lg:grid-cols-12">
        <div className="relative min-h-[420px] bg-base lg:col-span-9 lg:min-h-[640px]">
          <div aria-hidden className="blueprint absolute inset-0" />
          <Scene fallback={<Poster id="a1" alt="Render of an A-frame house" />}>
            <ViewerScene key={kind} kind={kind} sun={sun} exploded={exploded} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
          </Scene>
          <p className="mono pointer-events-none absolute bottom-4 left-5 text-dim"><span className="pointer-fine:hidden">Swipe sideways to rotate</span><span className="hidden pointer-fine:inline">Drag to orbit</span></p>
        </div>

        <div className="flex flex-col gap-8 bg-base p-6 lg:col-span-3">
          <div>
            <p className="mono mb-3 text-dim">Model</p>
            <div role="radiogroup" aria-label="Model" className="grid gap-px border border-rule bg-rule">
              {models.map((m) => (
                <button key={m.kind} type="button" role="radio" aria-checked={kind === m.kind} onClick={() => { setKind(m.kind); setExploded(false); }} className={cn('mono bg-base px-4 py-3 text-left transition-colors', kind === m.kind ? 'text-accent' : 'text-fg hover:text-accent')}>{m.label}</button>
              ))}
            </div>
            <p className="mt-4 text-[0.95rem] text-dim">{current.note}</p>
          </div>
          <div>
            <label htmlFor="sun" className="mono mb-3 flex justify-between text-dim"><span>Sun angle</span><span className="text-fg">{sun}°</span></label>
            <input id="sun" type="range" min={0} max={360} value={sun} onChange={(e) => setSun(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
          </div>
          {kind === 'tower' && (
            <button type="button" aria-pressed={exploded} onClick={() => setExploded((e) => !e)} className={cn('mono border px-4 py-3 text-left transition-colors', exploded ? 'border-accent bg-accent text-ink' : 'border-rule hover:border-accent')}>Exploded view · {exploded ? 'on' : 'off'}</button>
          )}
          <p className="mono mt-auto text-dim">Generic massing models for exploring form and light — not renderings of specific built projects.</p>
        </div>
      </div>
    </Section>
  );
}

export default function Projects() {
  const [cat, setCat] = useState<(typeof categories)[number]>('All');
  const [lightbox, setLightbox] = useState<{ set: 'kiserian' | 'archive'; index: number } | null>(null);
  const list = cat === 'All' ? projects : projects.filter((p) => p.category === cat);
  const photos = lightbox?.set === 'archive' ? archive : kiserian.gallery;

  return (
    <>
      <Seo title="Projects" description="Selected residential, commercial and sustainable architecture projects by ARKYLS." />
      <Section className="pt-[clamp(9rem,16vw,14rem)] pb-[clamp(3rem,6vw,6rem)]">
        <p className="mono mb-8 text-dim"><span className="text-accent">(01)</span> &nbsp;Portfolio</p>
        <h1 className="display text-[clamp(3.25rem,11vw,11rem)]"><LineReveal>From concept to creation.</LineReveal></h1>
        <p className="mt-8 max-w-lg text-[1.15rem] text-dim">Your ideas. Our drawings. A portfolio of innovative spaces crafted for tomorrow.</p>
      </Section>

      <Section id="projects" className="!pt-0">
        <div role="group" aria-label="Filter projects by category" className="mono mb-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-5">
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn('border-b pb-1 transition-colors', cat === c ? 'border-accent text-fg' : 'border-transparent text-dim hover:text-fg')}>{c}</button>
          ))}
        </div>
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-12">{list.map((p, i) => <ProjectTile key={p.slug} project={p} index={i} />)}</ul>
      </Section>

      <ModelStudio />

      <Section theme="light" id="kiserian">
        <SectionHead index="03" label="Featured project" title={kiserian.title} />
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><div className="aspect-[16/10] overflow-hidden bg-raise"><Photo photo={kiserian.cover} sizes="(min-width: 1024px) 58vw, 100vw" /></div></Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="mb-8 text-[1.15rem] leading-relaxed">{kiserian.lead}</p>
            <dl className="border-t border-rule">
              {kiserian.meta.map((m) => (
                <div key={m.key} className="flex justify-between gap-6 border-b border-rule py-3"><dt className="mono text-dim">{m.key}</dt><dd>{m.value}</dd></div>
              ))}
            </dl>
            <ul className="mono mt-8 space-y-2">{kiserian.features.map((f) => <li key={f} className="flex gap-3"><span aria-hidden className="text-accent">+</span>{f}</li>)}</ul>
          </Reveal>
        </div>
        <Reveal className="mt-20">
          <h3 className="mono mb-6 text-dim">Project gallery</h3>
          <Slider photos={kiserian.gallery} onOpen={(i) => setLightbox({ set: 'kiserian', index: i })} />
        </Reveal>
      </Section>

      <Section>
        <SectionHead index="04" label="Studio archive" title="More renders" />
        <ul className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {archive.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.06} className="bg-base">
              <button type="button" onClick={() => setLightbox({ set: 'archive', index: i })} aria-label={`Open: ${p.alt}`} className="group block aspect-[4/3] w-full cursor-zoom-in overflow-hidden">
                <Photo photo={p} className="transition-transform duration-1000 group-hover:scale-[1.06]" />
              </button>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12"><Button to="/contact" variant="link">Commission a design</Button></div>
      </Section>

      <Lightbox photos={photos} index={lightbox?.index ?? null} onChange={(i) => setLightbox(i === null ? null : { set: lightbox?.set ?? 'kiserian', index: i })} />
      <CtaBanner label="Start your journey" title="Ready to build your dream space?" body="Let's discuss your project. We'll bring your vision to life with craftsmanship and care." cta="Contact us" />
    </>
  );
}
