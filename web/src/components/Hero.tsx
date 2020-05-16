import React, { FC } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container, { ContainerProps } from '@material-ui/core/Container'

import { InverseWave } from './svg'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(16, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  wave: {
    bottom: 0,
    left: 0,
    zIndex: -1,
    transform: `translateY(100%)`,
    width: `100%`,
    position: 'absolute',
  },
}))

export interface HeroProps {
  title: string
  subtitle?: string
  containerProps?: ContainerProps
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle = '',
  containerProps,
  children,
}) => {
  const classes = useStyles()
  const { palette } = useTheme()
  return (
    <div className={classes.root}>
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
            {subtitle}
          </Typography>
          <div className={classes.heroButtons}>{children}</div>
        </Container>
      </div>
      <div className={classes.wave}>
        <InverseWave color={palette.background.paper} />
      </div>
    </div>
  )
}

export default Hero
