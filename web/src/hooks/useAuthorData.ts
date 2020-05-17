import { graphql, useStaticQuery } from 'gatsby'

import { MainImage } from '../interfaces'

export interface AuthorData {
  name: string
  excerpt: string
  mainImage: MainImage
  social: {
    facebook: string
    laredacduweb: string
    linkedin: string
    malt: string
  }
}

export default function useAuthorData(): AuthorData {
  const data = useStaticQuery(graphql`
    {
      sanityAuthor {
        name
        social {
          facebook
          laredacduweb
          linkedin
          malt
        }
        excerpt
        mainImage {
          _type
          caption
          alt
          asset {
            id
          }
        }
      }
    }
  `)

  return data.sanityAuthor
}
