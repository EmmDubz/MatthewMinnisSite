import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { CopyEmailButton } from './CopyEmailButton'

const links = [
  { to: '/', label: 'Home' },
  { to: '/cv', label: 'CV' },
  { to: '/photography', label: 'Photography' },
]
const currentYear = new Date().getFullYear()

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M3 13 13 3m0 0H5m8 0v8" />
    </svg>
  )
}

export function SiteShell() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Matthew Minnis, home">
          MM<span aria-hidden="true">.</span>
        </Link>

        <nav aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={link.to === '/'}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <CopyEmailButton className="header-contact" />
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Matthew Minnis © {currentYear}</p>
        <div className="footer-links">
          <a href="https://github.com/EmmDubz" rel="noreferrer" target="_blank">
            GitHub <ArrowIcon />
          </a>
          <a
            href="https://uk.linkedin.com/in/matthew-minnis-9a66451b2"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn <ArrowIcon />
          </a>
          <a href="https://www.discogs.com/user/MDubz" rel="noreferrer" target="_blank">
            Discogs <ArrowIcon />
          </a>
        </div>
      </footer>
    </div>
  )
}
