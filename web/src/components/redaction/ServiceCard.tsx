import React, { FC } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Service } from '../../interfaces'

const ServiceCard: FC<Service> = ({ title, description }) => {
  return (
    <Card component={Paper}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default ServiceCard
