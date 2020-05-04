import React, { FC, CSSProperties } from 'react'
import Box from '@material-ui/core/Box'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'

export interface IconComponentProps {
  size?: number
  round?: boolean
  borderRadius?: number
  bgStyle?: CSSProperties
  iconFillColor?: CSSProperties['fill']
}

const SharingButtons: FC = () => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const iconProps: IconComponentProps = {
    size: 33,
  }
  return (
    <Box display="flex">
      <FacebookShareButton url={url}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon {...iconProps} />
      </LinkedinShareButton>
      <EmailShareButton url={url}>
        <EmailIcon {...iconProps} />
      </EmailShareButton>
    </Box>
  )
}

export default SharingButtons
