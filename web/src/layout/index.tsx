import React, { FC, useEffect } from 'react'
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

  // Disallow right click on blog for protecting content
  useEffect(() => {
    const disable = (event: MouseEvent) => event.preventDefault()
    const isBrowser = typeof document !== 'undefined'
    const isProd = process.env.NODE_ENV === 'production'
    const condition = isProd && isBrowser && isBlog

    if (condition) {
      document.addEventListener('contextmenu', disable)
    }
    return () => {
      if (condition) {
        document.removeEventListener('contextmenu', disable)
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header siteTitle={title} isBlog={isBlog} />
        <main className={classes.main}>{children}</main>
        <Footer isBlog={isBlog} />
      </div>
      <BackToTop />
    </ThemeProvider>
  )
}

export default Layout
