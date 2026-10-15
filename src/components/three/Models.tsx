import { Edges } from '@react-three/drei';
import { useMemo } from 'react';
import { Shape } from 'three';
import { palette } from './palette';
import { Tree } from './Building';

/** A-frame cabin: extruded triangular section, glazed gable, deck and stair. */
export function AFrame() {
  const shape = useMemo(() => { const s = new Shape(); s.moveTo(-2.4, 0); s.lineTo(2.4, 0); s.lineTo(0, 4.2); s.closePath(); return s; }, []);
  const glaze = useMemo(() => { const s = new Shape(); s.moveTo(-1.9, 0.12); s.lineTo(1.9, 0.12); s.lineTo(0, 3.5); s.closePath(); return s; }, []);
  const depth = 5.2;
  return (
    <group position={[0, 0, -depth / 2]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, { depth, bevelEnabled: false }]} />
        <meshStandardMaterial color="#2a2c29" roughness={0.8} />
        <Edges color={palette.paper} threshold={15} />
      </mesh>
      <mesh position={[0, 0, depth + 0.01]}>
        <shapeGeometry args={[glaze]} />
        <meshStandardMaterial color={palette.glass} transparent opacity={0.5} roughness={0.05} metalness={0.4} />
      </mesh>
      {/* mezzanine */}
      <mesh position={[0, 1.7, depth * 0.5]}><boxGeometry args={[2.2, 0.08, depth * 0.55]} /><meshStandardMaterial color={palette.timber} roughness={0.8} /></mesh>
      {/* deck + steps */}
      <mesh position={[0, 0.1, depth + 1.1]} castShadow receiveShadow><boxGeometry args={[5.2, 0.12, 2.2]} /><meshStandardMaterial color={palette.timber} roughness={0.9} /><Edges color={palette.ink} /></mesh>
      {[0, 1, 2].map((i) => <mesh key={i} position={[0, 0.02 - i * 0.0, depth + 2.4 + i * 0.3]}><boxGeometry args={[1.6, 0.06, 0.3]} /><meshStandardMaterial color={palette.timber} /></mesh>)}
      <Tree position={[-4, 0, depth + 1]} scale={1.3} />
      <Tree position={[4.2, 0, depth - 1]} scale={1.1} />
      <Tree position={[3.6, 0, 1]} />
    </group>
  );
}

/** Single-storey L-plan villa with cantilevered roof, glazed living wing and pool. */
export function Villa() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[-1, 0.9, 0]} castShadow receiveShadow><boxGeometry args={[6.4, 1.8, 3]} /><meshStandardMaterial color={palette.slab} roughness={0.95} /><Edges color={palette.ink} /></mesh>
      <mesh position={[-3.2, 0.9, 3.4]} castShadow receiveShadow><boxGeometry args={[2, 1.8, 4]} /><meshStandardMaterial color={palette.concrete} roughness={0.95} /><Edges color={palette.ink} /></mesh>
      <mesh position={[-1, 1.9, 0.2]} castShadow><boxGeometry args={[7.6, 0.16, 4.2]} /><meshStandardMaterial color={palette.core} roughness={0.7} /></mesh>
      <mesh position={[-3.2, 1.9, 3.4]} castShadow><boxGeometry args={[2.6, 0.16, 4.6]} /><meshStandardMaterial color={palette.core} roughness={0.7} /></mesh>
      <mesh position={[-1, 0.8, 1.52]}><boxGeometry args={[5.4, 1.4, 0.04]} /><meshStandardMaterial color={palette.glass} transparent opacity={0.45} roughness={0.05} metalness={0.4} /></mesh>
      <mesh position={[0.9, 0.05, 3.9]} receiveShadow><boxGeometry args={[3.6, 0.1, 2.2]} /><meshStandardMaterial color={palette.water} roughness={0.1} metalness={0.3} /><Edges color={palette.paper} /></mesh>
      <mesh position={[0.9, 0.06, 2.6]} receiveShadow><boxGeometry args={[4.6, 0.06, 0.8]} /><meshStandardMaterial color={palette.timber} roughness={0.9} /></mesh>
      <Tree position={[4, 0, 0.5]} scale={1.4} />
      <Tree position={[4.4, 0, 4]} scale={1} />
      <Tree position={[-5.4, 0, -0.5]} scale={1.1} />
    </group>
  );
}
