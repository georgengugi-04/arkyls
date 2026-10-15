/** True when the browser can create a WebGL context. Cached after first call. */
let cached: boolean | undefined;
export function hasWebGL(): boolean {
  if (cached !== undefined) return cached;
  try {
    const c = document.createElement('canvas');
    cached = !!(c.getContext('webgl2') ?? c.getContext('webgl'));
  } catch {
    cached = false;
  }
  return cached;
}
