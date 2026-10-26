export const siteOrigin = 'https://matthewminnis.co.uk'

export const defaultDescription =
  'Final-year Mechanical Engineering student at the University of Lincoln (graduating June 2027) with practical experience across aerospace flight testing, client-facing professional services, and rapid software prototyping.'

export function pageTitle(title?: string) {
  return title ? `${title} | Matthew Minnis` : 'Matthew Minnis'
}

export const routes = [
  { path: '/', title: pageTitle(), description: defaultDescription },
  { path: '/cv', title: pageTitle('CV'), description: defaultDescription },
  { path: '/photography', title: pageTitle('Photography'), description: defaultDescription },
] as const
