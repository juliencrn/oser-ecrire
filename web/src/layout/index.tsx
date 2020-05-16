import React, { FC } from 'react'
import { makeStyles, ThemeProvider, Theme } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './header'
import Footer from './footer'
import theme from '../theme'
import useSiteSettings from '../hooks/useSiteSettings'
import BackToTop from './BackToTop'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
  },
}))

export interface LayoutProps {
  isBlog?: boolean
}

const Layout: FC<LayoutProps> = ({ children, isBlog = false }) => {
  const classes = useStyles()
  const { title } = useSiteSettings()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header siteTitle={title} isBlog={isBlog} />
        <main className={classes.main}>{children}</main>
        <Footer />
      </div>
      <BackToTop />
    </ThemeProvider>
  )
}

export default Layout
