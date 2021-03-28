import React, { FC } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './header'
import Footer from './footer'
import theme from '../theme'
import useSiteSettings from '../hooks/useSiteSettings'
import BackToTop from './BackToTop'
import Modal from '../components/Modal'
import { Modal as IModal } from '../interfaces'

const useStyles = makeStyles(() => ({
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
  modal?: IModal
}

const Layout: FC<LayoutProps> = ({ children, modal, isBlog = false }) => {
  const classes = useStyles()
  const { title } = useSiteSettings()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className={classes.root}>
        <Header siteTitle={title} isBlog={isBlog} />
        <main className={classes.main}>{children}</main>
        <Footer isBlog={isBlog} />
      </div>

      <BackToTop />

      {modal?.active && <Modal {...modal} />}
    </ThemeProvider>
  )
}

export default Layout
