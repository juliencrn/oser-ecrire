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

const moduleTypes = {
  ctaModule: `
    link {
      label,
      reference-> { title, slug, },
    },
  `,
  projectsModule: `
    'projects': projects[]-> {
      title,
      slug,
      link,
      'topic': topic->,
      'service': service->,
      'customer': customer->,
    },
  `,
  formationsModule: `
    'formations': formations[]-> {
      title, 
      link, 
      slug, 
      description, 
      testimonial {
        name, 
        text, 
        avatar{asset->{url}},
      },
    },
  `,
  customersModule: `
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
  `,
  servicesModule: `
    'services': services[]->,
  `,
  bodyModule: `
    body,
  `,
}

const {
  ctaModule,
  projectsModule,
  formationsModule,
  customersModule,
  servicesModule,
  bodyModule,
} = moduleTypes

const modules = `
  modules[] {
    _key,
    _type,
    title,
    introduction,

    ${projectsModule}
    ${servicesModule}
    ${customersModule}
    ${formationsModule}
    ${bodyModule}
    ${ctaModule}
  }
`

async function getPages() {
  const query = `
  *[_type == "page"] {
    id,
    title,
    slug,
    subtitle,
    excerpt,
    template,
    image {asset->{url}},
    ${modules}
  }`

  return await client.fetch(query)
}

module.exports = { getPages }
