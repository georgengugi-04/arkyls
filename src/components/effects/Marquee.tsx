import type { ReactNode } from 'react';

/** Infinite horizontal ticker. Content is duplicated for a seamless loop; the copy is hidden from AT. */
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex min-w-max animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
        {children}
        <div aria-hidden className="flex items-center gap-12">{children}</div>
      </div>
    </div>
  );
}
