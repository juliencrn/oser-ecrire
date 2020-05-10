import React, { FC, useState, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { getCommentsByPostSlug } from './commentsAPI'
import { Comment as IComment } from '../../interfaces'
import CommentsForm from './CommentForm'
import Comment from './Comment'

interface CommentsProps {
  postSlug: string
  postTitle: string
}

const Comments: FC<CommentsProps> = ({ postSlug, postTitle }) => {
  const [comments, setComments] = useState<IComment[]>([])

  const fetchComments = async () => {
    const data = await getCommentsByPostSlug(postSlug)
    setComments(data)
  }

  const handleCommentSubmit = () => {
    fetchComments()
  }

  useEffect(() => {
    fetchComments()
    // Empty dependencies to run only onMount
  }, [])

  return (
    <Box mt={6} mb={3}>
      <Typography variant="h4">Laisser un commentaire</Typography>

      <CommentsForm
        postSlug={postSlug}
        postTitle={postTitle}
        onSubmit={handleCommentSubmit}
      />

      {comments.length > 0 &&
        comments.map(comment => <Comment key={comment._id} {...comment} />)}
    </Box>
  )
}

export default Comments
