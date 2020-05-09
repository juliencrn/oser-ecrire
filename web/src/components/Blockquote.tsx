import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    borderLeft: `4px solid`,
    borderColor: theme.palette.grey[400],
    padding: theme.spacing(1, 0),
    paddingLeft: theme.spacing(3),
    margin: theme.spacing(3, 0),
    display: 'block',
    backgroundColor: theme.palette.background.paper,
  },
  quote: {
    marginBottom: theme.spacing(2),
    fontStyle: 'italic',
  },
  icon: {
    color: theme.palette.grey[400],
    '&.start': {
      transform: `rotate(180deg)`,
      marginRight: theme.spacing(1),
    },
    '&.end': {
      marginLeft: theme.spacing(1),
    },
  },
  author: {
    fontWeight: 600,
  },
}))

const Blockquote: FC<{ author?: string }> = ({ author, children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography
        variant="subtitle1"
        component="p"
        color="textSecondary"
        className={classes.quote}
      >
        <FormatQuoteIcon className={classes.icon + ` start`} />
        {children}
        <FormatQuoteIcon className={classes.icon + ' end'} />
      </Typography>
      {!!author && (
        <Typography
          variant="subtitle2"
          align="right"
          component="p"
          className={classes.author}
        >{`— ${author}`}</Typography>
      )}
    </Box>
  )
}

export default Blockquote
