import React, { FC, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Image from 'gatsby-image'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate, Post, Modal } from '../interfaces'
import Hero from '../components/Hero'
import AuthorCard from '../components/cards/AuthorCard'
import BodyPortableText from '../components/BodyPortableText'
import PostSocialBar from '../components/blog/PostSocialBar'
import Comments from '../components/blog/Comments'
import PostNavigation from '../components/blog/PostNavigation'
import useSanityImages from '../hooks/useSanityImages'

const useStyles = makeStyles((theme: Theme) => ({
  title: {},
  mainImage: {
    maxWidth: 960,
    margin: 'auto',
  },
  divider: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  progress: {
    backgroundColor: 'transparent',
    height: theme.spacing(1),
    position: 'fixed',
    top: 0,
    left: 0,
    width: `100%`,
    zIndex: 1,
  },
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    current: Post
    next: Post
    prev: Post
    modal: Modal
  }
}

const PostTemplate: FC<PostTemplateProps> = props => {
  const { current, prev, next, modal } = props.pageContext
  const { title, excerpt, mainImage, categories, slug, body } = current
  const classes = useStyles()
  const readRef = useRef<HTMLDivElement>(null)
  const isBrowser = typeof window !== 'undefined'
  const [readPercent, setReadPercent] = useState(0)
  const displayProgress = readPercent >= 0 && readPercent <= 100
  const [getImageById] = useSanityImages()
  const image = getImageById(mainImage?.asset.id)

  useScrollPosition(
    ({ currPos }) => {
      const element = readRef?.current
      if (element && isBrowser) {
        const readArea = element.clientHeight
        const percent = (100 * currPos.y) / readArea
        setReadPercent(percent)
      }
    },
    [],
    readRef,
    true,
    100,
  )

  return (
    <Layout isBlog modal={modal}>
      <SEO
        title={title}
        description={excerpt}
        path={props.path}
        image={mainImage}
        isPost
      />
      <PostNavigation direction="left" post={prev} />
      <PostNavigation direction="right" post={next} />

      {displayProgress && (
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={readPercent}
          color="primary"
        />
      )}

      <div ref={readRef}>
        <Hero title={title} subtitle={excerpt}>
          <PostSocialBar categories={categories} />
        </Hero>

        <Container maxWidth="lg">
          {image && (
            <Box mb={8} mt={4}>
              <Image
                alt={mainImage?.alt}
                className={classes.mainImage}
                fluid={image.md}
              />
            </Box>
          )}
        </Container>

        <Container maxWidth="md">
          <Divider className={classes.divider} />

          <Box mb={4}>
            <BodyPortableText blocks={body} />
          </Box>
        </Container>
      </div>

      <Box mb={6}>
        <Container maxWidth="md">
          <PostSocialBar categories={categories} />

          <Divider className={classes.divider} />

          <AuthorCard />

          <Divider className={classes.divider} />

          <Comments postSlug={slug.current} postTitle={title} />
        </Container>
      </Box>
    </Layout>
  )
}

export default PostTemplate
