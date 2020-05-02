import React, { FC } from 'react'

import Pagination from '@material-ui/lab/Pagination'

import Layout from '../layout'
import SEO from '../components/seo'
import Hero from '../components/Hero'
import PostList from '../components/PostList'
import CategoryFilter from '../components/CategoryFilter'
import { Box } from '@material-ui/core'

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title="L'atelier d'écriture"
        description="L'Atelier d'Écriture qui Libère Votre Créativité"
      >
        <CategoryFilter />
      </Hero>
      <PostList />

      <Box mt={4} mb={4} display="flex" justifyContent="center">
        <Pagination
          count={5}
          page={2}
          showFirstButton
          showLastButton
          // onChange={handleNavigate}
        />
      </Box>
    </Layout>
  )
}

export default IndexPage
