import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Container, Typography, Theme, Link } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}))

export interface FooterProps {
  siteName: string
}

const Footer: FC<FooterProps> = ({ siteName }) => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary">
          © {new Date().getFullYear()} {siteName}
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
