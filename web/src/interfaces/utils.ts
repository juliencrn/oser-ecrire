import { FluidObject } from 'gatsby-image'

export type NodeArrayOf<T> = Array<{ node: T }>

export interface GraphQueryOf<T> {
  edges: NodeArrayOf<T>
}

export interface Slug {
  current: string
}

// Used in menu & footer for menu links map()
export interface MenuItem {
  label: string
  to: string
}

export type AlertType = 'success' | 'error' | 'warning' | 'info'
export interface AlertProps {
  type: AlertType
  message: string
  isValid: boolean
}

export interface MainImage {
  alt: string
  caption?: string
  asset: {
    extension: string
    size: number
    url: string
  } & { [key: string]: FluidObject }
}

export interface InternalLink {
  label?: string
  reference: {
    _type: 'page' | 'post' | 'category'
    id: string
    title: string
    slug: Slug
  }
}

export interface Testimonial {
  name: string
  text: string
  avatar?: {
    asset: {
      avatar?: FluidObject // From GraphQL
      url?: string // From @sanity/client
    }
  }
}

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
