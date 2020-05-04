import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container, { ContainerProps } from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(16, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

export interface HeroProps {
  title: string
  description?: string
  containerProps?: ContainerProps
}

const Hero: FC<HeroProps> = ({
  title,
  description = '',
  containerProps,
  children,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md" {...containerProps}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          paragraph
          component="h3"
        >
          {description}
        </Typography>
        <div className={classes.heroButtons}>{children}</div>
      </Container>
    </div>
  )
}

export default Hero
