import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../layout/seo'
import { PageTemplate, RedactionSettings } from '../interfaces'
import Hero from '../components/Hero'
import SwitchModules from '../components/SwitchModules'

export interface RedactionTemplateProps extends PageTemplate {
  pageContext: RedactionSettings
}

function RedactionTemplate({ pageContext, path }: RedactionTemplateProps) {
  const { title, slogan, excerpt, modules } = pageContext
  return (
    <Layout>
      <SEO title={title} description={excerpt} path={path} />
      <Hero title={title} description={slogan}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            component={GatsbyLink}
            to="/contact"
            size="large"
          >
            Contactez moi
          </Button>
        </Box>
      </Hero>
      <SwitchModules modules={modules} />
    </Layout>
  )
}

export default RedactionTemplate
