import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const files = (await readdir('Photos')).filter((file) => /\.(jpe?g|png)$/i.test(file))
const thumbnails = await Promise.all(
  files.map(async (file) => ({
    file,
    image: await sharp(join('Photos', file)).resize(260, 220, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer(),
  })),
)

const columns = 3
const cellWidth = 280
const cellHeight = 260
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${columns * cellWidth}" height="${Math.ceil(thumbnails.length / columns) * cellHeight}">
${thumbnails
  .map(
    ({ file, image }, index) => `
  <image href="data:image/jpeg;base64,${image.toString('base64')}" x="${(index % columns) * cellWidth + 10}" y="${Math.floor(index / columns) * cellHeight}" width="260" height="220"/>
  <text x="${(index % columns) * cellWidth + 10}" y="${Math.floor(index / columns) * cellHeight + 245}" font-size="16" fill="black">${file}</text>`,
  )
  .join('')}
</svg>`

await sharp(Buffer.from(svg)).png().toFile('photos-contact-sheet.png')
