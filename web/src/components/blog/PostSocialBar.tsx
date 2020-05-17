import React, { FC } from 'react'
import { navigate } from 'gatsby'

import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'

import { Category } from '../../interfaces'
import SharingButtons from '../SharingButtons'
import useSiteSettings from '../../hooks/useSiteSettings'

const PostSocialBar: FC<{ categories?: Category[] }> = ({ categories }) => {
  const { blog } = useSiteSettings()

  const handleCategoryClick = (slug: string) => {
    navigate(`/${blog.path}/${slug}`)
  }
  return (
    <Box my={0} display="flex" justifyContent="space-between" flexWrap="wrap">
      <Box my={1}>
        {categories && (
          <Chip
            clickable
            onClick={() => handleCategoryClick(categories[0].slug.current)}
            label={categories[0].title}
            icon={<FolderOpenIcon />}
            variant="outlined"
          />
        )}
      </Box>
      <Box my={1}>
        <SharingButtons />
      </Box>
    </Box>
  )
}

export default PostSocialBar
