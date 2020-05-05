import { Link as GatsbyLink } from 'gatsby'
import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Headroom from 'react-headroom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'

import { routes } from '../config'
import Menu from './menu'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  },
  toolbar: {},
  titles: {
    flexGrow: 1,
    display: 'flex',
  },
  text: {
    margin: 0,
    lineHeight: 1,
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

export interface HeaderProps {
  siteTitle: string
  isBlog?: boolean
}

const Header: FC<HeaderProps> = ({ siteTitle, isBlog = false }) => {
  const classes = useStyles()

  return (
    <Headroom>
      <AppBar component="header" position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.titles}>
            <Typography variant="h5" className={classes.text}>
              <Link
                to="/"
                component={GatsbyLink}
                color="inherit"
                className={classes.link}
              >
                {siteTitle}
              </Link>
            </Typography>
            <Hidden xsDown>
              <Box px={2}>
                <Divider orientation="vertical" />
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.text}
              >
                <Link
                  to={isBlog ? routes.blog : routes.redac}
                  component={GatsbyLink}
                  color="inherit"
                  className={classes.link}
                >
                  {isBlog ? `L'atelier d'écriture` : `Rédaction SEO`}
                </Link>
              </Typography>
            </Hidden>
          </div>

          <Menu />
        </Toolbar>
      </AppBar>
    </Headroom>
  )
}

export default Header
