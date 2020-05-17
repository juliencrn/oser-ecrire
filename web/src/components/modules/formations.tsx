import React from 'react'
import uuid from 'uuid/v1'

import Grid from '@material-ui/core/Grid'

import { Module } from '../../interfaces'
import Section from '../Section'
import FormationCard from './FormationCard'

function FormationsModule({ title, introduction, formations }: Module) {
  if (!formations) {
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
        {formations.map((formation, i, arr) => (
          <Grid key={uuid()} item xs={12} sm={6} md={arr.length >= 3 ? 4 : 6}>
            <FormationCard {...formation} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}

export default FormationsModule
