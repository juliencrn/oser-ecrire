import React, { useEffect, useState } from 'react'

import { Page, PreviewTemplate } from '../interfaces'
import { PageTemplate } from '../templates/page'
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

/* 
##################################
This query is copied from previews/PagePreview.ts
##################################
*/
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
        avatar {
          _type,
          asset-> { 'id': _id }
        },
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
        avatar {
          _type,
          asset-> { 'id': _id }
        },
      },
    },
  `,
  servicesModule: `
    'services': services[]->,
  `,
  bodyModule: `
    body,
  `,
  featuresModule: `
    features[] {
      _key,
      title, 
      content,
      link {
        label,
        reference-> {
          _type,
          title, 
          slug { current }
        }
      }
    },
  `,
  quoteModule: `
    author,
    text,
  `,
  heroModule: `
    mainImage {
      _type,
      alt,
      caption,
      asset { 'id': _ref },
    },
    textSide,
    overlay,
    disableOverlap,
    width,
  `,
  formModule: `
    form {
      'type': _ref,
    },
  `,
  // Use "mainImage" & "link" too
  aboutMeModule: `
    qualities,
    subtitle,
  `,
}

const {
  ctaModule,
  projectsModule,
  formationsModule,
  customersModule,
  servicesModule,
  bodyModule,
  featuresModule,
  quoteModule,
  heroModule,
  formModule,
  aboutMeModule,
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
    ${featuresModule}
    ${ctaModule}
    ${quoteModule}
    ${heroModule}
    ${formModule}
    ${aboutMeModule}
  }
`

const page = `
  id,
  title,
  slug,
  subtitle,
  excerpt,
  template,
  image {
    _type,
    asset-> { 'id': _id }
  },

  pageBuilder { ${modules} },
  blog { categories[]-> { title, slug } }
`

const pageQuery = `
  *[_type == "page" && _id == $id] {
    ${page}
  }
`
/* 
##################################
and here
##################################
*/

async function fetchSanityPage(id: string): Promise<Page> {
  const params = { id }
  const results = await client.fetch(pageQuery, params)
  return results[0]
}

const PagePreview = ({ documentId: id }: PreviewTemplate) => {
  const [pageData, setPageData] = useState<Page | undefined>(undefined)

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
      .listen(pageQuery, params, options)
      .subscribe(() => {
        console.log('Receive update!')
        fetchSanityPage(id).then(data => {
          setPageData(data)
        })
      })

    return subscription.unsubscribe
  }, [])

  return pageData ? <PageTemplate {...pageData} /> : <Loader />
}

export default PagePreview
