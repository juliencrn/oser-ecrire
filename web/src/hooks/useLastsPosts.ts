import { graphql, useStaticQuery } from 'gatsby'
import { Post, NodeArrayOf } from '../interfaces'

export const post = graphql`
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
  }
`

type SmallPost = Omit<Post, 'body'>
type LastsPosts = NodeArrayOf<SmallPost>

export default (): LastsPosts => {
  const data = useStaticQuery(graphql`
    {
      allSanityPost(limit: 3, sort: { fields: _createdAt, order: DESC }) {
        edges {
          node {
            ...Post
          }
        }
      }
    }
  `)

  const posts = data.allSanityPost.edges
  return posts
}
