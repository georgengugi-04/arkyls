import { site } from '@/data/site';

/** React 19 hoists <title>/<meta> rendered anywhere into <head>, so no helmet library is needed. */
export function Seo({ title, description }: { title?: string; description?: string }) {
  const full = title ? `${title} | ${site.name}` : `${site.name} | Architecture & Design`;
  const desc = description ?? site.description;
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
    </>
  );
}
