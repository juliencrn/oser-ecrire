import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Button } from '@material-ui/core'

import Layout from '../layout'
import SEO from '../layout/seo'
import Hero from '../components/Hero'
import { PageTemplate } from '../interfaces'

const AboutPage: FC<PageTemplate> = ({ path }) => (
  <Layout>
    <SEO title="À propos" path={path} />
    <Hero title="À propos">
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
  </Layout>
)

export default AboutPage
