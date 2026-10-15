import Canvas3D from './Canvas3D';
import { Building } from './Building';

/** Services: the same building at four stages (site → massing → structure → complete). */
export default function ConstructionScene({ stage, className }: { stage: number; className?: string }) {
  return (
    <Canvas3D className={className} label={`3D construction sequence, stage ${stage + 1} of 4.`} camera={[10, 6, 11]} target={[0, 2.6, 0]}>
      <Building floors={6} stage={stage} />
    </Canvas3D>
  );
}
