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
          alt
          asset {
            sm: fluid(maxWidth: 100) {
              srcWebp
              src
              srcSetWebp
              srcSet
              sizes
              base64
              aspectRatio
            }
          }
        }
      }
    }
  `)

  return data.sanityAuthor
}
