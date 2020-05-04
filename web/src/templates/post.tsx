import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Image from 'gatsby-image'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'

import Layout from '../layout'
import SEO from '../components/seo'
import { PageTemplate, Post } from '../interfaces'
import Hero from '../components/Hero'
import BodyPortableText from '../components/BodyPortableText'

const useStyles = makeStyles((theme: Theme) => ({
  title: {},

  body: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(6),
  },
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    current: Post
    next: Post
    prev: Post
  }
}

const PostTemplate: FC<PostTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()

  const { title, excerpt, mainImage, body, images } = pageContext.current

  return (
    <Layout isBlog>
      <SEO title={title} description={excerpt} path={path} />

      <Hero title={pageContext.current.title} description={excerpt}>
        {/* // TODO : Post header */}
        <ul>
          <li>Info sur l'auteur</li>
          <li>Categories</li>
          <li>Button de partage</li>
        </ul>
      </Hero>
      <div className={classes.body}>
        <Container maxWidth="lg">
          {mainImage && (
            <Box mb={8}>
              <Image alt={mainImage.alt} fluid={mainImage.asset.md} />
            </Box>
          )}
        </Container>

        <Container maxWidth="md">
          <Box my={4}>
            <Divider />
          </Box>
          <BodyPortableText blocks={body} images={images} />
          <Box my={4}>
            <Divider />
          </Box>

          {/* // TODO : Post footer */}
        </Container>
      </div>
    </Layout>
  )
}

export default PostTemplate
