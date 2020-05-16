import { FluidObject } from 'gatsby-image'

import { Slug, Testimonial, MainImage } from './utils'
import { Module } from './modules'

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

export interface Page {
  id: string
  slug: Slug
  title: string
  subtitle?: string
  excerpt?: string
  image?: {
    asset: { url: string }
  }

  pageBuilder?: { modules?: Module[] }
  // blog?: { categories?: Category[] }
}

export interface Customer {
  id: string
  link?: string
  slug: Slug
  title: string
  testimonial?: Testimonial
}

export interface Formation {
  id: string
  link?: string
  slug: Slug
  title: string
  description: any
  testimonial?: Testimonial
}

export interface Topic {
  slug: Slug
  title: string
  excerpt?: string
}

export interface Project {
  id: string
  link?: string
  slug: Slug
  title: string
  service: Service
  customer?: Customer
  topic?: Topic
}

export interface Service {
  id: string
  slug: Slug
  title: string
  description?: string
}
