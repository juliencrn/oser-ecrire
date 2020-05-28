import React from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { graphql, useStaticQuery } from 'gatsby'
import Image, { FluidObject } from 'gatsby-image'
import loadable from '@loadable/component'
import VisibilitySensor from 'react-visibility-sensor'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import { FooterWave } from '../../components/svg'
import Copyright from './Copyright'
import FooterColumns from './FooterColumns'
import { Grow } from '@material-ui/core'

const NewsletterForm = loadable(() =>
  import('../../components/forms/NewsletterForm'),
)

function useBirdImage(): FluidObject {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "bird" }) {
        childImageSharp {
          fluid(maxWidth: 150) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return data.file.childImageSharp.fluid
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  preFooter: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(-6),
    },
  },
  preFooterContent: {
    maxWidth: 560,
    margin: 'auto',
  },
  waveContainer: {
    position: 'relative',
  },
  bird: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: `82%`,
    marginBottom: theme.spacing(-1),
    width: theme.spacing(8),
  },
  background: {
    backgroundColor: theme.palette.primary.main,
  },
}))

function Footer({ isBlog }: { isBlog?: boolean }) {
  const classes = useStyles()
  const theme = useTheme()
  const fluidBird = useBirdImage()

  return (
    <footer className={classes.root}>
      {isBlog && (
        <Container maxWidth="xl" className={classes.preFooter}>
          <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <Grow in={isVisible}>
                <Grid container>
                  <Grid item xs={12} md={8}>
                    <Box className={classes.preFooterContent}>
                      <NewsletterForm />
                    </Box>
                  </Grid>
                </Grid>
              </Grow>
            )}
          </VisibilitySensor>
        </Container>
      )}

      <Box mb={-2} zIndex={-1}>
        <Image className={classes.bird} fluid={fluidBird} alt="oiseau" />
        <FooterWave color={theme.palette.primary.main} />
      </Box>

      <div className={classes.background}>
        <FooterColumns />
        <Copyright />
      </div>
    </footer>
  )
}

export default Footer
