import React, { useEffect } from 'react'
import loadable from '@loadable/component'
import * as queryString from 'query-string'
import { Helmet } from 'react-helmet'
import { navigate } from 'gatsby'

import Layout from '../layout'
import { PageTemplate } from '../interfaces'

const PostPreview = loadable(() => import('../previews/PostPreview'))
const PagePreview = loadable(() => import('../previews/PagePreview'))

export default function PreviewPage(props: PageTemplate) {
  const parsed = queryString.parse(props.location.search)
  const id = parsed?.id as string
  const type = parsed?.type as string

  useEffect(() => {
    if (!id || !type) {
      navigate('/')
    }
  }, [])

  let component = null
  const componentProps = {
    documentId: id,
    location: props?.location,
  }

  switch (type) {
    case 'post':
      component = <PostPreview {...componentProps} />
      break
    case 'page':
      component = <PagePreview {...componentProps} />
      break
    default:
      component = null
  }

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {component}
    </Layout>
  )
}
