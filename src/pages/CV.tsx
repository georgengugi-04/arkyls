import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Section, SectionHead } from '@/components/ui/Section';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';
import { CtaBanner } from '@/components/features/CtaBanner';
import { cv, education, experience, skills } from '@/data/cv';

export default function CV() {
  return (
    <>
      <Seo title="Curriculum Vitae" description={`${cv.name}, ${cv.role}. Experience, education and skills.`} />

      <Section className="pt-[clamp(9rem,16vw,14rem)] pb-[clamp(3rem,6vw,6rem)]">
        <p className="mono mb-8 text-dim"><span className="text-accent">(06)</span> &nbsp;Curriculum vitae</p>
        <h1 className="display text-[clamp(3.25rem,11vw,11rem)]"><LineReveal>{cv.name}</LineReveal></h1>
        <p className="mono mt-6 text-dim">{cv.role}</p>
        <p className="mt-10 max-w-2xl text-[1.15rem] text-dim">{cv.summary}</p>
        <ul className="mono mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {cv.links.map((l) => (<li key={l.label}>{l.href ? <a href={l.href} target="_blank" rel="noreferrer" className="text-dim transition-colors hover:text-accent">{l.label} ↗</a> : <span className="text-dim">{l.label}</span>}</li>))}
        </ul>
      </Section>

      <Section theme="light">
        <SectionHead index="01" label="Where Lenny has worked" title="Experience" />
        <ol className="border-t border-rule">
          {experience.map((r, i) => (
            <Reveal as="li" key={`${r.period}-${r.org}`} delay={(i % 3) * 0.05} className="grid gap-4 border-b border-rule py-8 lg:grid-cols-12">
              <p className="mono text-dim lg:col-span-3">{r.period}</p>
              <div className="lg:col-span-9">
                <h3 className="display text-[1.6rem]">{r.title}</h3>
                <p className="mono mt-1 text-accent">{r.org}</p>
                <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-dim">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead index="02" label="Training" title="Education" />
        <ul className="border-t border-rule">
          {education.map((e) => (
            <li key={e.period} className="grid gap-4 border-b border-rule py-8 lg:grid-cols-12">
              <p className="mono text-dim lg:col-span-3">{e.period}</p>
              <div className="lg:col-span-9"><h3 className="display text-[1.6rem]">{e.title}</h3><p className="mono mt-1 text-accent">{e.org}</p></div>
            </li>
          ))}
        </ul>
      </Section>

      <Section theme="light">
        <SectionHead index="03" label="What Lenny brings" title="Skills & interests" />
        <dl className="grid gap-x-10 gap-y-10 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}><dt className="mono mb-4 text-accent">{group}</dt><dd><ul className="space-y-2 text-dim">{items.map((s) => <li key={s}>{s}</li>)}</ul></dd></div>
          ))}
        </dl>
        <p className="mt-12 text-dim">Referees are available on request. <Button to="/contact" variant="link">Get in touch</Button></p>
      </Section>

      <CtaBanner label="Work with us" title="Have a project in mind?" body="Tell us about your site and your brief. We will draw it, walk you through it, and refine it together." cta="Contact us" secondary={{ to: '/portfolio', label: 'See the portfolio' }} />
    </>
  );
}
