import { mkdir, readdir, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'Photos')
const outputDir = join(root, 'public', 'photos')

await mkdir(outputDir, { recursive: true })

let files
try {
  files = (await readdir(sourceDir)).filter((file) => /\.(jpe?g|png)$/i.test(file))
} catch {
  files = []
}

for (const file of await readdir(outputDir)) {
  if (file.endsWith('.webp')) await rm(join(outputDir, file))
}

await Promise.all(
  files.map(async (file) => {
    const output = join(outputDir, `${file.replace(/\.[^.]+$/, '')}.webp`)
    await sharp(join(sourceDir, file))
      .resize({ width: 2200, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(output)
  }),
)

console.log(`Prepared ${files.length} photography assets.`)
