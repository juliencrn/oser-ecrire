import { FluidObject } from 'gatsby-image'

export type NodeArrayOf<T> = Array<{ node: T }>

export interface GraphQueryOf<T> {
  edges: NodeArrayOf<T>
}

export interface Slug {
  current: string
}

export interface MainImage {
  alt: string
  caption?: string
  asset: {
    sm: FluidObject
  }
}

export interface Category {
  title: string
  slug: Slug
}

export interface Post {
  id: string
  title: string
  slug: Slug
  excerpt: string
  categories?: Category[]
  mainImage?: MainImage
}

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
