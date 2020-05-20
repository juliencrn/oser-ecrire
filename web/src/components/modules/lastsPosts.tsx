import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { Module } from '../../interfaces'
import Section from '../Section'
import PostCard from '../blog/PostCard'
import useLastsPosts from '../../hooks/useLastsPosts'
import useSiteSettings from '../../hooks/useSiteSettings'

function LastsPostsModule({ title, introduction = ' ' }: Module) {
  const posts = useLastsPosts()
  const { blog } = useSiteSettings()

  return (
    <Section
      title={title}
      description={introduction}
      childContainerProps={{
        maxWidth: 'lg',
      }}
    >
      <Grid container spacing={4}>
        {posts.map(({ node }, i) => (
          <Grow
            in
            key={i}
            timeout={(i + 1) * 1000}
            style={{ transformOrigin: '0 -40px 0' }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <PostCard {...node} />
            </Grid>
          </Grow>
        ))}
      </Grid>

      <Container maxWidth="md">
        <Box my={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={GatsbyLink}
            to={`/${blog.path}`}
          >
            Voir le blog
          </Button>
        </Box>
      </Container>
    </Section>
  )
}

export default LastsPostsModule
