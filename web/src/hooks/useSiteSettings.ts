import { graphql, useStaticQuery } from 'gatsby'

import { InternalLink } from '../interfaces'

export interface SiteSettings {
  title: string
  slogan: string
  email: string
  social: {
    facebook: string
  }
  mainMenu: InternalLink[]
}

export const mainMenu = graphql`
  fragment MainMenu on SanitySiteSettings {
    mainMenu {
      label
      reference {
        ... on SanityPage {
          id
          _type
          title
          slug {
            current
          }
        }
        ... on SanityPost {
          id
          _type
          title
          slug {
            current
          }
        }
      }
    }
  }
`

export default (): SiteSettings => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        slogan
        title
        email
        social {
          facebook
        }
        ...MainMenu
      }
    }
  `)

  return data.sanitySiteSettings
}
