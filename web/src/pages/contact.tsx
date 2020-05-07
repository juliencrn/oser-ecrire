import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import { PageTemplate } from '../interfaces'

const ContactPage: FC<PageTemplate> = ({ path }) => (
  <Layout>
    <SEO
      title="Contact"
      path={path}
      description="Vous avez un projet ? Dites-moi tout !"
    />
    <Hero title="Contact" description="Vous avez un projet ? Dites-moi tout !">
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

    <Box bgcolor="secondary.main" py={10} mb={0}>
      <Container maxWidth="md">
        <ContactForm />
      </Container>
    </Box>
  </Layout>
)

export default ContactPage
