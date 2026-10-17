import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { palette } from './palette';

/**
 * OrbitControls sets `touch-action: none`, which makes a full-bleed canvas swallow every swipe and
 * blocks page scroll on phones. `pan-y` hands vertical swipes back to the browser (page scrolls)
 * while horizontal drags still orbit the model.
 */
function TouchScroll() {
  const controls = useThree((s) => s.controls) as { domElement?: HTMLElement | null } | null;
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    if (!controls) return;
    for (const el of [controls.domElement, gl.domElement]) if (el) el.style.touchAction = 'pan-y';
  }, [controls, gl]);
  return null;
}

interface Props {
  children: ReactNode;
  className?: string;
  camera?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  autoRotate?: boolean;
  /** Ground grid + soft contact shadows (default true). */
  ground?: boolean;
  sun?: number;
  label: string;
}

/** Shared R3F canvas: lighting, orbit controls, ground, pause-offscreen and reduced-motion handling. */
export default function Canvas3D({ children, className, camera = [9, 6, 10], target = [0, 2.6, 0], fov = 32, autoRotate = true, ground = true, sun = 35, label }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useInView(wrap, { margin: '120px' });
  const reduce = useReducedMotion();
  const rad = (sun * Math.PI) / 180;

  return (
    <div ref={wrap} className={className} role="img" aria-label={label}>
      <Canvas shadows dpr={[1, 1.75]} frameloop={visible ? 'always' : 'never'} camera={{ position: camera, fov }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.75} />
        <hemisphereLight args={['#dfe9ee', '#1b1f1d', 0.5]} />
        <directionalLight position={[Math.cos(rad) * 9, 8, Math.sin(rad) * 9]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-bias={-0.0004} />
        {ground && (
          <>
            <gridHelper args={[40, 40, '#3a3f3c', '#1d211f']} position={[0, -0.005, 0]} />
            <mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[60, 60]} /><shadowMaterial opacity={0.4} /></mesh>
            <ContactShadows position={[0, 0.002, 0]} opacity={0.35} scale={22} blur={2.4} far={6} color={palette.ink} />
          </>
        )}
        {children}
        <TouchScroll />
        <OrbitControls makeDefault enablePan={false} enableZoom={false} autoRotate={autoRotate && !reduce} autoRotateSpeed={0.55} target={target} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2.05} enableDamping />
      </Canvas>
    </div>
  );
}
