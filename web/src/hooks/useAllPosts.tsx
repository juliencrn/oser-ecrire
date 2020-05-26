import { graphql, useStaticQuery } from 'gatsby'

import { Slug } from '../interfaces'

export interface Page {
  _id: string
  slug: Slug
}

export interface Post {
  slug: Slug
}

export interface Return {
  pages: Page[]
  posts: Post[]
}

export default function useAllPosts(): Return {
  const data = useStaticQuery(graphql`
    {
      pages: allSanityPage {
        nodes {
          _id
          slug {
            current
          }
        }
      }

      posts: allSanityPost {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  return {
    pages: data.pages.nodes,
    posts: data.posts.nodes,
  }
}
