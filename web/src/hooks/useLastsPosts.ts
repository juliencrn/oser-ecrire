import { graphql, useStaticQuery } from 'gatsby'
import { Post, NodeArrayOf } from '../interfaces'

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
