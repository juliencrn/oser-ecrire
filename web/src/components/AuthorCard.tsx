import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link as GatsbyLink } from 'gatsby'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import useAuthorData from '../hooks/useAuthorData'
import { Hidden } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    [theme.breakpoints.up('sm')]: {
      width: 80,
      height: 80,
    },
  },
  content: {
    flex: 1,
    padding: theme.spacing(0, 3),
    '& p': {
      maxWidth: 400,
    },
  },
  name: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0),
    textDecoration: 'underline',
  },
}))

const AuthorCard: FC = () => {
  const classes = useStyles()
  const { name, excerpt, mainImage } = useAuthorData()

  return (
    <Box className={classes.root}>
      <Link to="/a-propos" component={GatsbyLink}>
        <Avatar
          className={classes.avatar}
          src={mainImage.asset.sm.src}
          srcSet={mainImage.asset.sm.srcSet}
        />
      </Link>
      <Box className={classes.content}>
        <Typography variant="body2" color="textSecondary">
          Auteur
        </Typography>
        <Typography variant="h5" className={classes.name}>
          <Link to="/a-propos" component={GatsbyLink} color="inherit">
            {name}
          </Link>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {excerpt}
        </Typography>
      </Box>
      <Hidden xsDown>
        <Button
          to="/contact"
          component={GatsbyLink}
          variant="contained"
          color="primary"
          size="small"
        >
          Contact
        </Button>
      </Hidden>
    </Box>
  )
}

export default AuthorCard
