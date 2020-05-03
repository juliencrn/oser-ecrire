import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Layout from '../layout'
import SEO from '../components/seo'
import { PageTemplate, Post } from '../interfaces'
import Hero from '../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  title: {},
}))

export interface PostTemplateProps extends PageTemplate {
  pageContext: {
    current: Post
    next: Post
    prev: Post
  }
}

const PostTemplate: FC<PostTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()

  console.log(pageContext)

  const { title, excerpt } = pageContext.current

  return (
    <Layout isBlog>
      <SEO title={title} description={excerpt} path={path} />

      <Hero title={pageContext.current.title} />
    </Layout>
  )
}

export default PostTemplate
