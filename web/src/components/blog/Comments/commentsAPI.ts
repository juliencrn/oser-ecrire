import Axios from 'axios'

import { Comment } from '../../../interfaces'

export const getCommentsByPostSlug = async (
  slug: string,
): Promise<Comment[]> => {
  try {
    const url = `/.netlify/functions/getComments?postSlug=${slug}`
    const res = await Axios.get(url)
    return (res.data as Comment[]) || []
  } catch (error) {
    console.log({ error })
  }
  return []
}

export type CreateCommentFields = Omit<
  Comment,
  '_createdAt' | '_updatedAt' | '_type' | '_id'
>

export const createComment = async (comment: CreateCommentFields) => {
  try {
    const url = `/.netlify/functions/postComment`
    const res = await Axios.post(url, { ...comment, _type: 'comment' })
    return res.status < 400
  } catch (error) {
    console.log({ error })
  }
  return false
}

// interface UpdateCommentFields extends CreateCommentFields {
//   _id: string
// }
// export const updateComment = async (comment: UpdateCommentFields) => {
//   client
//     .createOrReplace({ ...comment, _type: 'comment' })
//     .then(res => console.log({ res }))
// }

// export const deleteComment = async (commentId: string) => {
//   client
//     .delete(commentId)
//     .then(res => {
//       console.log('Comment deleted')
//     })
//     .catch(err => {
//       console.error('Delete failed: ', err.message)
//     })
// }
