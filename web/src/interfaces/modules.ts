import { InternalLink, Service, Project, Customer, Formation } from '.'
import { MainImage, Slug } from './utils'

export type ModuleType =
  | 'servicesModule'
  | 'projectsModule'
  | 'simplePortableTextModule'
  | 'ctaModule'
  | 'customersModule'
  | 'formationsModule'
  | 'featuresModule'
  | 'quote'
  | 'heroModule'
  | 'lastsPostsModule'
  | 'formModule'
  | 'aboutMeModule'

export type TextSide = 'left' | 'right'
export type Width = 'lg' | 'xl'
export type Overlay = 'none' | 'text' | 'image'
export type FormName = 'contactForm' | 'newsletterForm'

export type LinkModule = InternalLink

export interface Quality {
  _key: string
  _type: 'quality'
  answer: string
  response: string
}

export interface Module {
  // Common
  _key: string
  _type: ModuleType
  title?: string
  introduction?: string
  slug?: Slug

  // Settings
  isVisible?: boolean

  // Specific
  body?: any
  services?: Service[]
  projects?: Project[]
  customers?: Customer[]
  formations?: Formation[]
  features?: Feature[]
  link?: LinkModule
  text?: string // quote
  author?: string // quote
  form?: { type: FormName }
  qualities?: Quality[]
  mainImage?: MainImage
  textSide?: TextSide
  overlay?: Overlay
  disableOverlap?: boolean
  width?: Width
  subtitle?: string
}

export interface Feature {
  _key: string
  title: string
  content: string
  link: InternalLink
}
