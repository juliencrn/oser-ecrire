import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Project } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  content: {
    flex: 1,
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))

const ProjectCard: FC<Project> = ({ title, link, customer, service }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} component={Paper}>
      <CardContent className={classes.content}>
        {service && (
          <Typography variant="body2" color="textSecondary">
            {service.title}
          </Typography>
        )}
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        {customer && <Typography>{`Pour ${customer.title}`}</Typography>}
      </CardContent>

      {link && (
        <CardActions>
          <Button
            style={{ marginLeft: 'auto' }}
            target="_blank"
            href={link}
            size="small"
          >
            Lire sur le site
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default ProjectCard
