import { InternalLink, Service, Project, Customer, Formation } from '.'

export type ModuleType =
  | 'servicesModule'
  | 'projectsModule'
  | 'simplePortableTextModule'
  | 'ctaModule'
  | 'customersModule'
  | 'formationsModule'
  | 'featuresModule'

export type LinkModule = InternalLink

export interface Module {
  // Common
  _key: string
  _type: ModuleType
  title: string
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
}

export interface Feature {
  _key: string
  title: string
  content: string
  link: InternalLink
}
