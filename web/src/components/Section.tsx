import React, { FC, memo } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container, { ContainerProps } from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
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

const SectionComponent: FC<SectionProps> = ({
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

const Section = memo(SectionComponent)

export default Section
