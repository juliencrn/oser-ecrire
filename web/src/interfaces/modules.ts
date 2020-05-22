import { InternalLink, Service, Project, Customer, Formation } from '.'
import { MainImage } from './utils'

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

export type TextSide = 'left' | 'right'
export type Width = 'lg' | 'xl'
export type Overlay = 'none' | 'text' | 'image'

export type LinkModule = InternalLink

export interface Module {
  // Common
  _key: string
  _type: ModuleType
  title?: string
  introduction?: string

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

  // Used in Hero
  mainImage?: MainImage
  textSide?: TextSide
  overlay?: Overlay
  width?: Width
}

export interface Feature {
  _key: string
  title: string
  content: string
  link: InternalLink
}
