import React from 'react'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

import { Module } from '../../interfaces'
import Section from '../Section'
import TestimonialCard from '../cards/TestimonialCard'

function CustomersModule({
  title,
  introduction,
  customers,
  isVisible,
}: Module) {
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
        {customers.map((customer, i) => (
          <Grow
            in={isVisible}
            key={i}
            timeout={(i + 1) * 1000}
            style={{ transformOrigin: '0 -40px 0' }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <TestimonialCard {...customer} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Section>
  )
}

export default CustomersModule
