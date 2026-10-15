import type { Project } from '@/data/projects';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/effects/Reveal';
import { cn } from '@/lib/cn';

/** Image-led tile with a technical caption. Spans vary by position for an editorial rhythm. */
export function ProjectTile({ project, index }: { project: Project; index: number }) {
  const wide = index % 4 === 0 || index % 4 === 3;
  return (
    <Reveal as="li" className={cn('group scroll-mt-24', wide ? 'md:col-span-7' : 'md:col-span-5')}>
      <article id={project.slug}>
        <div className={cn('relative overflow-hidden bg-raise', wide ? 'aspect-[16/10]' : 'aspect-[4/5]')}>
          <Photo photo={project.cover} sizes="(min-width: 768px) 58vw, 100vw" className="transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" />
          <span className="mono absolute left-4 top-4 bg-ink px-2 py-1 text-paper">0{index + 1}</span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-rule pb-4">
          <h3 className="display text-[clamp(1.5rem,2.6vw,2.25rem)]">{project.title}</h3>
          <p className="mono shrink-0 text-dim">{project.category} · {project.year}</p>
        </div>
        <p className="mt-3 max-w-md text-[0.95rem] text-dim">{project.summary}</p>
      </article>
    </Reveal>
  );
}
