import { Component, Suspense, useSyncExternalStore, type ReactNode } from 'react';
import { hasWebGL } from '@/lib/webgl';

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err: unknown) { console.warn('[3D] scene failed, showing fallback', err); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const noop = () => () => {};

/** Mounts a (lazy) 3D scene only where WebGL exists; otherwise — or while loading / on error — shows `fallback`. */
export function Scene({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const webgl = useSyncExternalStore(noop, hasWebGL, () => false);
  if (!webgl) return <>{fallback}</>;
  return (
    <Boundary fallback={fallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Boundary>
  );
}
