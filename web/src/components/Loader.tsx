import React from 'react'

import Box, { BoxProps } from '@material-ui/core/Box'
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress'

export interface LoaderProps {
  boxProps?: BoxProps
  loaderProps?: CircularProgressProps
}

function Loader({ boxProps, loaderProps }: LoaderProps) {
  return (
    <Box
      flex="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={12}
      {...boxProps}
    >
      <CircularProgress {...loaderProps} />
    </Box>
  )
}

export default Loader
