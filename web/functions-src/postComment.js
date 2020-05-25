/* eslint-disable @typescript-eslint/no-var-requires */
const sanityClient = require('@sanity/client')

const isDev = process.env.NODE_ENV !== 'production'

require('dotenv').config({
  path: `.env.${isDev ? 'development' : 'production'}`,
})

const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECTID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.GATSBY_SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

exports.handler = async event => {
  const { postSlug } = event.queryStringParameters
  const { email, username, message } = JSON.parse(event.body)

  if (!postSlug) {
    return {
      statusCode: 500,
      body: 'Missing post slug',
    }
  }

  if (!(email && username && message)) {
    return {
      statusCode: 500,
      body: 'Field missing',
    }
  }

  const comment = {
    email,
    username,
    message,
    post: {
      _ref: postSlug,
    },
    _type: 'comment',
  }

  try {
    const res = await client.create(comment)
    return {
      statusCode: 200,
      body: JSON.stringify({ res }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Cannot post comment' }),
    }
  }
}
