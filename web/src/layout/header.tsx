import { Link as GatsbyLink } from 'gatsby'
import React, { FC } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import Headroom from 'react-headroom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'

import { routes } from '../config'

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

const links = [
  { label: 'À propos', to: '/a-propos' },
  { label: "L'atelier d'écriture", to: routes.blog },
  { label: 'Rédaction SEO', to: routes.redac },
  { label: 'Contact', to: '/contact' },
]

const Header: FC<HeaderProps> = ({ siteTitle, isBlog = false }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('md'))

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

          {isLarge ? (
            <>
              {links.map(({ label, to }) => (
                <Button key={to} component={GatsbyLink} to={to} color="inherit">
                  {label}
                </Button>
              ))}
            </>
          ) : (
            <IconButton>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Headroom>
  )
}

export default Header
