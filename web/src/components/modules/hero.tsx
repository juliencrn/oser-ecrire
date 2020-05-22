import React from 'react'
import Image from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

import { Module, Overlay } from '../../interfaces'
import useSanityImages from '../../hooks/useSanityImages'
import useSiteSettings from '../../hooks/useSiteSettings'
import { linkSerializer } from '../../utils'

interface StyleProps {
  overlay?: Overlay
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),

    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(24),
      marginBottom: theme.spacing(24),
    },
  },
  container: {
    position: 'relative',
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: `50%`,
      transform: `translateY(-50%)`,

      '&.left': { left: 0 },
      '&.right': { right: 0 },
    },
  },
  contentBox: {
    backgroundColor: (p: StyleProps) =>
      p?.overlay === 'text' ? theme.palette.primary.light : 'transparent',

    padding: (p: StyleProps) =>
      p?.overlay === 'text' ? theme.spacing(10, 6, 6) : theme.spacing(6, 0),

    textShadow: (p: StyleProps) =>
      p?.overlay === 'text' ? 'unset' : `0px 1px 4px rgba(255, 255, 255, .8)`,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(3),
    textShadow: 'none',
  },
  linkIcon: {
    marginLeft: theme.spacing(1),
  },
}))

function HeroModule(props: Module) {
  const {
    title,
    introduction,
    mainImage,
    overlay = 'none',
    textSide,
    link,
  } = props
  const classes = useStyles({ overlay })
  const { breakpoints } = useTheme()
  const { blog } = useSiteSettings()
  const serialize = linkSerializer(blog.path)
  const [getImageById] = useSanityImages()
  const image = getImageById(mainImage?.asset?.id)
  const isLarge = useMediaQuery(breakpoints.up('sm'))
  const isLeft = textSide !== 'right'
  const width = props?.width || 'lg'

  return (
    <Container maxWidth={width} className={classes.root}>
      <Grid
        container
        justify={isLeft ? 'flex-end' : 'flex-start'}
        className={classes.container}
      >
        <Grid
          className={`${classes.content} ${isLeft ? 'left' : 'right'}`}
          item
          xs={12}
          md={width === 'lg' ? 8 : 6}
        >
          <Box className={classes.contentBox}>
            {title && (
              <Typography variant="h3" className={classes.title}>
                {title}
              </Typography>
            )}

            {introduction &&
              introduction.split('\n').map((line, i) => (
                <Typography variant="subtitle2" key={i}>
                  {line}
                </Typography>
              ))}

            {link && (
              <Button
                component={GatsbyLink}
                to={serialize(link).to}
                color="primary"
                variant="contained"
                className={classes.link}
              >
                {serialize(link).label}
                <ArrowRightAltIcon
                  fontSize="large"
                  className={classes.linkIcon}
                />
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item sm={width === 'lg' ? 7 : 9} style={{ zIndex: -1 }}>
          {isLarge && (
            <Box my={8}>
              {image && mainImage?.asset ? (
                <Image
                  style={{ opacity: overlay === 'none' ? 0.8 : 1 }}
                  fluid={image.sm}
                  alt={mainImage.alt}
                />
              ) : (
                <Box
                  bgcolor={overlay === 'image' ? 'primary.light' : 'inherit'}
                  width="100%"
                  height="100%"
                  minHeight={600}
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default HeroModule
