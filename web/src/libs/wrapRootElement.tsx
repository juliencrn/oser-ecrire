import React, { ReactNode } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Theme, CssBaseline } from '@material-ui/core'

import theme from '../theme'

const wrapRootElement = ({ element }: { element: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </ThemeProvider>
)

export default wrapRootElement
