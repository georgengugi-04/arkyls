import type { Service } from '@/data/services';
import { ServiceGlyph } from '@/components/ui/Icons';
import { Reveal } from '@/components/effects/Reveal';

export function ServiceRow({ service, index, detailed }: { service: Service; index: number; detailed?: boolean }) {
  return (
    <Reveal as="li" className="group border-t border-rule last:border-b">
      <div className="grid gap-x-8 gap-y-4 py-8 transition-colors duration-500 hover:bg-fg/[0.03] md:grid-cols-12 md:py-10">
        <span className="mono text-dim md:col-span-1"><span className="text-accent">0{index + 1}</span></span>
        <h3 className="display flex items-center gap-4 text-[clamp(1.75rem,3.4vw,3rem)] md:col-span-5">
          <ServiceGlyph name={service.icon} width={28} height={28} className="hidden shrink-0 text-accent sm:block" strokeWidth={1.25} />
          {service.title}
        </h3>
        <p className="max-w-md text-[1.02rem] leading-relaxed text-dim md:col-span-3">{detailed ? service.long : service.short}</p>
        {detailed && (
          <ul className="mono space-y-1.5 text-dim md:col-span-3">
            {service.items.map((it) => <li key={it} className="flex gap-2"><span aria-hidden className="text-accent">+</span>{it}</li>)}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
