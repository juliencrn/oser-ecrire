import { FaNewspaper } from 'react-icons/fa'
import { getModuleSlugSrc } from '../../../src/schemaUtils'

export default {
  name: 'lastsPostsModule',
  type: 'object',
  title: 'Derniers articles',
  icon: FaNewspaper,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
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
      title: `Texte`,
    },
  ],
}
