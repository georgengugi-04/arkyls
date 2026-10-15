import { useEffect, useRef } from 'react';
import type { Photo as PhotoData } from '@/lib/img';
import { photoSrc } from '@/lib/img';
import { ArrowLeft, ArrowRight, Close } from './Icons';

interface Props {
  photos: PhotoData[];
  index: number | null;
  onChange: (i: number | null) => void;
}

/** Accessible lightbox built on the native <dialog> (focus trap + Esc come for free). */
export function Lightbox({ photos, index, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, photos.length, onChange]);

  const photo = index === null ? null : photos[index];

  return (
    <dialog
      ref={ref}
      aria-label="Image viewer"
      onClose={() => onChange(null)}
      onClick={(e) => { if (e.target === e.currentTarget) onChange(null); }}
      className="m-auto h-screen max-h-none w-screen max-w-none bg-ink/95 p-6 backdrop:bg-black/80"
    >
      {photo && (
        <div className="grid h-full place-items-center">
          <img src={photoSrc(photo.id)} alt={photo.alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
          <p className="absolute bottom-6 mono text-dim" aria-live="polite">{(index ?? 0) + 1} / {photos.length} · {photo.alt}</p>
        </div>
      )}
      <button type="button" aria-label="Close" onClick={() => onChange(null)} className="absolute right-6 top-6 grid size-11 place-items-center bg-paper/10 text-paper transition hover:bg-paper/20"><Close width={20} /></button>
      <button type="button" aria-label="Previous image" onClick={() => onChange(((index ?? 0) - 1 + photos.length) % photos.length)} className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-white/10 text-white transition hover:bg-accent hover:text-ink"><ArrowLeft width={20} /></button>
      <button type="button" aria-label="Next image" onClick={() => onChange(((index ?? 0) + 1) % photos.length)} className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-white/10 text-white transition hover:bg-accent hover:text-ink"><ArrowRight width={20} /></button>
    </dialog>
  );
}
