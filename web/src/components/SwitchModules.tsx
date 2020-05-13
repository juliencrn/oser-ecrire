import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import uuid from 'uuid/v1'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { Module } from '../interfaces'
import BodyPortableText from './BodyPortableText'
import Section from './Section'
import ServiceCard from './redaction/ServiceCard'
import TestimonialCard from './redaction/TestimonialCard'
import ProjectCard from './redaction/ProjectCard'
import FormationCard from './redaction/FormationCard'

// Tmp vars
let link = { to: '/', label: '' }

const SwitchModuleContent: FC<Module> = ({ _type, ...module }) => {
  switch (_type) {
    case 'simplePortableTextModule':
      return <BodyPortableText blocks={module.body} />

    case 'servicesModule':
      return module.services ? (
        <Grid container justify="center" spacing={2}>
          {module.services.map(service => (
            <Grid key={uuid()} item xs={12} sm={6} md={4}>
              <ServiceCard {...service} />
            </Grid>
          ))}
        </Grid>
      ) : null

    case 'customersModule':
      return module.customers ? (
        <Grid container justify="center" spacing={2}>
          {module.customers.map(customer => (
            <Grid key={uuid()} item xs={12} sm={6} md={4}>
              <TestimonialCard {...customer} />
            </Grid>
          ))}
        </Grid>
      ) : null

    case 'projectsModule':
      return module.projects ? (
        <Grid container justify="center" alignItems="stretch" spacing={2}>
          {module.projects.map(project => (
            <Grid key={uuid()} item xs={12} sm={6} md={4}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      ) : null

    case 'formationsModule':
      return module.formations && module.formations.length > 0 ? (
        <Grid container justify="center" spacing={2}>
          {module.formations.map((formation, i, arr) => (
            <Grid key={uuid()} item xs={12} sm={6} md={arr.length >= 3 ? 4 : 6}>
              <FormationCard {...formation} />
            </Grid>
          ))}
        </Grid>
      ) : null

    case 'ctaModule':
      if (!module.internalLink || !module.internalLink[0]) {
        return null
      }

      switch (module.internalLink[0]) {
        case 'contact':
          link = { to: '/contact', label: 'Me contacter' }
          break

        default:
          link = { to: '/', label: 'Accueil' }
          break
      }

      return module.internalLink ? (
        <Button
          component={GatsbyLink}
          to={link.to}
          variant="contained"
          size="large"
          color="secondary"
        >
          {link.label}
        </Button>
      ) : null

    default:
      return null
  }
}

export interface SwitchModulesProps {
  modules?: Module[]
}

const SwitchModules: FC<SwitchModulesProps> = ({ modules }) => {
  if (!modules || modules.length <= 0) {
    return null
  }

  return (
    <>
      {modules.map(module => (
        <Section
          key={uuid()}
          title={module.title}
          description={module?.introduction}
          childContainerProps={{
            maxWidth: ['ctaModule', 'simplePortableTextModule'].includes(
              module._type,
            )
              ? 'md'
              : 'lg',
          }}
        >
          <SwitchModuleContent {...module} />
        </Section>
      ))}
    </>
  )
}

export default SwitchModules
