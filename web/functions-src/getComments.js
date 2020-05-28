/* eslint-disable @typescript-eslint/no-var-requires */
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fr from 'date-fns/locale/fr'

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

  if (!postSlug) {
    return {
      statusCode: 500,
      body: 'postSlug missing',
    }
  }

  const query = `*[_type == "comment" && post._ref == $slug] | order(_createdAt asc)`
  const params = { slug: postSlug }

  try {
    const comments = await client.fetch(query, params)

    // Format the date
    const options = { locale: fr }
    const formatted = comments.map(comment => ({
      ...comment,
      _createdAt: formatDistanceToNow(new Date(comment._createdAt), options),
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(formatted),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Cannot getting comments' }),
    }
  }
}
