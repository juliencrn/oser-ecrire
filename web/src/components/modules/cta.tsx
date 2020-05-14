import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import { Module } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: 0,
  },
  divider: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
  },
  button: {
    whiteSpace: 'nowrap',
  },
}))

export default function CtaModule({ title, link }: Module) {
  const classes = useStyles()

  if (!link) {
    return null
  }

  return (
    <Box className={classes.section}>
      <Divider className={classes.divider} />
      <Container maxWidth="lg">
        <Grid container spacing={4} justify="space-between" alignItems="center">
          <Grid item xs={12} md>
            <Typography variant="h3" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              color="secondary"
              component={GatsbyLink}
              to={`/${link.reference.slug}`}
            >
              {link?.label || link.reference.title}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Divider className={classes.divider} />
    </Box>
  )
}
