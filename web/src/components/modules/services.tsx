import React from 'react'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

import { Module } from '../../interfaces'
import Section from '../Section'
import ServiceCard from '../cards/ServiceCard'

function ServicesModule({ title, introduction, services, isVisible }: Module) {
  if (!services) {
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
      <Grid container justify="center" spacing={2}>
        {services.map((service, i) => (
          <Grow
            in={isVisible}
            key={i}
            timeout={(i + 1) * 1000}
            style={{ transformOrigin: '0 -40px 0' }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard {...service} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Section>
  )
}

export default ServicesModule
