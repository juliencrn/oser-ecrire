/**
 * Fetch Sanity CMS using CROQ queries
 *
 * @link https://www.sanity.io/docs/query-cheat-sheet
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECTID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.GATSBY_SANITY_TOKEN,
  useCdn: true, // `false` if you want to ensure fresh data
})

async function getRedactionSettings() {
  const query = `
    *[_type == "redactionSettings"][0] {
      _type,
      id,
      title,
      slug,
      slogan,
      excerpt,
      modules[] {
        _key,
        _type,
        title,
        introduction,
        body,
        'services': services[]->,
        'projects': projects[]-> {
          title,
          slug,
          link,
          'topic': topic->,
          'service': service->,
          'customer': customer->,
        },
        'customers': customers[]-> {
          title,
          slug,
          link,
          testimonial {
            name,
            text,
            avatar{asset->{url}},
          },
        },
        'formations': formations[]-> {
          title, 
          link, 
          slug, 
          description, 
          testimonial {
            name, 
            text, 
            avatar{asset->{url}},
          }
        },
        internalLink,
      }
    }`
  return await client.fetch(query)
}

module.exports = {
  getRedactionSettings,
}
