import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';
import { ContactForm } from '@/components/features/ContactForm';
import { site } from '@/data/site';

export default function Contact() {
  const rows = [
    ['Studio', site.address.join(', ')],
    ['Phone', <a key="p" href={site.phoneHref} className="hover:text-accent">{site.phone}</a>],
    ['Email', <a key="e" href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>],
    ['Hours', site.hours],
  ] as const;
  return (
    <>
      <Seo title="Contact" description="Get in touch with ARKYLS to start your architecture or design project." />
      <Section className="pt-[clamp(9rem,16vw,14rem)] pb-[clamp(3rem,6vw,6rem)]">
        <p className="mono mb-8 text-dim"><span className="text-accent">(04)</span> &nbsp;Get in touch</p>
        <h1 className="display text-[clamp(3.25rem,11vw,11rem)]"><LineReveal>Let’s build something together.</LineReveal></h1>
        <p className="mt-8 max-w-lg text-[1.15rem] text-dim">We'd love to hear about your project. Share your vision and we'll respond within 24 hours.</p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-16 border-t border-rule pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl>
              {rows.map(([k, v]) => (
                <div key={k} className="border-b border-rule py-5 first:pt-0"><dt className="mono mb-1 text-dim">{k}</dt><dd className="text-[1.1rem]">{v}</dd></div>
              ))}
            </dl>
            <ul className="mono mt-8 flex gap-6">{site.social.map((s) => <li key={s.label}><a href={s.href} className="text-dim transition-colors hover:text-accent">{s.label} ↗</a></li>)}</ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><ContactForm /></Reveal>
        </div>
      </Section>

      <section className="theme-light border-t border-rule bg-base text-fg">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-16">
          <p className="display text-[clamp(1.75rem,4vw,3.5rem)]">{site.address.join(', ')}</p>
          <Button href={site.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline">Open in Google Maps</Button>
        </div>
      </section>
    </>
  );
}
