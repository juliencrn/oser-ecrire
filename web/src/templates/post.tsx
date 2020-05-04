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
import AuthorCard from '../components/AuthorCard'
import BodyPortableText from '../components/BodyPortableText'
import PostSocialBar from '../components/PostSocialBar'
import Comments from '../components/Comments'

const useStyles = makeStyles((theme: Theme) => ({
  title: {},
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
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

  const {
    title,
    excerpt,
    mainImage,
    body,
    images,
    categories,
  } = pageContext.current

  return (
    <Layout isBlog>
      <SEO title={title} description={excerpt} path={path} />

      <Hero title={title} description={excerpt}>
        <PostSocialBar categories={categories} />
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
          <Divider className={classes.divider} />

          <BodyPortableText blocks={body} images={images} />
          <PostSocialBar categories={categories} />

          <Divider className={classes.divider} />

          <AuthorCard />

          <Divider className={classes.divider} />

          <Comments uid={path} title={title} />
        </Container>
      </div>
    </Layout>
  )
}

export default PostTemplate
