import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Img from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import useSanityImages from '../../hooks/useSanityImages'
import { Hidden, Button } from '@material-ui/core'
import { Module, Quality as IQuality } from '../../interfaces'
import useSiteSettings from '../../hooks/useSiteSettings'
import { linkSerializer } from '../../utils'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
  },
  itemText: {
    textTransform: 'uppercase',
  },
  dividerX: {
    backgroundColor: theme.palette.common.black,
    height: theme.spacing(0.25),
  },
  dividerY: {
    backgroundColor: theme.palette.common.black,
    position: 'absolute',
    height: `50%`,
    width: theme.spacing(0.25),

    '&.left': { left: 0 },
    '&.right': { right: 0 },
    '&.top': { top: 0 },
    '&.bottom': { bottom: 0 },
  },
  image: {
    zIndex: 1,
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    width: 150,

    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
}))

interface QualityProps extends IQuality {
  reverse?: boolean
  dividerClasses?: ('left' | 'right' | 'top' | 'bottom')[]
}

function Quality({
  answer,
  response,
  reverse,
  dividerClasses = [],
}: QualityProps) {
  const classes = useStyles()
  return (
    <Box
      py={[2, 6]}
      width="100%"
      textAlign={['left', reverse ? 'right' : 'left']}
      position="relative"
    >
      <Typography variant="subtitle2" className={classes.itemText}>
        {answer}
      </Typography>
      <Divider className={classes.dividerX} />
      <Hidden xsDown>
        <>
          {!dividerClasses.length || (
            <Box
              className={`${classes.dividerY} ${dividerClasses.join(' ')}`}
            />
          )}
        </>
      </Hidden>
      <Typography variant="subtitle2" className={classes.itemText}>
        {response}
      </Typography>
    </Box>
  )
}

function AboutMeModule(props: Module) {
  const { title, subtitle, link, mainImage, qualities } = props

  if (!qualities || qualities.length !== 5) {
    return null
  }

  const [getImageById] = useSanityImages()
  const image = getImageById(mainImage?.asset.id)
  const { blog } = useSiteSettings()
  const serialize = linkSerializer(blog.path)
  const classes = useStyles()

  return (
    <Box my={16}>
      <Container maxWidth="lg" className={classes.container}>
        {title && (
          <Typography variant="h3" component="h2" gutterBottom>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="h3"
            gutterBottom
          >
            {subtitle}
          </Typography>
        )}

        <Hidden xsDown>
          {image && (
            <Card elevation={5} className={classes.image}>
              <Img
                fluid={image?.xs}
                alt={mainImage?.alt}
                style={{ width: `100%`, margin: 'auto' }}
              />
            </Card>
          )}
        </Hidden>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box py={[0, 5]} />
            <Quality {...qualities[0]} dividerClasses={['right', 'bottom']} />
            <Box py={[1, 3]} />
            <Quality {...qualities[1]} dividerClasses={['right', 'top']} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Quality
              {...qualities[2]}
              reverse
              dividerClasses={['left', 'bottom']}
            />
            <Box py={[1, 0]} />
            <Quality {...qualities[3]} reverse />
            <Box py={[1, 0]} />
            <Quality
              {...qualities[4]}
              reverse
              dividerClasses={['left', 'top']}
            />
          </Grid>
        </Grid>

        {link && (
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              component={GatsbyLink}
              to={serialize(link).to}
              size="large"
              variant="contained"
              color="primary"
            >
              {serialize(link).label}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default AboutMeModule
