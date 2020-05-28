import React from 'react'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Fade from '@material-ui/core/Fade'

import { Module } from '../../interfaces'
import Quote from '../Quote'

function QuoteModule({ author, text, isVisible }: Module) {
  if (!text) {
    return null
  }

  return (
    <Container maxWidth="lg">
      <Box py={8} my={8}>
        <Fade timeout={1000} in={isVisible}>
          <div>
            <Quote author={author}>
              {text.split('\n').map((line: string, i: number) => (
                <span style={{ display: 'block' }} key={i}>
                  {line}
                </span>
              ))}
            </Quote>
          </div>
        </Fade>
      </Box>
    </Container>
  )
}

export default QuoteModule
