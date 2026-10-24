# Editing the site

All website prose lives in `src/content` as Markdown:

- `home.md` — home-page introduction
- `experience.md` — experience section
- `projects.md` — projects and achievements
- `interests.md` — interests and hobbies
- `cv.md` — complete web CV
- `photography.md` — gallery title and photo list

Normal Markdown headings, paragraphs, emphasis, and lists are supported. Comments beginning with `AUTHOR PROMPT` are editing notes and are not displayed.

## Adding photographs

1. Copy web-sized images into `public/photos`.
2. Open `src/content/photography.md`.
3. Add each image under the `photos` frontmatter list using the example in that file.
4. Write the alt text and optional caption yourself.

For good loading performance, use JPEG, WebP, or AVIF images around 2,000 pixels on the longest edge.

## Refreshing Discogs

Run `npm run sync:discogs`. A production build also refreshes the public collection automatically. If Discogs is temporarily unavailable, the most recent saved snapshot is retained.

## Local preview

Run `npm run dev`, then open the local URL shown in the terminal. Run `npm run build` before deployment.
