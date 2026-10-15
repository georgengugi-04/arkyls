import { lazy, useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { Seo } from '@/components/ui/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { Check } from '@/components/ui/Icons';
import { LineReveal } from '@/components/effects/LineReveal';
import { Scene } from '@/components/three/Scene';
import { Poster } from '@/components/features/Poster';
import { ServiceRow } from '@/components/features/ServiceRow';
import { CtaBanner } from '@/components/features/CtaBanner';
import { process, promises, services } from '@/data/services';
import { cn } from '@/lib/cn';

const ConstructionScene = lazy(() => import('@/components/three/ConstructionScene'));

function Step({ i, title, text, active, onEnter }: { i: number; title: string; text: string; active: boolean; onEnter: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => { if (inView) onEnter(i); }, [inView, i, onEnter]);
  return (
    <li ref={ref} className={cn('flex min-h-[55svh] flex-col justify-center border-t border-rule transition-opacity duration-500 lg:min-h-[70svh]', active ? 'opacity-100' : 'opacity-30')}>
      <p className="mono mb-4 text-accent">Stage 0{i + 1}</p>
      <h3 className="display mb-4 text-[clamp(2.25rem,5vw,4.5rem)]">{title}</h3>
      <p className="max-w-md text-[1.1rem] text-dim">{text}</p>
    </li>
  );
}

export default function Services() {
  const [stage, setStage] = useState(0);
  return (
    <>
      <Seo title="Services" description="Residential, commercial, sustainable, urban planning, interior and landscape architecture services." />
      <Section className="pt-[clamp(9rem,16vw,14rem)] pb-[clamp(3rem,6vw,6rem)]">
        <p className="mono mb-8 text-dim"><span className="text-accent">(02)</span> &nbsp;What we offer</p>
        <h1 className="display text-[clamp(3.25rem,11vw,11rem)]"><LineReveal>From concept to creation.</LineReveal></h1>
        <ul className="mono mt-12 flex flex-wrap gap-x-10 gap-y-3 text-dim">{promises.map((p) => <li key={p} className="flex items-center gap-2"><Check width={14} className="text-accent" />{p}</li>)}</ul>
      </Section>

      <Section id="process" flush className="border-t border-rule pt-[clamp(4rem,8vw,8rem)]">
        <SectionHead index="01" label="Design process" title="How a building gets made." />
        <div className="grid gap-x-16 lg:grid-cols-2">
          <div className="sticky top-[72px] z-10 order-first h-[42svh] border-b border-rule bg-base lg:order-last lg:top-24 lg:h-[72svh] lg:border lg:border-rule">
            <div aria-hidden className="blueprint absolute inset-0" />
            <Scene fallback={<Poster id="b1" alt="" />}>
              <ConstructionScene stage={stage} className="absolute inset-0" />
            </Scene>
            <p className="mono pointer-events-none absolute bottom-4 left-4 text-dim">Stage 0{stage + 1} / 04 — {process[stage]?.title}</p>
          </div>
          <ol className="pb-24">{process.map((s, i) => <Step key={s.title} i={i} title={s.title} text={s.text} active={stage === i} onEnter={setStage} />)}</ol>
        </div>
      </Section>

      <Section theme="light" id="services">
        <SectionHead index="02" label="Comprehensive services" title="Architecture for every vision." />
        <ul>{services.map((s, i) => <ServiceRow key={s.slug} service={s} index={i} detailed />)}</ul>
      </Section>

      <CtaBanner label="Let's collaborate" title="Ready to start your project?" body="Tell us about your vision. We'll craft a tailored solution that exceeds your expectations." cta="Contact us" secondary={{ to: '/projects', label: 'View projects' }} />
    </>
  );
}
