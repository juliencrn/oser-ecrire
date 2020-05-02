import { graphql, useStaticQuery } from 'gatsby'

export interface SiteSettings {
  title: string
  slogan: string
  social: {
    facebook: string
  }
}

export default (): SiteSettings => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        slogan
        title
        social {
          facebook
        }
      }
    }
  `)

  return data.sanitySiteSettings
}
