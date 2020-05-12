import React, { FC, useState } from 'react'

import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Testimonial, Formation, Customer } from '../../interfaces'

export interface TestimonialCardProps {
  title: string
  testimonial?: Testimonial
}

const TestimonialCard: FC<Formation | Customer> = ({
  title,
  link,
  testimonial,
}) => {
  const TEXT_LENGTH = 150
  const [expended, setExpended] = useState(false)

  // Return if hasn't testimonial
  if (!(testimonial?.name && testimonial?.text)) {
    return null
  }

  // Crop text length
  const text = expended
    ? testimonial.text
    : testimonial.text.slice(0, TEXT_LENGTH)
  const cropped = text.length === TEXT_LENGTH

  const handleExpend = () => {
    setExpended(true)
  }

  return (
    <Card component={Paper}>
      <CardHeader
        avatar={
          <Avatar>
            {testimonial?.avatar ? (
              <img
                style={{ width: `100%` }}
                src={testimonial.avatar.asset?.url}
                alt={testimonial.name}
              />
            ) : (
              testimonial.name.slice(0, 1).toUpperCase()
            )}
          </Avatar>
        }
        title={testimonial.name}
        subheader={
          <Typography variant="body2" color="textSecondary">
            <Link
              href={link}
              target="_blank"
              style={{ cursor: 'pointer' }}
              color="inherit"
            >
              {title}
            </Link>
          </Typography>
        }
      />
      <CardContent>
        <Typography>
          {text}
          {!expended && cropped && (
            <>
              {`... `}
              <Link onClick={handleExpend} style={{ cursor: 'pointer' }}>
                Voir plus
              </Link>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
