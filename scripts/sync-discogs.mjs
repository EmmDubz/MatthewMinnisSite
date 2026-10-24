import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(root, 'src/generated/discogs.json')
const endpoint =
  'https://api.discogs.com/users/MDubz/collection/folders/0/releases?per_page=100&sort=added&sort_order=desc'

async function hasSnapshot() {
  try {
    const existing = JSON.parse(await readFile(outputPath, 'utf8'))
    return Array.isArray(existing.records) && existing.records.length > 0
  } catch {
    return false
  }
}

async function syncCollection() {
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/vnd.discogs.v2.discogs+json',
      'User-Agent': 'MatthewMinnisPortfolio/1.0 +https://matthewminnis.co.uk',
    },
  })

  if (!response.ok) {
    throw new Error(`Discogs returned ${response.status}`)
  }

  const payload = await response.json()
  if (!Array.isArray(payload.releases) || payload.releases.length === 0) {
    throw new Error('Discogs returned no public collection records')
  }

  const records = payload.releases.map(({ basic_information: record }) => ({
    id: record.id,
    title: record.title,
    artist:
      record.artists
        ?.map((artist) => artist.name.replace(/\s+\(\d+\)$/, ''))
        .join(', ') ?? '',
    year: record.year || null,
    cover: record.cover_image || record.thumb || '',
    discogsUrl: `https://www.discogs.com/release/${record.id}`,
  }))

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(
    outputPath,
    `${JSON.stringify({ syncedAt: new Date().toISOString(), records }, null, 2)}\n`,
    'utf8',
  )
  console.log(`Synced ${records.length} Discogs records.`)
}

try {
  await syncCollection()
} catch (error) {
  if (await hasSnapshot()) {
    console.warn(`Discogs sync failed; using the existing snapshot. ${error.message}`)
  } else {
    throw error
  }
}
