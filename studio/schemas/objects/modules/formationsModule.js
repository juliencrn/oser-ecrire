import { MdSchool } from 'react-icons/md'
import { getModuleSlugSrc } from '../../../src/schemaUtils'

export default {
  name: 'formationsModule',
  type: 'object',
  title: 'Mes formations',
  icon: MdSchool,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre de la section',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Utilisé pour les ancres',
      validation: Rule => Rule.error('Champ obligatoire').required(),
      options: {
        source: getModuleSlugSrc,
        maxLength: 96,
      },
    },
    {
      name: 'introduction',
      type: 'text',
      title: `Texte d'introduction`,
    },
    {
      name: 'formations',
      type: 'array',
      title: 'Mes formations',
      validation: Rule => Rule.error('Champ obligatoire').required(),
      description: `Sélectionner les formations suivies dans le cadre de la rédaction SEO. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'formation',
          },
        },
      ],
    },
  ],
}
