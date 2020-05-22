import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grow from '@material-ui/core/Grow'

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

import { Module, Feature as IFeature } from '../../interfaces'
import { LightSectionTopWave } from '../svg'
import { linkSerializer } from '../../utils'
import useSiteSettings from '../../hooks/useSiteSettings'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
  },
  section: {
    marginTop: theme.spacing(-2),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(16),
    backgroundColor: theme.palette.primary.light,
  },
  title: {
    marginBottom: theme.spacing(4),
  },

  featureCard: {
    minHeight: `100%`,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  featureCardContent: {
    flex: 1,
  },
  featureTitle: {
    marginBottom: theme.spacing(2),
  },
  featureLink: {
    fontWeight: 600,
    display: 'flex',
  },
  featureIcon: {
    marginLeft: theme.spacing(1),
  },
}))

function Feature({ title, content, link }: IFeature) {
  const classes = useStyles()
  const { blog } = useSiteSettings()
  const serialize = linkSerializer(blog.path)
  const { label, to } = serialize(link)
  return (
    <Card className={classes.featureCard}>
      <CardContent className={classes.featureCardContent}>
        <Typography variant="h5" className={classes.featureTitle}>
          {title}
        </Typography>

        {content.split('\n').map((line, i) => (
          <Typography gutterBottom key={i}>
            {line}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Typography>
          <Button
            component={GatsbyLink}
            to={to}
            color="primary"
            className={classes.featureLink}
          >
            {label}
            <ArrowRightAltIcon className={classes.featureIcon} />
          </Button>
        </Typography>
      </CardActions>
    </Card>
  )
}

function FeaturesModule({ title, features, isVisible }: Module) {
  if (!features) {
    return null
  }

  const classes = useStyles()
  const { palette } = useTheme()

  return (
    <div>
      <LightSectionTopWave color={palette.primary.light} />

      <Box className={classes.section}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h3" className={classes.title}>
            {title}
          </Typography>

          <Grid container spacing={4}>
            {features.map((item, index, array) => (
              <Grow
                key={index}
                in={!!isVisible}
                style={{ transformOrigin: '0 -40px 0' }}
                {...(isVisible ? { timeout: (index + 1) * 1000 } : {})}
              >
                <Grid item xs={12} sm={6} md={array.length > 2 ? 4 : 6}>
                  <Feature {...item} />
                </Grid>
              </Grow>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default FeaturesModule
