import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { LineReveal } from '@/components/effects/LineReveal';
import { Reveal } from '@/components/effects/Reveal';

interface Props { label: string; title: string; body: string; cta: string; secondary?: { to: string; label: string } }

export function CtaBanner({ label, title, body, cta, secondary }: Props) {
  return (
    <Section className="border-t border-rule">
      <p className="mono mb-10 text-dim"><span className="text-accent">(→)</span> &nbsp;{label}</p>
      <h2 className="display max-w-[14ch] text-[clamp(3rem,9vw,9rem)]"><LineReveal trigger="view">{title}</LineReveal></h2>
      <Reveal className="mt-12 flex flex-wrap items-end justify-between gap-8">
        <p className="max-w-md text-[1.1rem] text-dim">{body}</p>
        <div className="flex flex-wrap gap-4">
          <Button to="/contact">{cta}</Button>
          {secondary && <Button to={secondary.to} variant="outline">{secondary.label}</Button>}
        </div>
      </Reveal>
    </Section>
  );
}
