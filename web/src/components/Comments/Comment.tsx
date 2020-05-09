import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { formatDistanceToNow } from 'date-fns'
import fr from 'date-fns/locale/fr'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import { Comment as IComment } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  avatar: {},
}))

export interface CommentProps extends IComment {
  onDelete?: (id: string) => void
}

const Comment: FC<CommentProps> = ({
  _id,
  username,
  _createdAt,
  message,
  onDelete,
}) => {
  const classes = useStyles()
  const date = formatDistanceToNow(new Date(_createdAt), {
    locale: fr,
  })

  return (
    <Box mb={3} className={classes.root}>
      <Box className={classes.header}>
        <Avatar className={classes.avatar}>
          {username.slice(0, 1).toUpperCase()}
        </Avatar>

        <Box pl={2} py={1} mr="auto">
          <Typography>{username}</Typography>
          <Typography color="textSecondary" variant="body2">
            {date}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          {onDelete && (
            <Tooltip title="Supprimer">
              <IconButton onClick={() => onDelete(_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {message.split('\n').map((line, i) => (
        <Typography key={i} className={classes.message}>
          {line}
        </Typography>
      ))}

      <Divider />
    </Box>
  )
}

export default Comment
