import type { ImgHTMLAttributes } from 'react';
import { photoSrc, photoSrcSet, type Photo as PhotoData } from '@/lib/img';
import { cn } from '@/lib/cn';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  photo: PhotoData;
  /** Set true for the LCP image (hero) to skip lazy-loading. */
  priority?: boolean;
}

export function Photo({ photo, priority, className, sizes = '(min-width: 1024px) 33vw, 100vw', ...rest }: Props) {
  return (
    <img
      src={photoSrc(photo.id)}
      srcSet={photoSrcSet(photo.id)}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('block h-full w-full object-cover', className)}
      {...rest}
    />
  );
}
