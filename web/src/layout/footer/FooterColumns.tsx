import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import uuid from 'uuid/v1'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import useSiteSettings from '../../hooks/useSiteSettings'

const useStyles = makeStyles((theme: Theme) => ({
  columns: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6),
    },
  },
  column: {
    paddingLeft: theme.spacing(4),
    [theme.breakpoints.between('sm', 'lg')]: {
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(0),
    },
    '&.first': {
      paddingLeft: theme.spacing(0),
    },
  },
  logo: {
    maxWidth: `100%`,
    width: theme.spacing(16),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[6],
    display: 'block',

    marginTop: 'auto',
    marginBottom: 'auto',
    [theme.breakpoints.between('sm', 'md')]: {
      margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },
}))

function FooterColumns() {
  const classes = useStyles()
  const { logo, footerMenus } = useSiteSettings()

  return (
    <Container maxWidth="lg" className={classes.columns}>
      <Grid container spacing={4} justify="space-between">
        <Grid item xs={12} sm={6} md={12} lg={3}>
          <Box
            className={`${classes.column} first`}
            minHeight="100%"
            display="flex"
          >
            <Image
              className={classes.logo}
              fluid={logo.asset.fluid}
              alt={logo.alt}
            />
          </Box>
        </Grid>

        {footerMenus.map(({ title, menu }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}>
            <Box className={classes.column}>
              <div>
                <Typography gutterBottom variant="h6" color="textPrimary">
                  {title}
                </Typography>
                {menu.map(({ label, to }) => (
                  <Typography key={uuid()}>
                    <Link
                      to={to}
                      component={GatsbyLink}
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      {label}
                    </Link>
                  </Typography>
                ))}
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default FooterColumns
