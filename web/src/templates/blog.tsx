import React, { FC } from 'react'
import { navigate, graphql } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import Grow from '@material-ui/core/Grow'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate, Post, Category, Page, Modal } from '../interfaces'
import Hero from '../components/Hero'
import CategoryFilter from '../components/blog/CategoryFilter'
import PostCard from '../components/blog/PostCard'

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}))

export interface BlogTemplateProps {
  posts: Post[]
  categories?: Category[]
  page: Page
  numPages: number
  currentPage: number
  basePath: string
}

export function BlogTemplate(props: BlogTemplateProps) {
  const classes = useStyles()
  const { title, subtitle } = props.page
  const { numPages, currentPage, basePath, posts, categories } = props

  const handleNavigate = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(value >= 2 ? `${basePath}/${value}` : basePath)
  }

  return (
    <>
      <Hero title={title} subtitle={subtitle}>
        {categories && categories.length && (
          <CategoryFilter categories={categories} basePath={basePath} />
        )}
      </Hero>

      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            {posts.map((node, i) => (
              <Grow
                in
                key={i}
                timeout={(i + 1) * 1000}
                style={{ transformOrigin: '0 -40px 0' }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <PostCard {...node} />
                </Grid>
              </Grow>
            ))}
          </Grid>

          <div className={classes.pagination}>
            <Pagination
              count={numPages}
              page={currentPage}
              showFirstButton
              showLastButton
              color="primary"
              onChange={handleNavigate}
            />
          </div>
        </Box>
      </Container>
    </>
  )
}

export interface PostListTemplateProps extends PageTemplate {
  pageContext: {
    numPages: number
    currentPage: number
    basePath: string
    skip: number
    limit: number
    categories: Category[]
    page: Page
    modal: Modal
  }
  data: {
    posts: {
      nodes: Post[]
    }
  }
}

const Template: FC<PostListTemplateProps> = ({ data, pageContext, path }) => {
  const {
    numPages,
    currentPage,
    basePath,
    categories,
    modal,
    page,
  } = pageContext
  const { title, excerpt, image } = page

  return (
    <Layout isBlog modal={modal}>
      <SEO title={title} description={excerpt} path={path} image={image} />

      <BlogTemplate
        basePath={basePath}
        numPages={numPages}
        currentPage={currentPage}
        posts={data.posts.nodes}
        categories={categories}
        page={page}
      />
    </Layout>
  )
}

export default Template

export const blogQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    posts: allSanityPost(
      limit: $limit
      skip: $skip
      sort: { fields: _createdAt, order: DESC }
    ) {
      nodes {
        ...Post
      }
    }
  }
`
