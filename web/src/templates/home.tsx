import React from 'react'

import Layout from '../layout'
import SEO from '../layout/seo'
import Hero from '../components/Hero'
import { PageTemplate, Page } from '../interfaces'
import SwitchModules from '../components/SwitchModules'

export interface HomeTemplateProps extends PageTemplate {
  pageContext: {
    page: Page
  }
}

function IndexPage({ pageContext, path }: HomeTemplateProps) {
  const { title, subtitle, excerpt, pageBuilder, image } = pageContext.page
  const heroProps = { title, subtitle, image }

  return (
    <Layout>
      <SEO title={title} path={path} description={excerpt} image={image} />
      <Hero fullScreen {...heroProps}></Hero>

      <SwitchModules modules={pageBuilder?.modules} />
    </Layout>
  )
}

export default IndexPage
