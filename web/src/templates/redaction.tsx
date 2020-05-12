import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Layout from '../layout'
import SEO from '../components/seo'
import { PageTemplate, RedactionSettings } from '../interfaces'
import Hero from '../components/Hero'
import BodyPortableText from '../components/BodyPortableText'
import Section from '../components/Section'
import TestimonialCard from '../components/TestimonialCard'
import ProjectCard from '../components/ProjectCard'
import ServiceCard from '../components/ServiceCard'

export interface RedactionTemplateProps extends PageTemplate {
  pageContext: RedactionSettings
}

const Lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

// TODO : Dynamiser section.title & section.description
// ? Tout mettre dans un texte editor ?
// TODO Ajouter les formations
function RedactionTemplate({ pageContext, path }: RedactionTemplateProps) {
  const {
    title,
    slogan,
    excerpt,
    customers,
    formations,
    projects,
    services,
    whyMe,
    body,
  } = pageContext
  console.log({ customers, formations, projects, services })

  return (
    <Layout>
      <SEO title={title} description={excerpt} path={path} />
      <Hero title={title} description={slogan}></Hero>

      {body && (
        <Section>
          <Container maxWidth="md">
            <BodyPortableText blocks={body} />
          </Container>
        </Section>
      )}

      {services && (
        <Section title="Mes prestations" description={Lorem}>
          <Grid container spacing={2}>
            {services.map(service => (
              <Grid key={service.id} item xs={12} sm={6} md={4}>
                <ServiceCard {...service} />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}

      {/* // TODO : Load more */}
      {projects && (
        <Section title="Mon portfolio" description={Lorem}>
          <Grid container spacing={2}>
            {projects.map(project => (
              <Grid key={project.id} item xs={12} sm={6} md={4}>
                <ProjectCard {...project} />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}

      {whyMe && (
        <Section title="Pourquoi moi ?">
          <Container maxWidth="md">
            <BodyPortableText blocks={whyMe} />
          </Container>
        </Section>
      )}

      {customers && (
        <Section title="L'avis de mes clients" description={Lorem}>
          <Grid container spacing={2}>
            {customers.map(({ id, title, testimonial }) => (
              <Grid key={id} item xs={12} sm={6} md={4}>
                <TestimonialCard title={title} testimonial={testimonial} />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}

      <Section title="Travaillons ensemble" description={Lorem}>
        <Container maxWidth="md">
          <Button
            component={GatsbyLink}
            to="/contact"
            variant="contained"
            size="large"
            color="secondary"
          >
            Me contacter
          </Button>
        </Container>
      </Section>
    </Layout>
  )
}

export default RedactionTemplate
