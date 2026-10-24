import { Link } from 'react-router-dom'

import { PageMeta } from '../components/PageMeta'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <PageMeta title="Page not found" />
      <p>404</p>
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </section>
  )
}
