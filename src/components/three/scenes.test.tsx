import { describe, expect, it } from 'vitest';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { Vector3, type Group, type Object3D } from 'three';
import { Building } from './Building';
import { AFrame, Villa } from './Models';

const find = (root: Object3D, pred: (o: Object3D) => boolean): Object3D[] => { const out: Object3D[] = []; root.traverse((o) => pred(o) && out.push(o)); return out; };
const meshes = (root: Object3D) => find(root, (o) => (o as { isMesh?: boolean }).isMesh === true);

describe('3D models (headless)', () => {
  it('Building mounts and builds the expected number of floor plates + glazing', async () => {
    const r = await ReactThreeTestRenderer.create(<Building floors={6} />);
    // slab + 4 columns (+ balcony on odd floors except the last) + glass per floor → plenty of meshes
    expect(meshes(r.scene.instance).length).toBeGreaterThan(6 * 6);
    await r.unmount();
  });

  it('explode pushes upper floors apart over time', async () => {
    let ex = 0;
    const r = await ReactThreeTestRenderer.create(<Building floors={4} stage={3} explode={() => ex} />);
    await r.advanceFrames(90, 1 / 30);
    const tops = () => find(r.scene.instance as Object3D, (o) => o.type === 'Group' && o.children.length >= 5).map((g) => (g as Group).position.y).sort((a, b) => a - b);
    const compact = tops();
    ex = 1;
    await r.advanceFrames(180, 1 / 30);
    const spread = tops();
    expect(Math.max(...spread)).toBeGreaterThan(Math.max(...compact) + 1);
    await r.unmount();
  });

  it('stage 0 collapses the structure, stage 3 grows it to full height', async () => {
    const slabWorldScaleY = async (stage: number, frames: number) => {
      const r = await ReactThreeTestRenderer.create(<Building floors={3} stage={stage} />);
      await r.advanceFrames(frames, 1 / 30);
      r.scene.instance.updateMatrixWorld(true);
      const slab = meshes(r.scene.instance).find((m) => (m as unknown as { geometry: { parameters?: { width?: number; height?: number } } }).geometry.parameters?.height === 0.14)!;
      const y = new Vector3().setFromMatrixColumn(slab.matrixWorld, 1).length();
      await r.unmount();
      return y;
    };
    expect(await slabWorldScaleY(0, 120)).toBeLessThan(0.05);
    expect(await slabWorldScaleY(3, 240)).toBeGreaterThan(0.95);
  });

  it('A-frame and villa mount without errors', async () => {
    for (const C of [AFrame, Villa]) {
      const r = await ReactThreeTestRenderer.create(<C />);
      expect(meshes(r.scene.instance).length).toBeGreaterThan(5);
      await r.unmount();
    }
  });
});
