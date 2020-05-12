import React, { FC, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { Post } from '../../interfaces'
import PostCard from './PostCard'
import { navigate } from 'gatsby'

const useStyles = makeStyles((theme: Theme) => ({
  position: {
    position: 'fixed',
    display: 'flex',
    zIndex: 1000,
    top: `50%`,
    '&.left': {
      left: 0,
      transform: `translateY(-50%)`,
      marginLeft: theme.spacing(3),
    },
    '&.right': {
      left: `100%`,
      transform: `translate(-100%, -50%)`,
      marginLeft: theme.spacing(-3),
      flexDirection: 'row-reverse',
    },
  },
  iconButtonLeft: {
    // fix icon center
    // default padding: 12px
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },

  paper: {
    margin: theme.spacing(0, 3),
    padding: theme.spacing(1),
    width: 360,
    position: 'relative',
  },
}))

export interface PostNavigationProps {
  direction: 'left' | 'right'
  post: Post
}

const PostNavigation: FC<PostNavigationProps> = ({ direction, post }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const inverseDirection = direction === 'left' ? 'right' : 'left'

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const goTo = () => {
    navigate(post.slug.current)
  }

  const open = Boolean(anchorEl)

  return (
    <Hidden mdDown>
      <Box
        className={`${classes.position} ${direction}`}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={goTo}
            className={direction === 'left' ? classes.iconButtonLeft : ``}
          >
            {direction === 'left' ? (
              <ArrowBackIosIcon />
            ) : (
              <ArrowForwardIosIcon />
            )}
          </IconButton>
        </Box>

        <Slide
          direction={inverseDirection}
          in={open}
          mountOnEnter
          unmountOnExit
        >
          <Paper className={classes.paper} elevation={4}>
            <PostCard {...post} />
          </Paper>
        </Slide>
      </Box>
    </Hidden>
  )
}

export default PostNavigation
