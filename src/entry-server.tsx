import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

import App from './App.tsx'
import { routes } from './lib/site-meta.ts'

export { routes }

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <App />
      </MemoryRouter>
    </StrictMode>,
  )
}
