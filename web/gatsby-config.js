/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const proxy = require('http-proxy-middleware')

const queries = require('./src/gatsby/queries')
const utils = require('./src/gatsby/utils')

const isDev = process.env.NODE_ENV !== 'production'

require('dotenv').config({
  path: `.env.${isDev ? 'development' : 'production'}`,
})

const siteMetadata = {
  title: `Oser Ecrire`,
  description: `Écrire et Partager`,
  siteUrl: `https://oser-ecrire.fr`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECTID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        token: process.env.GATSBY_SANITY_TOKEN,
        graphqlTag: 'default',
        watchMode: isDev,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.GATSBY_ALGOLIA_SEARCH_KEY, // for all queries
        queries: utils.algoliaQueries,
        // enablePartialUpdates: true, // default: false
        chunkSize: 10000, // default: 1000
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
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ['/preview/**'],
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
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: DENY',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: no-referrer-when-downgrade',
            // 'cache-control: public,max-age=31536000,immutable'
          ],
          // '*.html': ['cache-control: public, max-age=0, must-revalidate'],
          // '*.json': ['cache-control: public, max-age=0, must-revalidate'],
          // '*.md': ['cache-control: public, max-age=0, must-revalidate']
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        // allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        // generateMatchPathRewrites: true // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],

  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
}
