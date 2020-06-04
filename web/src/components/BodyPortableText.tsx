/* eslint-disable react/display-name */
import React, { FC, memo } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import BlockContent from '@sanity/block-content-to-react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import Quote from './Quote'
import useSiteMetadata from '../hooks/useSiteMetadata'
import useSanityImages from '../hooks/useSanityImages'
import useAllPosts from '../hooks/useAllPosts'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  blogText: {
    fontSize: 20,
  },
  // Image with: 960px
  // Actual body container: 720px - px(2-3)
  imageWrap: {
    maxWidth: 960,
    margin: theme.spacing(6, 0),
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(6, -10),
    },
  },
  imageCaption: {
    marginTop: theme.spacing(1),
  },
  highlight: {
    backgroundColor: fade(theme.palette.primary.dark, 0.3),
  },
}))

const PortableText: FC<{ blocks?: any[] }> = ({ blocks }) => {
  const classes = useStyles()

  if (!blocks || !blocks.length) {
    return null
  }

  const { siteUrl } = useSiteMetadata()
  const [getImageById] = useSanityImages()
  const allPosts = useAllPosts()

  const serializers = {
    types: {
      block: (props: any) => {
        const style = props.node.style || 'normal'
        switch (style) {
          case 'h2':
            return (
              <Typography className={classes.title} variant="h3" component="h2">
                {props.children}
              </Typography>
            )
          case 'h3':
            return (
              <Typography className={classes.title} variant="h4" component="h3">
                {props.children}
              </Typography>
            )
          case 'h4':
            return (
              <Typography className={classes.title} variant="h5" component="h4">
                {props.children}
              </Typography>
            )
          case 'blockquote':
            return <Quote inPortableText>{props.children}</Quote>
          default:
            if (props.children[0] === '') {
              return <Box py={1.75} />
            }
            return (
              <Typography className={classes.blogText} variant="body1">
                {props.children}
              </Typography>
            )
        }
      },
      mainImage: (props: any) => {
        const mainImage = props?.node
        const image = getImageById(mainImage?.asset?._ref)

        if (!image || !mainImage) {
          return null
        }

        return (
          <Box className={classes.imageWrap}>
            <Image
              style={{ maxWidth: `100%` }}
              alt={mainImage?.alt}
              fluid={image.md}
            />
            {props.node.caption && (
              <Typography
                className={classes.imageCaption}
                variant="body2"
                color="textSecondary"
                align="center"
              >
                {mainImage?.caption}
              </Typography>
            )}
          </Box>
        )
      },
      quote: (props: any) => (
        <Quote inPortableText author={props.node?.author}>
          {props.node.text.split('\n').map((line: string, i: number) => (
            <span style={{ display: 'block' }} key={i}>
              {line}
            </span>
          ))}
        </Quote>
      ),
    },
    listItem: (props: any) => (
      <Typography className={classes.blogText} variant="body1" component="li">
        {props.children}
      </Typography>
    ),
    marks: {
      highlight: (props: any) => (
        <span className={classes.highlight}>{props.children}</span>
      ),
      link: (props: any) => {
        // Hack: replace old site link by internalLink if url matches
        const link = new URL(props.mark.href)
        const isMatch = link?.origin === siteUrl
        const isCategory = link?.pathname.includes('category')
        const isAdmin = link?.pathname.includes('wp-admin')

        if (isMatch && !(isCategory || isAdmin)) {
          return (
            <Link component={GatsbyLink} to={link.pathname}>
              {props.children}
            </Link>
          )
        }
        return (
          <Link href={props.mark.href} target="_blank">
            {props.children}
          </Link>
        )
      },
      internalLink: (props: any) => {
        // IF empty => prop.mark?
        // IF post => props.mark.reference._ref == 'slug'
        // IF page => props.mark.reference._ref == '_id'
        const ref = props.mark?.reference?._ref
        if (typeof ref === 'undefined') {
          return null
        }

        const isPost = !!allPosts.posts.filter(
          ({ slug }) => slug.current === ref,
        )[0]

        const url = isPost
          ? ref
          : allPosts.pages.filter(({ _id }) => _id === ref)[0]?.slug.current

        return (
          <Link component={GatsbyLink} to={`/${url}`}>
            {props.children}
          </Link>
        )
      },
    },
  }

  return (
    <div className={classes.root}>
      <BlockContent
        blocks={blocks}
        serializers={serializers}
        projectId={process.env.GATSBY_SANITY_PROJECTID}
        dataset={process.env.GATSBY_SANITY_DATASET}
      />
    </div>
  )
}

const BodyPortableText = memo(PortableText)

export default BodyPortableText
