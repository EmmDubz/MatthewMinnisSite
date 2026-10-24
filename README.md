# Matthew Minnis

Personal site for [matthewminnis.co.uk](https://matthewminnis.co.uk/).

React, TypeScript, Tailwind, and Vite. Prose lives in Markdown under `src/content`.

## Local

```bash
npm install
npm run dev
```

## Content

Edit files in `src/content`. See `CONTENT.md` for the photography and Discogs workflow.

## Deploy

The production container lives on the personal server as `matthewminnis-site` on the existing Cloudflare Tunnel network. It does not publish a host port.

```bash
npm run build
docker compose up -d --build
```
