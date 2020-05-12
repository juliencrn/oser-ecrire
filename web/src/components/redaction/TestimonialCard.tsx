import React, { FC } from 'react'
import Image from 'gatsby-image'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Testimonial } from '../../interfaces'

export interface TestimonialCardProps {
  title: string
  testimonial?: Testimonial
}

const TestimonialCard: FC<TestimonialCardProps> = ({ title, testimonial }) => {
  if (!(testimonial?.name && testimonial?.name)) {
    return null
  }
  return (
    <Card component={Paper}>
      <CardHeader
        avatar={
          <Avatar>
            {testimonial?.avatar ? (
              <Image
                style={{ width: `100%` }}
                fluid={testimonial.avatar.asset.avatar}
                alt={testimonial.name}
              />
            ) : (
              testimonial.name.slice(0, 1).toUpperCase()
            )}
          </Avatar>
        }
        title={testimonial.name}
        subheader={title}
      />
      <CardContent>
        <Typography>{testimonial.text}</Typography>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
