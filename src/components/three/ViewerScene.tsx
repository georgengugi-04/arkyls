import Canvas3D from './Canvas3D';
import { Building } from './Building';
import { AFrame, Villa } from './Models';

export type ModelKind = 'tower' | 'aframe' | 'villa';

/** Model studio: switchable massing models with sun angle and exploded view. */
export default function ViewerScene({ kind, sun, exploded, className }: { kind: ModelKind; sun: number; exploded: boolean; className?: string }) {
  const cfg = {
    tower: { camera: [9.5, 5.5, 10.5] as [number, number, number], target: [0, 2.6, 0] as [number, number, number] },
    aframe: { camera: [9, 4.5, 9] as [number, number, number], target: [0, 1.8, 0] as [number, number, number] },
    villa: { camera: [10, 5.5, 10] as [number, number, number], target: [-1, 0.8, 1.5] as [number, number, number] },
  }[kind];
  return (
    <Canvas3D className={className} label={`Interactive 3D ${kind} model. Drag to orbit.`} sun={sun} {...cfg}>
      {kind === 'tower' && <Building floors={6} explode={() => (exploded ? 1 : 0)} />}
      {kind === 'aframe' && <AFrame />}
      {kind === 'villa' && <Villa />}
    </Canvas3D>
  );
}
