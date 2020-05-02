import React, { FC } from 'react'
// import { Link as GatsbyLink } from 'gatsby'
import { Box, Button } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  category: {
    margin: theme.spacing(0, 0.5),
  },
}))

const CategoryFilter: FC = () => {
  const classes = useStyles()
  const active = 0
  return (
    <Box className={classes.root}>
      {[0, 1, 2, 3].map((_, i) => (
        <Button
          className={classes.category}
          color="default"
          style={{
            fontWeight: active === i ? 'bold' : 'normal',
          }}
          key={i}
        >
          {i === 0 ? 'Tous' : 'Category name'}
        </Button>
      ))}
    </Box>
  )
}

export default CategoryFilter
