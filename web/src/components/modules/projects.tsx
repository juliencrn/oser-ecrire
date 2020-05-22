import React from 'react'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

import { Module } from '../../interfaces'
import Section from '../Section'
import ProjectCard from '../cards/ProjectCard'

function ProjectsModule({ title, introduction, projects, isVisible }: Module) {
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
        {projects.map((project, i) => (
          <Grow
            in={isVisible}
            key={i}
            timeout={(i + 1) * 1000}
            style={{ transformOrigin: '0 -40px 0' }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <ProjectCard {...project} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Section>
  )
}

export default ProjectsModule
