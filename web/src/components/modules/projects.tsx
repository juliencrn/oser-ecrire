import React from 'react'
import uuid from 'uuid/v1'

import Grid from '@material-ui/core/Grid'

import { Module } from '../../interfaces'
import Section from '../Section'
import ProjectCard from '../cards/ProjectCard'

function ProjectsModule({ title, introduction, projects }: Module) {
  if (!projects) {
    return null
  }

  return (
    <Section
      title={title}
      description={introduction}
      childContainerProps={{
        maxWidth: 'lg',
      }}
    >
      <Grid container justify="center" alignItems="stretch" spacing={2}>
        {projects.map(project => (
          <Grid key={uuid()} item xs={12} sm={6} md={4}>
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}

export default ProjectsModule
