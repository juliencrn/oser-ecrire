import React from 'react'
import * as queryString from 'query-string'
import { Helmet } from 'react-helmet'
import { Match } from '@reach/router'
import { navigate } from 'gatsby'

import Layout from '../layout'
import PostPreview from '../previews/PostPreview'

export default function PreviewPage() {
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Match path="/preview">
        {props => {
          const parsed = queryString.parse(props.location.search)
          const id = parsed?.id as string
          const type = parsed?.type as string

          if (!(id && props.match)) {
            navigate('/')
            return null
          }

          switch (type) {
            case 'post':
              return <PostPreview documentId={id} location={props.location} />

            default:
              navigate('/')
              return null
          }
        }}
      </Match>
    </Layout>
  )
}
