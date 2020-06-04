import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { Post, PreviewTemplate } from '../interfaces'
import { PostTemplate } from '../templates/post'
import Loader from '../components/Loader'
import { countWordInBlocks } from '../libs/countWords'

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

function WordCount({ count = 0 }: { count?: number }) {
  return (
    <Box
      position="fixed"
      left={2}
      top="50%"
      p={2}
      zIndex="10"
      style={{
        transform: 'translateY(-50%)',
      }}
    >
      <Typography variant="subtitle2">Nombre de mots</Typography>
      <Typography variant="h4">{count}</Typography>
    </Box>
  )
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

  let count = 0
  if (postData?.body) {
    count = countWordInBlocks(postData.body)
  }

  return postData ? (
    <>
      <WordCount count={count} />
      <PostTemplate {...postData} />
    </>
  ) : (
    <Loader />
  )
}

export default PostPreview
