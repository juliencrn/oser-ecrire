import React, { FC, useState } from 'react'
import loadable from '@loadable/component'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const AsyncComments = loadable(() => import(`react-disqus-comments`))

interface CommentsProps {
  uid: string
  title: string
}

const Comments: FC<CommentsProps> = ({ uid, title }) => {
  const [visible, setVisible] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (!url) {
    return null
  }

  return (
    <Box my={4}>
      {visible ? (
        <AsyncComments
          shortname="juliencaron"
          identifier={uid}
          title={title}
          url={url}
        />
      ) : (
        <Button
          variant="outlined"
          color="primary"
          style={{ width: `100%` }}
          onClick={toggleVisibility}
        >
          Voir les commentaires
        </Button>
      )}
    </Box>
  )
}

export default Comments
