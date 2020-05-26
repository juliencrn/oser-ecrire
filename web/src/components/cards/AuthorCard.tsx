import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link as GatsbyLink } from 'gatsby'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

import useAuthorData from '../../hooks/useAuthorData'
import useSanityImages from '../../hooks/useSanityImages'
import SocialButtons from '../SocialButtons'

export interface AuthorCardProps {
  direction?: 'vertical' | 'horizontal'
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: `100%`,
    flexDirection: (p: AuthorCardProps) =>
      p?.direction === 'vertical' ? 'column' : 'row',
  },
  avatar: {
    width: 56,
    height: 56,
    [theme.breakpoints.up('sm')]: {
      width: (p: AuthorCardProps) => (p?.direction === 'vertical' ? 200 : 80),
      height: (p: AuthorCardProps) => (p?.direction === 'vertical' ? 200 : 80),
    },
  },
  content: {
    flex: 1,
    padding: theme.spacing(0, 3),
    margin: (p: AuthorCardProps) =>
      p?.direction === 'vertical' ? theme.spacing(3, 0) : 0,
    textAlign: (p: AuthorCardProps) =>
      p?.direction === 'vertical' ? 'center' : 'left',
    '& p': {
      maxWidth: 400,
    },
  },
  name: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0),
    textDecoration: (p: AuthorCardProps) =>
      p?.direction === 'vertical' ? 'normal' : 'underline',
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}))

export interface AuthorCardProps {
  direction?: 'vertical' | 'horizontal'
  isContact?: boolean
}

const AuthorCard: FC<AuthorCardProps> = ({
  direction = 'horizontal',
  isContact = false,
}) => {
  const classes = useStyles({ direction })
  const { name, excerpt, mainImage } = useAuthorData()
  const [getImageById] = useSanityImages()
  const image = getImageById(mainImage?.asset.id)
  const isVertical = direction === 'vertical'

  return (
    <Box className={classes.root}>
      <Link to="/a-propos" component={GatsbyLink}>
        <Avatar
          className={classes.avatar}
          src={isVertical ? image?.xs.src : image?.xxs.src}
          srcSet={isVertical ? image?.xs.srcSet : image?.xxs.srcSet}
        ></Avatar>
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
        {isContact ? (
          <SocialButtons />
        ) : (
          <Button
            to="/contact"
            component={GatsbyLink}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
          >
            Contact
          </Button>
        )}
      </Hidden>
    </Box>
  )
}

export default AuthorCard
