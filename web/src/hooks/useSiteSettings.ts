import { graphql, useStaticQuery } from 'gatsby'

export interface SiteSettings {
  title: string
  slogan: string
  email: string
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
        email
        social {
          facebook
        }
      }
    }
  `)

  return data.sanitySiteSettings
}
