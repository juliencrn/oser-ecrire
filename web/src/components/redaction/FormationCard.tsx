import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Formation } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: 'auto',
  },
}))

const FormationCard: FC<Formation> = ({ title, link, description }) => {
  const classes = useStyles()
  return (
    <Card component={Paper}>
      <CardContent>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Typography>{description}</Typography>

        {link && (
          <CardActions>
            <Button
              className={classes.button}
              target="_blank"
              href={link}
              size="small"
            >
              Lire sur le site
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  )
}

export default FormationCard
