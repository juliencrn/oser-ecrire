export interface Routes {
  blog: string
  redac: string
}

export const routes: Routes = {
  blog: `/atelier-ecriture`,
  redac: `/redaction-seo`,
}

export interface Sanity {
  projectId: string
  dataset: string
  token: string
}

export const sanity: Sanity = {
  projectId: '5pa3cetx',
  dataset: 'production',
  token: process.env.GATSBY_SANITY_TOKEN || 'token undefined',
}

/**
 * Global export
 */
export interface Config {
  routes: Routes
  sanity: Sanity
}

export default {
  routes,
  sanity,
}
