import { graphql, useStaticQuery } from 'gatsby'

import { MenuItem, InternalLink } from '../interfaces'
import { FluidObject } from 'gatsby-image'
import { linkSerializer } from '../utils'

export interface SiteSettings {
  title: string
  slogan: string
  email: string
  social: {
    facebook: string
  }
  mainMenu: MenuItem[]
  footerMenus: {
    title: string
    menu: MenuItem[]
  }[]
  logo: {
    alt: string
    asset: { fluid: FluidObject }
  }
  blog: {
    path: string
  }
}

export const mainMenu = graphql`
  fragment MainMenu on SanitySiteSettings {
    mainMenu {
      label
      anchor
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
        ... on SanityCategory {
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

export const FooterMenu = graphql`
  fragment FooterMenu on SanitySiteSettings {
    footerMenus {
      title
      menu {
        label
        anchor
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
          ... on SanityCategory {
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
  }
`

export const logo = graphql`
  fragment Logo on SanitySiteSettings {
    logo {
      alt
      asset {
        fluid(maxWidth: 250) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
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
        ...Logo
        ...FooterMenu
      }
      blog: sanityPage(template: { eq: "blog" }) {
        slug {
          current
        }
      }
    }
  `)

  // Transform Sanity link reference arrays...
  // ... to MenuItem ready to frontend
  const blogPrefix = `/${data.blog.slug.current}` || '/'
  const serialize = linkSerializer(blogPrefix)
  const mainMenu = data.sanitySiteSettings.mainMenu.map(serialize)
  const footerMenus = data.sanitySiteSettings.footerMenus.map(
    ({ title, menu }: { title: string; menu: InternalLink[] }) => ({
      title,
      menu: menu.map(serialize),
    }),
  )

  return {
    ...data.sanitySiteSettings,
    mainMenu,
    footerMenus,
    blog: {
      path: data.blog.slug.current || '',
    },
  }
}
