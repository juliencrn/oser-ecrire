import React, { FC } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { slugify } from 'voca'
import copy from 'copy-to-clipboard'

export interface AnchorItemProps {
  anchor?: string
}

export function AnchorItem({ anchor = '' }: AnchorItemProps) {
  if (typeof window === 'undefined') return null

  const isPreview = window.location.href.includes('preview')

  if (!isPreview || !anchor) {
    return null
  }

  const handleCopy = () => {
    copy(anchor)
  }

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" color="textSecondary">
        {`Ancre: #${anchor}`}
      </Typography>
      <Box p={1} />
      <Button onClick={handleCopy} size="small" variant="outlined">
        Copier
      </Button>
    </span>
  )
}

/**
 * Make anchor section using Voca
 * ! voca.slugify != sanity.link.anchor !
 */
const Anchor: FC<{ title?: string }> = ({ title, children }) => {
  if (!title) return null

  const anchor = slugify(title)
  if (!anchor || anchor.trim() === '') return null

  return (
    <span id={anchor}>
      {children}
      <AnchorItem anchor={anchor} />
    </span>
  )
}

export default Anchor
