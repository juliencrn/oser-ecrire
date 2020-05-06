import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/Hero'
import { routes } from '../config'
import NewsletterForm from '../components/NewsletterForm'
import Blockquote from '../components/Blockquote'

const FakeSection: FC<{ title: string }> = ({ title, children }) => (
  <Container maxWidth="lg">
    <Box my={8}>
      <Typography variant="h3" align="center">
        {title}
      </Typography>
      <Box my={4}>{children}</Box>
    </Box>
  </Container>
)

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title="Créatrice de Contenus"
        description="Hello ! Je suis Nathalie et mon truc, c'est l'écriture.
        J'écris pour mo, avec vous et pour mes clients.
        Bienvenue dans l'univers d'Oser Ecrire."
      ></Hero>

      <FakeSection title="Oser Ecrire : Pour qui ? Pour quoi ?">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography>
                  Vous avez envie d'écrire mais vous n'osez pas ; manquez
                  d'idées ? Inspiration en panne ?
                </Typography>
                <Typography>Je vous aide à booster votre créativité</Typography>
                <Typography>L'Atelier d'Écriture Créative</Typography>
                <Button
                  component={GatsbyLink}
                  to={routes.blog}
                  variant="contained"
                  color="primary"
                >
                  Découvrir
                </Button>
                <Typography variant="subtitle1">
                  Osons écrire Ensemble
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography>
                  Vous êtes blogueur, entrepreneur et vous voulez plus de
                  visibilité, plus de trafic avec votre site / blog ?
                </Typography>
                <Typography>
                  Je rédige pour vous des contenus web qualitatifs, optimisés et
                  adaptés à vos besoins.
                </Typography>
                <Typography>La Rédaction web</Typography>
                <Button
                  component={GatsbyLink}
                  to={routes.redac}
                  variant="contained"
                  color="primary"
                >
                  Découvrir
                </Button>
                <Typography variant="subtitle1">
                  Travaillons Ensemble
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </FakeSection>

      <Container maxWidth="lg">
        <Box my={8}>
          <Blockquote author="Michèle Mailhot">
            L'écriture, toute écriture, reste une audace et un courage. Et
            représente un énorme travail.
          </Blockquote>
        </Box>
      </Container>

      <Box bgcolor="secondary.main" py={10} mb={0}>
        <Container maxWidth="md">
          <NewsletterForm />
        </Container>
      </Box>
    </Layout>
  )
}

export default IndexPage
