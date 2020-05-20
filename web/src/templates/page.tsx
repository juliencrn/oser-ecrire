import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate as IPageTemplate, Page } from '../interfaces'
import Hero from '../components/Hero'
import SwitchModules from '../components/SwitchModules'

const useStyles = makeStyles((theme: Theme) => ({}))

export interface PageTemplateProps extends IPageTemplate {
  pageContext: { page: Page }
}

const PageTemplate: FC<PageTemplateProps> = ({ pageContext, path }) => {
  const classes = useStyles()

  const { title, subtitle, excerpt, pageBuilder, image } = pageContext.page

  return (
    <Layout>
      <SEO title={title} description={excerpt} path={path} image={image} />

      <Hero title={title} subtitle={subtitle}></Hero>

      <SwitchModules modules={pageBuilder?.modules} />
    </Layout>
  )
}

export default PageTemplate
