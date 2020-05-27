import { graphql } from 'gatsby'

export const postFragment = graphql`
  fragment Post on SanityPost {
    id
    _createdAt
    _updatedAt
    title
    slug {
      current
    }
    excerpt
    categories {
      id
      title
      slug {
        current
      }
    }
    mainImage {
      alt
      caption
      _type
      asset {
        id
      }
    }
    body: _rawBody
  }
`
