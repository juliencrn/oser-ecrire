import React, { FC, CSSProperties } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { FacebookIcon, LinkedinIcon } from 'react-share'
import Img from 'gatsby-image'

import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'

import useAuthorData from '../hooks/useAuthorData'
import useLocalImages from '../hooks/useLocalImages'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(0, 0.5),
  },
}))

export interface IconComponentProps {
  size?: number
  round?: boolean
  borderRadius?: number
  bgStyle?: CSSProperties
  iconFillColor?: CSSProperties['fill']
}

const SocialButtons: FC = () => {
  const { social } = useAuthorData()

  const classes = useStyles()
  const iconProps: IconComponentProps = {
    size: 33,
    round: true,
  }

  const [getImage] = useLocalImages()
  const malt = getImage('malt')
  const laredacduweb = getImage('laredacduweb')

  return (
    <Box display="flex">
      {social?.facebook && (
        <Tooltip title="Facebook" className={classes.button}>
          <Link href={social.facebook} target="_blank">
            <FacebookIcon {...iconProps} />
          </Link>
        </Tooltip>
      )}

      {social?.linkedin && (
        <Tooltip title="Linkedin" className={classes.button}>
          <Link href={social.linkedin} target="_blank">
            <LinkedinIcon {...iconProps} />
          </Link>
        </Tooltip>
      )}

      {social?.malt && malt?.childImageSharp.xxs && (
        <Tooltip title="Malt Freelance" className={classes.button}>
          <Link href={social.malt} target="_blank">
            <Img
              style={{ width: `33px` }}
              fluid={malt?.childImageSharp.xxs}
              alt="malt"
            />
          </Link>
        </Tooltip>
      )}

      {social?.laredacduweb && (
        <Tooltip title="La Rédac du Web" className={classes.button}>
          <Link href={social.laredacduweb} target="_blank">
            <Img
              style={{ width: `33px`, borderRadius: '50%' }}
              fluid={laredacduweb?.childImageSharp.xxs}
              alt="malt"
            />
          </Link>
        </Tooltip>
      )}
    </Box>
  )
}

export default SocialButtons
