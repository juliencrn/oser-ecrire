/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const queries = require('./src/gatsby/queries')
const utils = require('./src/gatsby/utils')

const isDev = process.env.NODE_ENV !== 'production'

require('dotenv').config({
  path: `.env.${isDev ? 'development' : 'production'}`,
})

const siteMetadata = {
  title: `Oser Ecrire`,
  description: `Écrire et Partager`,
  siteUrl: `https://oser-ecrire.fr|`,
  author: `Nathalie CARON`,
  image: `${__dirname}/src/images/Baniere-oser-ecrire.png`,
}

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '5pa3cetx',
        dataset: 'production',
        token: process.env.GATSBY_SANITY_TOKEN,
        graphqlTag: 'default',
        watchMode: isDev,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source+Sans+Pro:ital`,
            variants: [`200`, `300`, `400`, `600`, `700`],
          },
          { family: `Vidaloka` },
          { family: `Domine` },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `{posts: ${queries.posts}}`,
            output: '/rss.xml',
            title: `RSS Feed - ${siteMetadata.title}`,
            description: `${siteMetadata.siteUrl}`,
            serialize: ({ query }) =>
              utils.feedSerializer(query.posts.edges, siteMetadata),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID || '',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/Logo-oser-ecrire.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
