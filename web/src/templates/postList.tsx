import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useTransition, animated } from 'react-spring'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate, Post, NodeArrayOf, BlogSettings } from '../interfaces'
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
    blogSettings: BlogSettings
  }
}

const PostListTemplate: FC<PostListTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()
  const { numPages, currentPage, posts, basePath, blogSettings } = pageContext
  const { title, excerpt, slogan, categories } = blogSettings

  const transitions = useTransition(posts, item => item.node.slug.current, {
    trail: 650 / posts.length,
    from: { transform: 'translate3d(0,-24px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-24px,0)', opacity: 0 },
  })

  const handleNavigate = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(value >= 2 ? `${basePath}/${value}` : basePath)
  }

  return (
    <Layout isBlog>
      <SEO title={title} description={excerpt} path={path} />

      <Hero title={title} description={slogan}>
        <CategoryFilter categories={categories} basePath={basePath} />
      </Hero>

      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            {transitions.map(({ item, props, key }) => (
              <Grid
                component={animated.div}
                key={key}
                style={props}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <PostCard {...item.node} />
              </Grid>
            ))}
          </Grid>

          <div className={classes.pagination}>
            <Pagination
              count={numPages}
              page={currentPage}
              showFirstButton
              showLastButton
              onChange={handleNavigate}
            />
          </div>
        </Box>
      </Container>
    </Layout>
  )
}

export default PostListTemplate
