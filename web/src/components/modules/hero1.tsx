import React from 'react'
import uuid from 'uuid/v1'
import Image from 'gatsby-image'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { Module } from '../../interfaces'
import useSanityImages from '../../hooks/useSanityImages'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
  },
  container: {
    position: 'relative',
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: `50%`,
      left: 0,
      transform: `translateY(-50%)`,
    },
  },
  image: {
    zIndex: -1,
    width: `100%`,
    opacity: 0.7,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}))

function Hero1Module({ title, introduction, mainImage }: Module) {
  const classes = useStyles()
  const { breakpoints } = useTheme()
  const [getImageById] = useSanityImages()
  const image = getImageById(mainImage?.asset.id)
  const isLarge = useMediaQuery(breakpoints.up('sm'))

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid
        container
        spacing={2}
        justify="flex-end"
        className={classes.container}
      >
        <Grid className={classes.content} key={uuid()} item xs={12} md={9}>
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
        </Grid>
        <Grid item sm={7} className={classes.image}>
          {image && mainImage?.asset && isLarge && (
            <Image fluid={image.sm} alt={mainImage.alt} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Hero1Module
