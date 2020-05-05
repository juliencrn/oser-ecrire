import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/Hero'
import { routes } from '../config'
import NewsletterForm from '../components/NewsletterForm'

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title="Oser Ecrire"
        description="L'Atelier d'Écriture qui Libère Votre Créativité"
      >
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              component={GatsbyLink}
              to={routes.blog}
              variant="contained"
              color="primary"
            >
              L'atelier d'écriture
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={GatsbyLink}
              to={routes.redac}
              variant="contained"
              color="secondary"
            >
              La rédaction SEO
            </Button>
          </Grid>
        </Grid>
      </Hero>

      <Box bgcolor="secondary.main" py={10} mb={0}>
        <Container maxWidth="md">
          <NewsletterForm />
        </Container>
      </Box>
    </Layout>
  )
}

export default IndexPage
