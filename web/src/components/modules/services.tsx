import React from 'react'
import uuid from 'uuid/v1'

import Grid from '@material-ui/core/Grid'

import { Module } from '../../interfaces'
import Section from '../Section'
import ServiceCard from '../cards/ServiceCard'

function ServicesModule({ title, introduction, services }: Module) {
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
        {services.map(service => (
          <Grid key={uuid()} item xs={12} sm={6} md={4}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}

export default ServicesModule
