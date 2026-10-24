import { resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f1eee6"/>
  <path d="M64 70H1136M64 560H1136" stroke="#cbc5b8"/>
  <circle cx="1093" cy="70" r="7" fill="#aa3e28"/>
  <text x="64" y="280" fill="#181816" font-family="Georgia, serif" font-size="118" letter-spacing="-7">Matthew Minnis</text>
  <text x="68" y="370" fill="#6e6a60" font-family="Arial, sans-serif" font-size="27">Final-year Mechanical Engineering student at the University of Lincoln,</text>
  <text x="68" y="412" fill="#6e6a60" font-family="Arial, sans-serif" font-size="27">graduating June 2027.</text>
  <text x="68" y="532" fill="#aa3e28" font-family="Georgia, serif" font-size="23" font-style="italic">matthewminnis.co.uk</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(resolve(root, 'public/social-card-v2.png'))
console.log('Generated social-card-v2.png.')
