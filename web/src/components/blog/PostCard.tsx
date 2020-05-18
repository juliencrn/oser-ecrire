import React, { FC } from 'react'
import { navigate } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'

import { Post } from '../../interfaces'
import useSanityImages from '../../hooks/useSanityImages'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardAction: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingBottom: '56.25%',
    height: 0,
    width: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cardContent: {
    flex: 1,
    height: '100%',
  },
}))

const PostCard: FC<Post> = ({ title, excerpt, mainImage, slug }) => {
  const classes = useStyles()
  const [getImageById] = useSanityImages()
  const image = getImageById(mainImage?.asset.id)

  const handleNavigate = () => {
    navigate(slug.current)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction} onClick={handleNavigate}>
        {mainImage && image && (
          <BackgroundImage
            className={classes.cardMedia}
            fluid={image.sm}
            alt={mainImage?.alt}
            backgroundColor={grey[200]}
          />
        )}
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1">{excerpt}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PostCard
