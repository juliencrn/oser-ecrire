import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Service } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))

const ServiceCard: FC<Service> = ({ title, description }) => {
  const classes = useStyles()
  return (
    <Card component={Paper}>
      <CardContent>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default ServiceCard
