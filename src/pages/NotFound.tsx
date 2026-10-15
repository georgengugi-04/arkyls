import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section className="grid min-h-svh content-center">
      <Seo title="Page not found" />
      <p className="mono mb-6 text-accent">Error 404</p>
      <h1 className="display mb-8 max-w-[12ch] text-[clamp(3.25rem,10vw,10rem)]">This plot isn't on the plan.</h1>
      <div><Button to="/">Back to the studio</Button></div>
    </Section>
  );
}
