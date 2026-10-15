import { Photo } from '@/components/ui/Photo';

/** Static stand-in for 3D scenes: shown while WebGL loads, or where it isn't available. */
export function Poster({ id = '00', alt = '' }: { id?: string; alt?: string }) {
  return (
    <div className="absolute inset-0">
      <Photo photo={{ id, alt }} priority sizes="100vw" className="opacity-50 grayscale" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-base/60" />
    </div>
  );
}
