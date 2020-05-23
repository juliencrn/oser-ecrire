import React from 'react'

import { Module } from '../../interfaces'
import Section from '../Section'
import BodyPortableText from '../BodyPortableText'

function SimplePortableTextModule({ title, introduction, body }: Module) {
  return (
    <Section
      title={title}
      description={introduction}
      childContainerProps={{
        maxWidth: 'md',
      }}
    >
      <BodyPortableText blocks={body} />
    </Section>
  )
}

export default SimplePortableTextModule
