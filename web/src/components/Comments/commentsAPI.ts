import sanityClient from '@sanity/client'

import { sanity } from '../../config'
import { Comment } from '../../interfaces'

const client = sanityClient({
  projectId: sanity.projectId,
  dataset: sanity.dataset,
  token: process.env.GATSBY_SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

export const getCommentsByPostSlug = async (
  slug: string,
): Promise<Comment[]> => {
  const query = `*[_type == "comment" && post._ref == $slug]`
  const params = { slug }
  try {
    const comments = await client.fetch(query, params)
    return comments
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
  return client
    .create({ ...comment, _type: 'comment' })
    .then(res => res)
    .catch(error => {
      console.log(error)
      return false
    })
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
