import type { MotionValue } from 'motion/react';
import Canvas3D from './Canvas3D';
import { Building } from './Building';

/** Home hero: building that explodes into floor plates as the hero section scrolls. */
export default function HeroScene({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  return (
    <Canvas3D className={className} label="Interactive 3D model of a six-storey building. Drag to orbit; scrolling separates the floors." camera={[10.5, 5.8, 11.5]} target={[0, 3.2, 0]}>
      <Building floors={6} explode={() => Math.min(1, Math.max(0, progress.get() * 1.6))} />
    </Canvas3D>
  );
}
