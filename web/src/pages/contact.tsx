import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Button } from '@material-ui/core'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/Hero'

const ContactPage: FC = () => (
  <Layout>
    <SEO title="Contact" />
    <Hero title="Contact">
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

export default ContactPage
