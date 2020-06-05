import { FaDirections } from 'react-icons/fa'
import { getModuleSlugSrc } from '../../../src/schemaUtils'

export default {
  name: 'ctaModule',
  type: 'object',
  title: 'Call-to-action',
  icon: FaDirections,
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
      name: 'link',
      type: 'internalLink',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
  ],
}
