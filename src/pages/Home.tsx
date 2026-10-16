import { lazy, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Section, SectionHead } from '@/components/ui/Section';
import { ArrowDown } from '@/components/ui/Icons';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';
import { CountUp } from '@/components/effects/CountUp';
import { Scene } from '@/components/three/Scene';
import { Poster } from '@/components/features/Poster';
import { ProjectIndex } from '@/components/features/ProjectIndex';
import { ServiceRow } from '@/components/features/ServiceRow';
import { CtaBanner } from '@/components/features/CtaBanner';
import { featured } from '@/data/projects';
import { services } from '@/data/services';
import { stats } from '@/data/about';
import { site } from '@/data/site';
import { introSeen } from '@/lib/intro';
import { scrollToId } from '@/lib/scroll';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));
const parts = ['Roof garden', 'Floor plates', 'Service core', 'Glazing'];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const pct = useTransform(scrollYProgress, (v) => String(Math.round(Math.min(1, v * 1.6) * 100)).padStart(3, '0') + '%');
  const hint = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="theme-dark relative h-[230svh] bg-base text-fg max-md:h-[155svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="blueprint absolute inset-0" />
        <Scene fallback={<Poster alt="Render of an ARKYLS site plan" />}>
          <HeroScene progress={scrollYProgress} className="absolute inset-0 cursor-grab active:cursor-grabbing pointer-coarse:pointer-events-none" />
        </Scene>

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-[clamp(1.25rem,4vh,3rem)] pt-[88px]">
          <div className="wrap mono flex justify-between text-dim">
            <span>{site.tagline}</span>
            <span className="hidden sm:block">1°17′S 36°49′E</span>
            <span className="hidden md:block">Scale 1:200</span>
          </div>

          <div className="wrap grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h1 className="display text-[clamp(3.25rem,10.5vw,10.5rem)]"><LineReveal delay={introSeen() ? 0.25 : 2.7}>Spaces built to endure.</LineReveal></h1>
              <p className="mt-6 max-w-lg text-[clamp(1rem,1.5vw,1.2rem)] text-dim">Innovative design and sustainable solutions — architecture drawn in Nairobi for places that last.</p>
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-4"><Button to="/projects">Explore our work</Button><Button to="/about" variant="outline">Our story</Button></div>
            </div>
            <div className="mono hidden text-dim lg:col-span-3 lg:block lg:justify-self-end">
              <p className="mb-3 text-fg">Exploded view <motion.span className="text-accent">{pct}</motion.span></p>
              <ul className="space-y-1.5 border-t border-rule pt-3">{parts.map((p, i) => <li key={p}><span className="text-accent">{String.fromCharCode(65 + i)}</span> &nbsp;{p}</li>)}</ul>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToId('studio')}
          aria-label="Scroll down to the studio section"
          className="mono absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 text-fg sm:right-8"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="grid size-12 animate-bob place-items-center border border-fg/50 bg-ink/60 backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-ink"><ArrowDown width={18} /></span>
        </button>

        <motion.div style={{ opacity: hint }} aria-hidden className="mono absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bob items-center gap-2 text-dim md:flex"><span className="hidden pointer-fine:inline">Drag to orbit · </span>scroll to explode <ArrowDown width={14} /></motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />

      <Section theme="light" id="studio">
        <SectionHead index="01" label="Studio" />
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="display text-[clamp(1.9rem,4vw,3.9rem)] !leading-[1.08] lg:col-span-9">
            <LineReveal trigger="view" stagger={0.02}>{`ARKYLS is a Nairobi architecture studio founded by Lenny Kariuki in ${site.founded}. We pair rigorous design with sustainable principles — environments that are more than structures.`}</LineReveal>
          </p>
          <Reveal className="lg:col-span-3 lg:self-end"><Button to="/about" variant="link">Meet the team</Button></Reveal>
        </div>
        <dl className="mt-20 grid border-t border-rule sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2 border-b border-rule py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0">
              <dt className="mono text-dim">{s.label}</dt>
              <dd className="display text-[clamp(3.5rem,7vw,6.5rem)]"><CountUp to={s.value} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHead index="02" label="Selected work" title="Projects" aside={<Button to="/projects" variant="link">View all</Button>} />
        <ProjectIndex projects={featured} />
      </Section>

      <Section theme="light">
        <SectionHead index="03" label="Services" title="What we do" aside={<Button to="/services" variant="link">All services</Button>} />
        <ul>{services.slice(0, 4).map((s, i) => <ServiceRow key={s.slug} service={s} index={i} />)}</ul>
      </Section>

      <CtaBanner label="Start a project" title="Have a plot and an idea?" body="Share your vision with us. We'll turn it into spaces that inspire for generations." cta="Start your project" />
    </>
  );
}
