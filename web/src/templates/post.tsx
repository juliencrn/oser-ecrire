import React, { useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Image from 'gatsby-image'
import { graphql } from 'gatsby'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'

import { Post, PageTemplate, Modal } from '../interfaces'
import Layout from '../layout'
import SEO from '../layout/seo'
import PostNavigation from '../components/blog/PostNavigation'
import Hero from '../components/Hero'
import PostSocialBar from '../components/blog/PostSocialBar'
import useSanityImages from '../hooks/useSanityImages'
import BodyPortableText from '../components/BodyPortableText'
import AuthorCard from '../components/cards/AuthorCard'
// import Comments from '../components/blog/Comments'

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

export function PostTemplate(props: Post) {
  const { title, excerpt, categories, mainImage, body } = props
  const classes = useStyles()

  // Percent of reading
  const readRef = useRef<HTMLDivElement>(null)
  const isBrowser = typeof window !== 'undefined'
  const [readPercent, setReadPercent] = useState(0)
  const displayProgress = readPercent >= 0 && readPercent <= 100

  // Get image Sharp
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
    <>
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

          {/* <Comments postSlug={slug.current} postTitle={title} /> */}
        </Container>
      </Box>
    </>
  )
}

interface Props extends PageTemplate {
  data: {
    post: Post
    next: Post
    prev: Post
  }
  pageContext: {
    modal: Modal
  }
}

export default function Template(props: Props) {
  const { modal } = props.pageContext
  const { post, prev, next } = props.data
  const { title, excerpt, mainImage } = post

  return (
    <Layout isBlog modal={modal}>
      <SEO
        title={title}
        description={excerpt}
        path={`${props.location.pathname}`}
        image={mainImage}
        isPost
      />

      {prev && <PostNavigation direction="left" post={prev} />}
      {next && <PostNavigation direction="right" post={next} />}

      <PostTemplate {...post} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($postId: String!, $nextId: String!, $prevId: String!) {
    post: sanityPost(_id: { eq: $postId }) {
      ...Post
    }
    prev: sanityPost(_id: { eq: $prevId }) {
      ...Post
    }
    next: sanityPost(_id: { eq: $nextId }) {
      ...Post
    }
  }
`
