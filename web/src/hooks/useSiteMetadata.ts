import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
  title: string
  description: string
  author: string
  siteUrl: string
  image: string
}

export default function useSiteMetadata(): SiteMetadata {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          image
        }
      }
    }
  `)

  return data.site.siteMetadata
}
