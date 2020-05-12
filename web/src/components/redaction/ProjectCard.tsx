import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'

import { Project } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  chip: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
}))

const ProjectCard: FC<Project> = ({
  title,
  link,
  mainImage,
  customer,
  service,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} component={Paper}>
      <CardMedia
        style={{ height: 140 }}
        image={mainImage?.asset.sm.src || ''}
        title={mainImage?.alt || ''}
      />
      <CardContent>
        <Chip
          className={classes.chip}
          // clickable
          // onClick={() => handleCategoryClick(categories[0].slug.current)}
          label={service.title}
          icon={<FolderOpenIcon />}
          variant="outlined"
        />
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        {customer && <Typography>{`Pour ${customer.title}`}</Typography>}
      </CardContent>

      {link && (
        <CardActions>
          <Button target="_blank" href={link} size="small">
            Lire sur le site
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default ProjectCard
