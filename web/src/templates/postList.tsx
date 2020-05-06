import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useTransition, animated } from 'react-spring'
import loadable from '@loadable/component'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../components/seo'
import { PageTemplate, Post, Category, NodeArrayOf } from '../interfaces'
import Hero from '../components/Hero'
import CategoryFilter from '../components/CategoryFilter'

const AsyncPostCard = loadable(() => import('../components/PostCard'))
const AsyncPagination = loadable(() => import('@material-ui/lab/Pagination'))

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
    categories: NodeArrayOf<Category>
    numPages: number
    basePath: string
    currentPage: number
    posts: NodeArrayOf<Post>
  }
}

const PostListTemplate: FC<PostListTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()
  const { numPages, currentPage, posts, categories, basePath } = pageContext

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
      <SEO
        title="L'atelier d'écriture"
        description="L'Atelier d'Écriture qui Libère Votre Créativité"
        path={path}
      />

      <Hero
        title="L'atelier d'écriture"
        description="L'Atelier d'Écriture qui Libère Votre Créativité"
      >
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
                <AsyncPostCard {...item.node} />
              </Grid>
            ))}
          </Grid>

          <div className={classes.pagination}>
            <AsyncPagination
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
