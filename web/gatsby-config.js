/* eslint-disable @typescript-eslint/camelcase */
const isProd = process.env.NODE_ENV === 'production'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const token = process.env.GATSBY_SANITY_TOKEN

module.exports = {
  siteMetadata: {
    title: `Oser Ecrire`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '5pa3cetx',
        dataset: 'production',
        token,
        graphqlTag: 'default',
        watchMode: !isProd,
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
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
          {
            family: `Vidaloka`,
          },
          {
            family: `Domine`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
