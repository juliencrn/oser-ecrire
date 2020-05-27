import React, { useEffect, useState } from 'react'

import { Post, PreviewTemplate } from '../interfaces'
import { PostTemplate } from '../templates/post'
import Loader from '../components/Loader'

/* eslint-disable @typescript-eslint/no-var-requires */
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECTID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.GATSBY_SANITY_TOKEN,
  useCdn: false,
  withCredentials: true,
})

const postQuery = `
  *[_type == "post" && _id == $id] {
    title, 
    slug, 
    excerpt, 
    categories[]->, 
    mainImage { alt, caption, asset-> { 'id': _id }}, 
    body
  } 
`

async function fetchSanityPost(id: string): Promise<Post> {
  const params = { id }
  const results = await client.fetch(postQuery, params)
  return results[0]
}

const PostPreview = ({ documentId: id }: PreviewTemplate) => {
  const [postData, setPostData] = useState<Post | undefined>(undefined)

  // Fetch CMS data in Real-time
  useEffect(() => {
    const params = { id }
    const options = {
      includeResult: false,
      includePreviousRevision: false,
      visibility: 'query',
      events: ['welcome', 'mutation', 'reconnect'],
    }
    const subscription = client
      .listen(postQuery, params, options)
      .subscribe(() => {
        console.log('Receive update!')
        fetchSanityPost(id).then(data => {
          setPostData(data)
        })
      })

    return subscription.unsubscribe
  }, [])

  return postData ? <PostTemplate {...postData} /> : <Loader />
}

export default PostPreview
