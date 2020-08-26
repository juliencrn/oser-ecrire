import React, { FC } from 'react'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate as IPageTemplate, Page, Modal } from '../interfaces'
import Hero from '../components/Hero'
import SwitchModules from '../components/SwitchModules'

export function PageTemplate(props: Page) {
  const { title, subtitle, pageBuilder, image } = props
  const isHome = props?.template === 'home'
  return (
    <>
      {isHome ? (
        <Hero fullScreen title={title} subtitle={subtitle} image={image} />
      ) : (
        <Hero title={title} subtitle={subtitle} />
      )}

      <SwitchModules modules={pageBuilder?.modules} />
    </>
  )
}

export interface TemplateProps extends IPageTemplate {
  pageContext: {
    page: Page
    modal: Modal
  }
}

const Template: FC<TemplateProps> = ({ pageContext, location }) => {
  const { page, modal } = pageContext
  const { title, excerpt, image } = page

  return (
    <Layout modal={modal}>
      <SEO
        title={title}
        description={excerpt}
        path={location.pathname}
        image={image}
      />

      <PageTemplate {...page} />
    </Layout>
  )
}

export default Template
