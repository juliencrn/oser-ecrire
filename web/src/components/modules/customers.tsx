import React from 'react'
import uuid from 'uuid/v1'

import Grid from '@material-ui/core/Grid'

import { Module } from '../../interfaces'
import Section from '../Section'
import TestimonialCard from '../redaction/TestimonialCard'

function CustomersModule({ title, introduction, customers }: Module) {
  if (!customers) {
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
        {customers.map(customer => (
          <Grid key={uuid()} item xs={12} sm={6} md={4}>
            <TestimonialCard {...customer} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}

export default CustomersModule
