import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Container, { ContainerProps } from '@material-ui/core/Container'
import Zoom from '@material-ui/core/Zoom'
import Box from '@material-ui/core/Box'

import { Module } from '../../interfaces'
import ContactForm from '../forms/ContactForm'
import NewsletterForm from '../forms/NewsletterForm'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}))

function FormModule({ form, isVisible }: Module) {
  const classes = useStyles()
  const props: ContainerProps = {
    className: classes.root,
    maxWidth: 'lg',
    children: null,
  }
  switch (form?.type) {
    case 'contactForm':
      props.children = <ContactForm />
      break
    case 'newsletterForm':
      props.maxWidth = 'md'
      props.children = <NewsletterForm />
      break

    default:
      break
  }

  return (
    <Box py={8} bgcolor="secondary.light">
      <Zoom timeout={800} in={isVisible}>
        <Container {...props} />
      </Zoom>
    </Box>
  )
}

export default FormModule
