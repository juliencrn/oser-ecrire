import React, { FC, useEffect } from 'react'
import { makeStyles, ThemeProvider, Theme } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './header'
import Footer from './footer'
import theme from '../theme'
import useSiteSettings from '../hooks/useSiteSettings'
import BackToTop from './BackToTop'
import Modal from '../components/Modal'
import { Modal as IModal } from '../interfaces'

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
  modal: IModal
}

const Layout: FC<LayoutProps> = ({ children, modal, isBlog = false }) => {
  const classes = useStyles()
  const { title } = useSiteSettings()

  // Disallow right click, cut & copy on blog for protecting content
  useEffect(() => {
    const disable = (event: any) => event.preventDefault()
    const isBrowser = typeof document !== 'undefined'
    const isProd = process.env.NODE_ENV === 'production'
    const condition = isProd && isBrowser && isBlog

    if (condition) {
      document.addEventListener('contextmenu', disable)
      document.addEventListener('copy', disable)
      document.addEventListener('cut', disable)
    }
    return () => {
      if (condition) {
        document.removeEventListener('contextmenu', disable)
        document.removeEventListener('copy', disable)
        document.removeEventListener('cut', disable)
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

      {modal.active && <Modal {...modal} />}
    </ThemeProvider>
  )
}

export default Layout
