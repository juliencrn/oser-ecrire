import { Module } from './modules'

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

// Field "Image" from sanity collection
export interface Image {
  _type: 'image' | 'mainImage'
  asset: {
    id: string
  }
}

// Field "mainImage" from sanity collection
export interface MainImage extends Image {
  _type: 'mainImage'
  alt: string
  caption?: string
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

export interface Modal {
  active: boolean
  delay: number
  modules?: Module[]
}

export interface PageTemplate {
  location: Location
  pageContext: any
  path: string
}
