import React, { FC } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import { QuoteIconBefore } from './svg'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(8, 3, 6),
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
  },
  floatIcon: {
    position: 'absolute',
    maxWidth: `100%`,
    width: theme.spacing(8),
    height: 'auto',
    top: 0,
    left: 0,
    marginLeft: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  quote: {
    marginBottom: theme.spacing(2),
    fontStyle: 'italic',
    textAlign: 'center',
  },
  author: {
    fontWeight: 600,
    textAlign: 'center',
  },
}))

export interface QuoteProps {
  author?: string
  inPortableText?: boolean
  isVisible?: boolean
}

const Quote: FC<QuoteProps> = ({
  author,
  inPortableText = false,
  children,
}) => {
  const classes = useStyles({ inPortableText })
  const { palette } = useTheme()
  return (
    <Box component={Paper} className={classes.root}>
      <div className={classes.floatIcon}>
        <QuoteIconBefore color={palette.primary.main} />
      </div>
      <Typography
        variant={inPortableText ? 'subtitle2' : 'subtitle1'}
        component="p"
        className={classes.quote}
      >
        {children}
      </Typography>

      {!!author && (
        <Typography
          variant={inPortableText ? 'body1' : 'subtitle2'}
          align="right"
          color="textSecondary"
          component="p"
          className={classes.author}
        >{`— ${author}`}</Typography>
      )}
    </Box>
  )
}

export default Quote
