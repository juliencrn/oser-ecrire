import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container, { ContainerProps } from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}))

export interface SectionProps {
  title?: string
  description?: string
  childContainerProps?: ContainerProps
}

const Section: FC<SectionProps> = ({
  title,
  description,
  childContainerProps = {},
  children,
}) => {
  const classes = useStyles()

  const containerProps: ContainerProps = {
    // Default width
    maxWidth: 'lg',
    ...childContainerProps,
  }

  return (
    <Box className={classes.section}>
      <Container maxWidth="md">
        {title && (
          <Typography variant="h3" className={classes.title}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="subtitle2">{description}</Typography>
        )}
      </Container>
      <Container {...containerProps}>
        <Box my={4}>{children}</Box>
      </Container>
    </Box>
  )
}

export default Section
