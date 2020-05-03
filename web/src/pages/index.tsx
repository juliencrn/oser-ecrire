import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Button } from '@material-ui/core'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/Hero'

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
              to="/atelier-ecriture"
              variant="contained"
              color="primary"
            >
              L'atelier d'écriture
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={GatsbyLink}
              to="/redaction-seo"
              variant="contained"
              color="secondary"
            >
              La rédaction SEO
            </Button>
          </Grid>
        </Grid>
      </Hero>
    </Layout>
  )
}

export default IndexPage
