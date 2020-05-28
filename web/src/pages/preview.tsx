import React, { useEffect } from 'react'
import * as queryString from 'query-string'
import { Helmet } from 'react-helmet'
import { navigate } from 'gatsby'

import Layout from '../layout'
import PostPreview from '../previews/PostPreview'
import { PageTemplate } from '../interfaces'

export default function PreviewPage(props: PageTemplate) {
  const parsed = queryString.parse(props.location.search)
  const id = parsed?.id as string
  const type = parsed?.type as string
  let component = null

  useEffect(() => {
    if (!id || !type) {
      navigate('/')
    }
  }, [])

  switch (type) {
    case 'post':
      component = <PostPreview documentId={id} location={props.location} />
      break
    default:
      return null
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
