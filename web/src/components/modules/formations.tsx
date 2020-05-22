import React from 'react'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

import { Module } from '../../interfaces'
import Section from '../Section'
import FormationCard from '../cards/FormationCard'

function FormationsModule({
  title,
  introduction,
  formations,
  isVisible,
}: Module) {
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
          <Grow
            in={isVisible}
            key={i}
            timeout={(i + 1) * 1000}
            style={{ transformOrigin: '0 -40px 0' }}
          >
            <Grid item xs={12} sm={6} md={arr.length >= 3 ? 4 : 6}>
              <FormationCard {...formation} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Section>
  )
}

export default FormationsModule
