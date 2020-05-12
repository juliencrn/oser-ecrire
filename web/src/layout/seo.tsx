import React from 'react'
import { Helmet } from 'react-helmet'

import useSiteSettings from '../hooks/useSiteSettings'
import useAuthorData from '../hooks/useAuthorData'
import useSiteMetadata from '../hooks/useSiteMetadata'

interface MetaProperty {
  property: string
  content: string
}

interface MetaName {
  name: string
  content: string
}

type Meta = MetaName | MetaProperty

export interface SEOProps {
  path: string
  title: string
  description?: string
  lang?: string
  meta?: Meta[]
  imageUrl?: string
  isPost?: boolean
}

export default function SEO(props: SEOProps) {
  const { path, title, description, lang, meta, imageUrl, isPost } = props
  const siteSettings = useSiteSettings() // From CMS
  const authorData = useAuthorData() // From CMS
  const siteMetadata = useSiteMetadata() // From gatsby-config.js

  // Format data using different sources
  const siteName = siteSettings.title || siteMetadata.title
  const metaDescription =
    description || siteSettings.slogan || siteMetadata.description
  const url = `${siteMetadata.siteUrl}${path}`
  const image = imageUrl || siteMetadata.image
  const author = authorData.name || siteMetadata.author

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteName}`}
      link={[{ rel: 'canonical', key: url, href: url }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_name`,
          content: siteName,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: isPost ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  )
}

SEO.defaultProps = {
  description: '',
  lang: 'fr',
  meta: [],
  imageUrl: '',
  isPost: false,
}
