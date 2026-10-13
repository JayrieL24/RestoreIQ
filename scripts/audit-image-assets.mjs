import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicRoot = path.join(root, 'public');
const imagePattern = /\.(?:png|jpe?g|webp|gif|avif|svg|ico)$/i;
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
const sources = walk(path.join(root, 'src')).filter(file => /\.(?:tsx?|css|json|html|js|mjs)$/.test(file));
sources.push(...walk(publicRoot).filter(file => /\.(?:svg|html|webmanifest|css|js)$/.test(file)));
sources.push(...fs.readdirSync(root).filter(file => /\.(?:tsx?|m?js|json|html)$/.test(file)).map(file => path.join(root, file)));
const text = sources.map(file => fs.readFileSync(file, 'utf8')).join('\n');
const images = walk(publicRoot).filter(file => imagePattern.test(file));
const used = new Set();
const templates = [...text.matchAll(/[`"'](\/[^`"'\n]+\.(?:png|jpe?g|webp|gif|avif|svg|ico))[`"']/gi)]
  .map(match => match[1]).filter(value => value.includes('${'))
  .map(value => new RegExp('^' + value.split(/\$\{[^}]+\}/).map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[^/]+') + '$'));
for (const file of images) {
  const name = path.basename(file);
  // Basename matching also catches template strings such as `${real}IMG_2342.jpg`.
  const url = '/' + path.relative(publicRoot, file).split(path.sep).join('/');
  if (text.includes(name) || text.includes(encodeURIComponent(name)) || templates.some(pattern => pattern.test(url))) used.add(file);
}
// ServiceFeaturePhoto derives these responsive alternatives at runtime.
for (const file of [...used]) {
  if (file.endsWith('.jpg') && file.includes(`${path.sep}services${path.sep}features${path.sep}`)) {
    const portrait = file.replace(/\.jpg$/, '-portrait.webp');
    if (fs.existsSync(portrait)) used.add(portrait);
  }
}
const unused = images.filter(file => !used.has(file)).map(file => ({
  path: path.relative(root, file).split(path.sep).join('/'),
  bytes: fs.statSync(file).size,
}));
const report = { scanned: images.length, retained: used.size, unused, bytes: unused.reduce((sum, file) => sum + file.bytes, 0) };
console.log(JSON.stringify(report, null, 2));
