import React from 'react'

import Layout from '../layout'
import SEO from '../layout/seo'
import Hero from '../components/Hero'
import { PageTemplate, Page, Modal } from '../interfaces'
import SwitchModules from '../components/SwitchModules'

export interface HomeTemplateProps extends PageTemplate {
  pageContext: {
    modal: Modal
    page: Page
  }
}

function IndexPage({ pageContext, path }: HomeTemplateProps) {
  const { page, modal } = pageContext
  const { title, subtitle, excerpt, pageBuilder, image } = page
  const heroProps = { title, subtitle, image }

  return (
    <Layout modal={modal}>
      <SEO title={title} path={path} description={excerpt} image={image} />
      <Hero fullScreen {...heroProps}></Hero>

      <SwitchModules modules={pageBuilder?.modules} />
    </Layout>
  )
}

export default IndexPage
