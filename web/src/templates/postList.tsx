import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import Grow from '@material-ui/core/Grow'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate, Post, NodeArrayOf, Category, Page } from '../interfaces'
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

export interface PostListTemplateProps extends PageTemplate {
  pageContext: {
    numPages: number
    basePath: string
    currentPage: number
    posts: NodeArrayOf<Post>
    categories: Category[]
    page: Page
  }
}

const PostListTemplate: FC<PostListTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()
  const { numPages, currentPage, posts, basePath, categories } = pageContext
  const { title, excerpt, subtitle, image } = pageContext.page

  const handleNavigate = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(value >= 2 ? `${basePath}/${value}` : basePath)
  }

  return (
    <Layout isBlog>
      <SEO title={title} description={excerpt} path={path} image={image} />

      <Hero title={title} subtitle={subtitle}>
        <CategoryFilter categories={categories} basePath={basePath} />
      </Hero>

      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            {posts.map(({ node }, i) => (
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
    </Layout>
  )
}

export default PostListTemplate
