import cvSource from '../content/cv.md?raw'
import experienceSource from '../content/experience.md?raw'
import homeSource from '../content/home.md?raw'
import interestsSource from '../content/interests.md?raw'
import photographySource from '../content/photography.md?raw'
import projectsSource from '../content/projects.md?raw'

export type Photo = {
  src: string
  alt: string
  caption?: string
  orientation?: 'portrait' | 'landscape' | 'square'
}

type MarkdownDocument<T extends Record<string, unknown> = Record<string, unknown>> = {
  body: string
  data: T
}

function readDocument<T extends Record<string, unknown> = Record<string, unknown>>(
  source: string,
): MarkdownDocument<T> {
  if (!source.startsWith('---')) {
    return { body: source.trim(), data: {} as T }
  }

  const [, frontMatter = '', ...bodyParts] = source.split('---')
  const data: Record<string, unknown> = {}

  if (/^photos:\s*\[\s*\]\s*$/m.test(frontMatter)) {
    data.photos = []
  } else if (/^photos:\s*$/m.test(frontMatter)) {
    const photos: Photo[] = []
    let current: Partial<Photo> | undefined

    for (const line of frontMatter.split('\n')) {
      const itemMatch = line.match(/^\s*-\s+src:\s*(.+)\s*$/)
      if (itemMatch) {
        if (current?.src && current.alt) photos.push(current as Photo)
        current = { src: cleanValue(itemMatch[1]) }
        continue
      }

      const propertyMatch = line.match(/^\s+(alt|caption|orientation):\s*(.+)\s*$/)
      if (current && propertyMatch) {
        const [, key, value] = propertyMatch
        current[key as keyof Photo] = cleanValue(value) as never
      }
    }

    if (current?.src && current.alt) photos.push(current as Photo)
    data.photos = photos
  }

  return { body: bodyParts.join('---').trim(), data: data as T }
}

function cleanValue(value: string) {
  return value.trim().replace(/^(['"])(.*)\1$/, '$2')
}

export const content = {
  home: readDocument(homeSource),
  experience: readDocument(experienceSource),
  projects: readDocument(projectsSource),
  interests: readDocument(interestsSource),
  cv: readDocument(cvSource),
  photography: readDocument<{ photos?: Photo[] }>(photographySource),
}
