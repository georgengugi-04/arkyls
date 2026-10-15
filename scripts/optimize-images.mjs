// Converts originals in assets-src/ to responsive WebP (640w + 1280w) in public/images/.
// Run: npm run images
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public/images';
const WIDTHS = [640, 1280];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

let before = 0;
let after = 0;
for (const file of files) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC, file), { failOn: 'none' }).rotate();
  const { size } = await sharp(path.join(SRC, file)).toBuffer({ resolveWithObject: true }).then((r) => ({ size: r.data.length }));
  before += size;
  for (const w of WIDTHS) {
    const info = await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
    after += info.size;
  }
}
console.log(`Optimised ${files.length} images: ${(before / 1e6).toFixed(1)} MB originals → ${(after / 1e6).toFixed(1)} MB (both sizes)`);
