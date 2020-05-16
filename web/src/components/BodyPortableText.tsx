/* eslint-disable react/display-name */
import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import { makeStyles, Theme } from '@material-ui/core/styles'
import BlockContent from '@sanity/block-content-to-react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import Quote from './Quote'
import useSiteMetadata from '../hooks/useSiteMetadata'

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
    margin: theme.spacing(4, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(6, -10),
    },
  },
  imageCaption: {
    marginTop: theme.spacing(1),
  },
}))

export interface BodyPortableTextProps {
  blocks: any[]
  images?: any[]
}

const BodyPortableText: FC<BodyPortableTextProps> = ({ blocks, images }) => {
  const classes = useStyles()
  const { siteUrl } = useSiteMetadata()

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
            return (
              <Typography className={classes.blogText} variant="body1">
                {props.children}
              </Typography>
            )
        }
      },
      mainImage: (props: any) => {
        if (!images) return null
        const image = images.filter(
          ({ node }) => node.id === props.node.asset._ref,
        )[0]
        if (!image) return null
        return (
          <Box className={classes.imageWrap}>
            <Image alt={props.node.alt} fluid={image.node.md} />
            {props.node.caption && (
              <Typography
                className={classes.imageCaption}
                variant="body2"
                color="textSecondary"
                align="center"
              >
                {props.node.caption}
              </Typography>
            )}
          </Box>
        )
      },
      quote: (props: any) => (
        <Quote inPortableText author={props.node?.author}>
          {props.node.text}
        </Quote>
      ),
    },
    listItem: (props: any) => (
      <Typography className={classes.blogText} variant="body1" component="li">
        {props.children}
      </Typography>
    ),
    marks: {
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
      internalLink: (props: any) => (
        <Link component={GatsbyLink} to={`/${props.mark.reference._ref}`}>
          {props.children}
        </Link>
      ),
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

export default BodyPortableText
