import React from 'react'
import loadable from '@loadable/component'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Zoom from '@material-ui/core/Zoom'
import Box from '@material-ui/core/Box'

import { Module } from '../../interfaces'
import { Blob1 } from '../svg'

const NewsletterForm = loadable(() => import('../forms/NewsletterForm'))
const ContactForm = loadable(() => import('../forms/ContactForm'))
const AuthorCard = loadable(() => import('../cards/AuthorCard'))

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  blob: {
    display: 'none',
    maxWidth: 850,
    position: 'absolute',
    transform: `translate(-50%, -50%)`,
    zIndex: -1,

    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: `90%`,
      top: `50%`,
      left: `30%`,
    },

    [theme.breakpoints.up('lg')]: {
      width: `70%`,
      top: `50%`,
      left: `30%`,
    },
    [theme.breakpoints.up('xl')]: {
      width: `45%`,
      top: `45%`,
      left: `30%`,
    },
  },
}))

function FormModule({ form, isVisible }: Module) {
  const classes = useStyles()
  const { palette } = useTheme()
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  switch (form?.type) {
    case 'contactForm':
      return (
        <Box my={20} position="relative">
          <Zoom timeout={800} in={isVisible}>
            <Container maxWidth="xl">
              <Grid container spacing={4} justify="space-between">
                <Grid item xs={12} md={5}>
                  <Box py={4} height="100%" display="flex" alignItems="center">
                    <AuthorCard
                      direction={isMobile ? 'horizontal' : 'vertical'}
                      isContact
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <ContactForm />
                </Grid>
              </Grid>
              <Box className={classes.blob}>
                <Blob1 color={palette.secondary.light} />
              </Box>
            </Container>
          </Zoom>
        </Box>
      )

    case 'newsletterForm':
      return (
        <Box py={8} bgcolor="secondary.light">
          <Zoom timeout={800} in={isVisible}>
            <Container maxWidth="md">
              <NewsletterForm />
            </Container>
          </Zoom>
        </Box>
      )

    default:
      return null
  }
}

export default FormModule
