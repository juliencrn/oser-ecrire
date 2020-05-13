/* eslint-disable @typescript-eslint/no-var-requires */
const sanityClient = require('@sanity/client')

const isDev = process.env.NODE_ENV !== 'production'

require('dotenv').config({
  path: `.env.${isDev ? 'development' : 'production'}`,
})

const client = sanityClient({
  projectId: '5pa3cetx',
  dataset: 'production',
  token: process.env.GATSBY_SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

exports.handler = function (event, context, callback) {
  const { email, username, message, post } = JSON.parse(event.body)

  if (!(email && username && message && post && post._ref)) {
    return callback(null, {
      statusCode: 500,
      body: 'Field missing',
    })
  }

  const comment = {
    email,
    username,
    message,
    post,
    _type: 'comment',
  }

  client
    .create(comment)
    .then(() =>
      callback(null, {
        statusCode: 200,
        body: 'OK',
      }),
    )
    .catch(error => {
      console.log(error)
      return callback(null, {
        statusCode: 500,
        body: 'Err',
      })
    })
}
