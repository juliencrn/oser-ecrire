import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../layout/seo'
import Hero from '../components/Hero'
import ContactForm from '../components/forms/ContactForm'
import { PageTemplate, Page } from '../interfaces'

export interface ContactTemplateProps extends PageTemplate {
  pageContext: { page: Page }
}

function ContactPage({ pageContext, path }: ContactTemplateProps) {
  const { title, subtitle, excerpt } = pageContext.page
  return (
    <Layout>
      <SEO title={title} path={path} description={excerpt} />
      <Hero title={title} subtitle={subtitle}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              component={GatsbyLink}
              to="/"
              variant="contained"
              color="primary"
            >
              Retour à l'accueil
            </Button>
          </Grid>
        </Grid>
      </Hero>

      <Box py={10} mb={0}>
        <Container maxWidth="md">
          <ContactForm />
        </Container>
      </Box>
    </Layout>
  )
}

export default ContactPage
