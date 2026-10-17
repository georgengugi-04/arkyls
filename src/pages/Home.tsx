import { lazy, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
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

const slides = [
  { id: '00', alt: 'Aerial render of a courtyard residence with sports court' },
  { id: 'a2', alt: 'A-frame house render on a grassy plot' },
  { id: 'b6', alt: 'Apartment block render at golden hour' },
  { id: 'c1', alt: 'Courtyard between two building wings with rooftop solar' },
  { id: '202', alt: 'Two-storey building with glazed entrance core' },
];

/** Standard one-screen hero: cross-fading project renders behind the headline. No scroll hijacking. */
function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="theme-dark relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-base text-fg">
      <div aria-hidden className="absolute inset-0">
        {slides.map((sl, i) => (
          <motion.div key={sl.id} className="absolute inset-0" initial={false} animate={{ opacity: i === active ? 1 : 0, scale: reduce ? 1 : i === active ? 1.08 : 1 }} transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: 'linear' } }}>
            <Photo photo={{ id: sl.id, alt: '' }} priority={i === 0} sizes="100vw" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/70" />
        <div className="blueprint absolute inset-0 opacity-60" />
      </div>

      <div className="wrap mono relative flex justify-between pt-[96px] text-fg/70">
        <span>{site.tagline}</span>
        <span className="hidden sm:block">1°17′S 36°49′E</span>
      </div>

      <div className="wrap relative pb-[clamp(2rem,6vh,4rem)]">
        <h1 className="display text-[clamp(3.25rem,10.5vw,10.5rem)]"><LineReveal delay={introSeen() ? 0.25 : 2.7}>Spaces built to endure.</LineReveal></h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="max-w-lg text-[clamp(1rem,1.5vw,1.2rem)] text-fg/75">Innovative design and sustainable solutions — architecture drawn in Nairobi for places that last.</p>
            <div className="mt-8 flex flex-wrap gap-4"><Button to="/projects">Explore our work</Button><Button to="/about" variant="outline">Our story</Button></div>
          </div>
          <div className="flex items-center gap-6">
            <div className="mono flex items-center gap-3 text-fg/70" role="group" aria-label="Hero images">
              <span>{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
              <span className="flex gap-1.5">
                {slides.map((sl, i) => <button key={sl.id} type="button" aria-label={`Show image ${i + 1}`} aria-current={i === active} onClick={() => setActive(i)} className={`h-[3px] transition-all ${i === active ? 'w-8 bg-accent' : 'w-4 bg-fg/30 hover:bg-fg/60'}`} />)}
              </span>
            </div>
            <button type="button" onClick={() => scrollToId('studio')} aria-label="Scroll down to the studio section" className="mono group flex items-center gap-3 text-fg">
              Scroll
              <span className="grid size-12 animate-bob place-items-center border border-fg/50 bg-ink/60 backdrop-blur transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink"><ArrowDown width={18} /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const parts = ['Roof garden', 'Floor plates', 'Service core', 'Glazing'];

/** In-flow 3D section: the building separates into floor plates as this block scrolls through the viewport. */
function Anatomy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 35%'] });
  const explode = useTransform(scrollYProgress, [0.1, 0.75], [0, 1], { clamp: true });
  const pct = useTransform(explode, (v) => String(Math.round(v * 100)).padStart(3, '0') + '%');

  return (
    <Section theme="dark" as="section" className="!py-[clamp(4rem,8vw,8rem)]">
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <SectionHead index="02" label="Building anatomy" title="Every floor, drawn apart." />
        <div className="grid gap-px border border-rule bg-rule lg:grid-cols-12">
          <div className="relative h-[60svh] min-h-[380px] bg-base lg:col-span-8 lg:h-[72svh]">
            <div aria-hidden className="blueprint absolute inset-0" />
            <Scene fallback={<Poster id="b6" alt="" />}>
              <HeroScene progress={explode} className="absolute inset-0 cursor-grab active:cursor-grabbing pointer-coarse:pointer-events-none" />
            </Scene>
          </div>
          <div className="flex flex-col justify-between gap-10 bg-base p-6 lg:col-span-4 lg:p-8">
            <div>
              <p className="mono mb-3 text-dim">Exploded view <motion.span className="text-accent">{pct}</motion.span></p>
              <p className="text-[1.05rem] text-dim">Scroll and the model comes apart into its layers. On a computer you can also drag it to orbit.</p>
            </div>
            <ul className="mono space-y-2 border-t border-rule pt-4">{parts.map((p, i) => <li key={p}><span className="text-accent">{String.fromCharCode(65 + i)}</span> &nbsp;{p}</li>)}</ul>
          </div>
        </div>
      </div>
    </Section>
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

      <Anatomy />

      <Section>
        <SectionHead index="03" label="Selected work" title="Projects" aside={<Button to="/projects" variant="link">View all</Button>} />
        <ProjectIndex projects={featured} />
      </Section>

      <Section theme="light">
        <SectionHead index="04" label="Services" title="What we do" aside={<Button to="/services" variant="link">All services</Button>} />
        <ul>{services.slice(0, 4).map((s, i) => <ServiceRow key={s.slug} service={s} index={i} />)}</ul>
      </Section>

      <CtaBanner label="Start a project" title="Have a plot and an idea?" body="Share your vision with us. We'll turn it into spaces that inspire for generations." cta="Start your project" />
    </>
  );
}
