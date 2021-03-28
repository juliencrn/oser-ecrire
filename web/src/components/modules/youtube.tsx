import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: '0',
  },
  embed: {
    left: '0',
    top: '0',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
}))

interface YoutubeProps {
  url?: string
}

const YoutubeEmbed = ({ url }: YoutubeProps) => {
  const classes = useStyles()
  let embedId: string | null = null
  if (!url) return null

  try {
    const searchParams = new URLSearchParams(url?.split('?')[1])
    embedId = searchParams.has('v') ? searchParams.get('v') : null
  } catch (error) {
    console.error('Wrong URL passed to YoutubeEmbed', error)
    return null
  }

  if (!embedId) return null

  return (
    <div className={classes.root}>
      <iframe
        className={classes.embed}
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}

export default YoutubeEmbed
