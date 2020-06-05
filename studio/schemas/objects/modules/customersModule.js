import { MdPerson } from 'react-icons/md'
import { getModuleSlugSrc } from '../../../src/schemaUtils'

export default {
  name: 'customersModule',
  type: 'object',
  title: 'Avis par client',
  icon: MdPerson,
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
      name: 'customers',
      type: 'array',
      title: 'Mes avis',
      validation: Rule => Rule.error('Champ obligatoire').required(),
      description: `Sélectionner les clients qui vous ont donné un avis. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'customer',
          },
        },
      ],
    },
  ],
}
