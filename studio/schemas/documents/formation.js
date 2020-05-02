import { MdSchool } from 'react-icons/md'

export default {
  name: 'formation',
  type: 'document',
  icon: MdSchool,
  title: 'Formations suivies',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title de la formation',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        "Ceci est l'identifiant unique de l'article utilisé dans l'url",
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'link',
      type: 'url',
      title: 'Lien vers la formation',
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
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
        subtitle: 'Type : Formations',
      }
    },
  },
}
