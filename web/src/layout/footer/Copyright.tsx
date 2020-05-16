import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import useSiteSettings from '../../hooks/useSiteSettings'

const useStyles = makeStyles((theme: Theme) => ({
  copyright: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    ...theme.mixins.toolbar,
  },
}))

function Copyright() {
  const classes = useStyles()
  const { title } = useSiteSettings()
  return (
    <Container maxWidth="md" className={classes.copyright}>
      <Typography variant="body1" color="textSecondary" align="center">
        © {new Date().getFullYear()} {title} - Site réalisé par
        {` `}
        <Link color="inherit" href="https://juliencaron.eu/" target="_blank">
          Julien CARON
        </Link>
      </Typography>
    </Container>
  )
}

export default Copyright
