import React, { FC } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Theme, CssBaseline } from '@material-ui/core'

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
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
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
        <main>{children}</main>
        <Footer siteName={title} />
      </div>
      <BackToTop />
    </ThemeProvider>
  )
}

export default Layout
