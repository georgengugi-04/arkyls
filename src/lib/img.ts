/** Responsive image helper. Files are produced by `npm run images` (640w + 1280w WebP). */
export interface Photo {
  /** Base file name in /public/images, without size suffix or extension. */
  id: string;
  alt: string;
}

export const photoSrc = (id: string, width: 640 | 1280 = 1280) => `/images/${id}-${width}.webp`;
export const photoSrcSet = (id: string) => `${photoSrc(id, 640)} 640w, ${photoSrc(id, 1280)} 1280w`;
