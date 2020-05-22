import { graphql, useStaticQuery } from 'gatsby'
import { FormName } from '../interfaces'

export interface Form {
  type: FormName
  id: string
  title: string
  subtitle: string
}

export default function useSanityForms(): Form[] {
  const data = useStaticQuery(graphql`
    {
      newsletter: sanityNewsletterForm {
        type: _id
        id
        title
        subtitle
      }
      contact: sanityContactForm {
        type: _id
        id
        title
        subtitle
      }
    }
  `)

  return [data.newsletter, data.contact]
}
