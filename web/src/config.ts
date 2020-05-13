export interface Routes {
  blog: string
  redac: string
}

export const routes: Routes = {
  blog: `/atelier-ecriture`,
  redac: `/redaction-seo`,
}

/**
 * Global export
 */
export interface Config {
  routes: Routes
}

export default {
  routes,
}
