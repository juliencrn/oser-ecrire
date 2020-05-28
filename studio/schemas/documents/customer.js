import { MdPerson } from 'react-icons/md'

export default {
  name: 'customer',
  type: 'document',
  title: 'Clients',
  icon: MdPerson,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: "Nom de l'entreprise",
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: "Ceci est l'identifiant unique utilisé dans l'url",
      validation: Rule => Rule.error('Champ obligatoire').required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'link',
      type: 'url',
      title: "Lien vers l'entreprise",
    },
    {
      name: 'testimonial',
      type: 'testimonial',
      title: 'Avis',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Type : Clients',
      }
    },
  },
}
