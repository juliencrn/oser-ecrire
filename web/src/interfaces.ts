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

export interface Category {
  title: string
  slug: Slug
}

export interface Post {
  id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  excerpt: string
  categories?: Category[]
  mainImage?: MainImage
  body: any[]
  images: {
    id: string
    sm: FluidObject
    md: FluidObject
  }[]
}

export interface Comment {
  _id: string
  _type: 'comment'
  _createdAt: string
  _updatedAt: string
  post: {
    _ref: string
  }
  email: string
  username: string
  message: string
}

export interface BlogSettings {
  title: string
  slug: Slug
  slogan: string
  excerpt: string
  categories: Category[]
}

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
