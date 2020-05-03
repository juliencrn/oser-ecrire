import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import Layout from '../layout'
import SEO from '../components/seo'
import { PageTemplate, Post, Category, NodeArrayOf } from '../interfaces'
import PostCard from '../components/PostCard'
import Hero from '../components/Hero'
import CategoryFilter from '../components/CategoryFilter'

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
        containerProps={{ maxWidth: 'md' }}
      >
        <CategoryFilter categories={categories} basePath={basePath} />
      </Hero>

      <Container maxWidth="md">
        <Box py={6}>
          <Grid container spacing={4}>
            {posts.map(({ node }) => (
              <Grid item key={node.slug.current} xs={12} sm={6} md={4}>
                <PostCard {...node} />
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
