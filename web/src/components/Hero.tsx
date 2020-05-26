import React, { FC } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import BackgroundImage from 'gatsby-background-image'

import Typography from '@material-ui/core/Typography'
import Container, { ContainerProps } from '@material-ui/core/Container'

import { InverseWave } from './svg'
import useSanityImages, { SanityImage } from '../hooks/useSanityImages'
import { sansS } from '../theme'
import { Image } from '../interfaces'

interface BaseProps {
  fullScreen?: boolean
  image?: Image
}

export interface HeroProps extends BaseProps {
  title: string
  subtitle?: string
  containerProps?: ContainerProps
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  background: {
    minHeight: (props: BaseProps) =>
      props?.fullScreen
        ? `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
        : theme.spacing(46),
    width: '100%',
    backgroundColor: theme.palette.common.white,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroButtons: {
    marginTop: theme.spacing(4),
  },
  title: {
    paddingTop: (props: BaseProps) =>
      props?.fullScreen ? 0 : theme.spacing(16),
    textShadow: (props: BaseProps) =>
      props?.fullScreen ? `0px 1px 14px rgba(0, 0, 0, 1)` : 'none',
    color: (props: BaseProps) =>
      props?.fullScreen
        ? theme.palette.common.white
        : theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: (props: BaseProps) =>
      props?.fullScreen
        ? theme.palette.background.default
        : theme.palette.text.secondary,
    textShadow: (props: BaseProps) =>
      props?.fullScreen ? `0px 1px 14px rgba(0, 0, 0, 1)` : 'none',
    fontFamily: sansS,
    fontWeight: 400,
  },
  wave: {
    bottom: theme.spacing(1),
    left: 0,
    zIndex: -1,
    transform: `translateY(100%)`,
    width: `100%`,
    position: 'absolute',
  },
}))

interface BackgroundProps {
  image?: SanityImage
  className?: string
}

const Background: FC<BackgroundProps> = ({ image, ...props }) => (
  <>
    {image?.xl ? (
      <BackgroundImage Tag="section" fluid={image?.xl} {...props} />
    ) : (
      <section {...props} />
    )}
  </>
)

const Hero: FC<HeroProps> = ({
  title,
  subtitle = '',
  containerProps,
  fullScreen = false,
  children,
  ...props
}) => {
  const { palette } = useTheme()
  const [getImageById] = useSanityImages()
  const image = getImageById(props?.image?.asset.id)
  const classes = useStyles({ fullScreen, image })

  return (
    <div className={classes.root}>
      <Background image={image} className={classes.background}>
        <Container maxWidth="md" {...containerProps}>
          <Typography
            component="h1"
            variant={fullScreen ? 'h1' : 'h2'}
            align="center"
            color="textPrimary"
            className={classes.title}
          >
            {title}
          </Typography>

          <Typography
            variant={fullScreen ? 'h3' : 'subtitle1'}
            align="center"
            color="textSecondary"
            className={classes.subtitle}
            component="h2"
          >
            {subtitle}
          </Typography>
          <div className={classes.heroButtons}>{children}</div>
        </Container>
      </Background>

      {!(props?.image && fullScreen) && (
        <div className={classes.wave}>
          <InverseWave color={palette.background.paper} />
        </div>
      )}
    </div>
  )
}

export default Hero
