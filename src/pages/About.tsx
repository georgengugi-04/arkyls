import { Seo } from '@/components/ui/Seo';
import { Photo } from '@/components/ui/Photo';
import { Section, SectionHead } from '@/components/ui/Section';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';
import { CtaBanner } from '@/components/features/CtaBanner';
import { team, values, type Member } from '@/data/about';
import { site } from '@/data/site';

const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2);

function Portrait({ m }: { m: Member }) {
  return (
    <div className="mb-5 aspect-[4/5] overflow-hidden bg-raise">
      {m.photo ? <Photo photo={m.photo} sizes="(min-width: 768px) 30vw, 100vw" className="object-[50%_25%] grayscale transition duration-700 group-hover:grayscale-0" /> : <div aria-hidden className="blueprint grid h-full place-items-center display text-[6rem] text-fg/25">{initials(m.name)}</div>}
    </div>
  );
}

export default function About() {
  return (
    <>
      <Seo title="About" description="ARKYLS is a Nairobi architecture studio founded in 2023, blending bold design with sustainable principles." />
      <Section className="pt-[clamp(9rem,16vw,14rem)] pb-[clamp(3rem,6vw,6rem)]">
        <p className="mono mb-8 text-dim"><span className="text-accent">(03)</span> &nbsp;Our story</p>
        <h1 className="display text-[clamp(3.25rem,11vw,11rem)]"><LineReveal>Architecture with purpose.</LineReveal></h1>
      </Section>

      <Section theme="light">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            <div className="aspect-[3/4] overflow-hidden bg-raise"><Photo photo={{ id: '7', alt: 'Interior render from the ARKYLS studio' }} sizes="(min-width: 1024px) 40vw, 100vw" /></div>
            <p className="mono mt-3 flex justify-between text-dim"><span>Founded</span><span className="text-fg">{site.founded}</span></p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="mono mb-6 text-dim"><span className="text-accent">(a)</span> &nbsp;Who we are</p>
            <h2 className="display mb-8 text-[clamp(2.25rem,4.5vw,4.25rem)]">A studio built on passion.</h2>
            <p className="mb-6 text-[1.15rem] leading-relaxed">Founded in {site.founded}, ARKYLS emerged from a vision to redefine architectural excellence in East Africa and beyond. We believe every space tells a story — and our mission is to craft narratives that inspire, connect, and transform lives.</p>
            <p className="mb-12 text-[1.15rem] leading-relaxed text-dim">Our approach blends cutting-edge design with sustainable principles, creating environments that are not just structures, but living ecosystems that evolve with their inhabitants.</p>
            <div className="grid border-t border-rule sm:grid-cols-2">
              {[['Mission', 'Deliver exceptional architectural solutions that blend creativity, functionality, and sustainability.'], ['Vision', 'Redefine the built environment through innovative design and cutting-edge technology.']].map(([t, b]) => (
                <div key={t} className="border-b border-rule py-6 sm:border-r sm:pr-8 sm:last:border-r-0 sm:last:pl-8"><p className="mono mb-3 text-accent">{t}</p><p className="text-dim">{b}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead index="01" label="What drives us" title="Core values" />
        <ul className="grid border-t border-rule md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 2) * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              <span className="mono text-accent">0{i + 1}</span>
              <div><h3 className="display mb-3 text-[1.9rem]">{v.title}</h3><p className="text-dim">{v.text}</p></div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section theme="light" id="team">
        <SectionHead index="02" label="The people behind ARKYLS" title="Team" />
        <ul className="grid gap-x-8 gap-y-12 md:max-w-4xl md:grid-cols-2">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.1} className="group">
              <Portrait m={m} />
              <h3 className="display text-[1.75rem]">{m.name}</h3>
              <p className="mono mt-1 text-dim">{m.role}</p>
              {m.bio && <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-dim">{m.bio}</p>}
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBanner label="Work with us" title="Have a project in mind?" body="Let's talk about your vision. We'd love to hear how we can help you create something remarkable." cta="Get in touch" />
    </>
  );
}
