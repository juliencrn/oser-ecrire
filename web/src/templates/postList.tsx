import React, { FC } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layout'
import SEO from '../layout/seo'
import {
  PageTemplate,
  Post,
  NodeArrayOf,
  Category,
  Page,
  Modal,
} from '../interfaces'
import { BlogTemplate } from './blog'

export interface PostListTemplateProps extends PageTemplate {
  pageContext: {
    numPages: number
    basePath: string
    currentPage: number
    posts: NodeArrayOf<Post>
    categories: Category[]
    page: Page
    modal: Modal
  }
  data: {
    posts: {
      nodes: Post[]
    }
    category: Category
  }
}

const PostListTemplate: FC<PostListTemplateProps> = ({
  data,
  pageContext,
  path,
}) => {
  const {
    numPages,
    currentPage,
    basePath,
    categories,
    modal,
    page,
  } = pageContext
  const { posts, category } = data

  // Use current category add as page meta
  const pageMeta = {
    ...page,
    title: category?.title || page.title,
    excerpt: category?.excerpt || page.excerpt,
    subtitle: category?.excerpt || page.subtitle,
  }
  const { title, excerpt, image } = page

  return (
    <Layout isBlog modal={modal}>
      <SEO title={title} description={excerpt} path={path} image={image} />

      <BlogTemplate
        basePath={basePath}
        numPages={numPages}
        currentPage={currentPage}
        posts={posts.nodes}
        categories={categories}
        page={pageMeta}
      />
    </Layout>
  )
}

export default PostListTemplate

export const postListQuery = graphql`
  query($limit: Int!, $skip: Int!, $slug: String!) {
    posts: allSanityPost(
      limit: $limit
      skip: $skip
      sort: { fields: _createdAt, order: DESC }
      filter: {
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
    ) {
      nodes {
        ...Post
      }
    }
    category: sanityCategory(slug: { current: { eq: $slug } }) {
      id
      title
      excerpt
    }
  }
`
