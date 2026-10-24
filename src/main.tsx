import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
