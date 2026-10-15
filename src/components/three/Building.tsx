import { useFrame } from '@react-three/fiber';
import { Edges, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { MathUtils, type Group } from 'three';
import { palette } from './palette';

const W = 4.6; // width  (x)
const D = 3.2; // depth  (z)
const H = 0.95; // floor-to-floor
const GAP = 0.9; // extra spacing per floor when exploded
const damp = (cur: number, target: number, dt: number, k = 6) => MathUtils.damp(cur, target, k, dt);

export function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow><cylinderGeometry args={[0.04, 0.06, 0.5, 6]} /><meshStandardMaterial color={palette.timber} roughness={1} /></mesh>
      <mesh position={[0, 0.85, 0]} castShadow><icosahedronGeometry args={[0.45, 0]} /><meshStandardMaterial color={palette.foliage} roughness={1} flatShading /></mesh>
    </group>
  );
}

export interface BuildingProps {
  floors?: number;
  /** 0 → 1. Read every frame, so pass a function backed by a MotionValue/ref (no re-renders). */
  explode?: () => number;
  /** Construction stage: 0 site · 1 massing · 2 structure · 3 complete. Defaults to complete. */
  stage?: number;
}

/**
 * Parametric mid-rise: floor plates, perimeter columns, glazing, cantilevered balconies, a service core
 * and a roof garden. Layers scale in by `stage`; floors separate with `explode` (exploded axonometric).
 */
export function Building({ floors = 6, explode, stage = 3 }: BuildingProps) {
  const floorRefs = useRef<(Group | null)[]>([]);
  const glassRefs = useRef<(Group | null)[]>([]);
  const structure = useRef<Group>(null);
  const massing = useRef<Group>(null);
  const finish = useRef<Group>(null);
  const core = useRef<Group>(null);

  const idx = useMemo(() => Array.from({ length: floors }, (_, i) => i), [floors]);
  const total = floors * H;

  useFrame((_, dt) => {
    const ex = explode?.() ?? 0;
    floorRefs.current.forEach((g, i) => { if (g) g.position.y = damp(g.position.y, i * (H + ex * GAP), dt); });
    glassRefs.current.forEach((g) => { if (g) g.scale.y = damp(g.scale.y, stage >= 3 ? 1 : 0.001, dt, 5); });
    if (structure.current) structure.current.scale.y = damp(structure.current.scale.y, stage >= 2 ? 1 : 0.001, dt, 4);
    if (massing.current) massing.current.scale.y = damp(massing.current.scale.y, stage === 1 ? 1 : 0.001, dt, 5);
    if (finish.current) finish.current.scale.setScalar(damp(finish.current.scale.x, stage >= 3 ? 1 : 0.001, dt, 4));
    if (core.current) {
      const h = total + (floors - 1) * ex * GAP;
      core.current.scale.y = damp(core.current.scale.y, Math.max(h, 0.01), dt);
      core.current.position.y = core.current.scale.y / 2;
    }
  });

  const cols: [number, number][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]];

  return (
    <group>
      {/* Site: plot boundary + survey stakes */}
      <Line points={[[-5.2, 0.01, -4.4], [5.2, 0.01, -4.4], [5.2, 0.01, 4.4], [-5.2, 0.01, 4.4], [-5.2, 0.01, -4.4]]} color={palette.accent} lineWidth={1.2} dashed dashSize={0.3} gapSize={0.18} />
      {([[-5.2, -4.4], [5.2, -4.4], [5.2, 4.4], [-5.2, 4.4]] as const).map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.35, z]}><cylinderGeometry args={[0.025, 0.025, 0.7, 6]} /><meshBasicMaterial color={palette.accent} /></mesh>
      ))}

      {/* Stage 1: massing envelope, outlines only */}
      <group ref={massing} scale={[1, 0.001, 1]}>
        <mesh position={[0, total / 2, 0]}>
          <boxGeometry args={[W, total, D]} />
          <meshBasicMaterial transparent opacity={0.04} color={palette.paper} depthWrite={false} />
          <Edges color={palette.paper} />
        </mesh>
      </group>

      {/* Stage 2+: structure */}
      <group ref={structure} scale={[1, 0.001, 1]}>
        {idx.map((i) => (
          <group key={i} ref={(g) => { floorRefs.current[i] = g; }}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[W, 0.14, D]} />
              <meshStandardMaterial color={palette.slab} roughness={0.95} />
              <Edges color={palette.ink} threshold={20} />
            </mesh>
            {cols.map(([sx, sz]) => (
              <mesh key={`${sx}${sz}`} position={[sx * (W / 2 - 0.1), H / 2, sz * (D / 2 - 0.1)]} castShadow>
                <boxGeometry args={[0.12, H - 0.14, 0.12]} />
                <meshStandardMaterial color={palette.concrete} roughness={0.9} />
              </mesh>
            ))}
            {/* cantilevered balcony on alternate floors */}
            {i % 2 === 1 && i < floors - 1 && (
              <mesh position={[0, 0, D / 2 + 0.45]} castShadow receiveShadow>
                <boxGeometry args={[W * 0.62, 0.1, 0.9]} />
                <meshStandardMaterial color={palette.slab} roughness={0.95} />
                <Edges color={palette.ink} />
              </mesh>
            )}
            {/* Stage 3: glazing */}
            <group ref={(g) => { glassRefs.current[i] = g; }} scale={[1, 0.001, 1]}>
              <mesh position={[0, H / 2, 0]}>
                <boxGeometry args={[W - 0.16, H - 0.16, D - 0.16]} />
                <meshStandardMaterial color={palette.glass} transparent opacity={0.24} roughness={0.08} metalness={0.3} depthWrite={false} />
                <Edges color={palette.paper} />
              </mesh>
            </group>
          </group>
        ))}
        {/* service core */}
        <group ref={core} scale={[1, 0.01, 1]}>
          <mesh position={[W * 0.2, 0, -D * 0.18]} castShadow>
            <boxGeometry args={[1.1, 1, 1.0]} />
            <meshStandardMaterial color={palette.core} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Stage 3: roof garden + landscaping */}
      <group ref={finish} scale={0.001}>
        <mesh position={[0, total + 0.5, 0]} castShadow>
          <boxGeometry args={[W + 0.4, 0.1, D + 0.4]} />
          <meshStandardMaterial color={palette.accent} roughness={0.6} />
        </mesh>
        <Tree position={[-1.6, total + 0.55, 0.6]} scale={0.7} />
        <Tree position={[1.8, total + 0.55, -0.3]} scale={0.6} />
        <Tree position={[-4, 0, 3]} />
        <Tree position={[4.2, 0, 3.4]} scale={1.2} />
        <Tree position={[-4.4, 0, -2.8]} scale={0.9} />
      </group>
    </group>
  );
}
