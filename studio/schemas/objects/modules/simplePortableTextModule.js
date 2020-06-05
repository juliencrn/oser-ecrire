import { MdTextFields } from 'react-icons/md'
import { getModuleSlugSrc } from '../../../src/schemaUtils'

export default {
  name: 'simplePortableTextModule',
  type: 'object',
  title: 'Bloc de texte',
  icon: MdTextFields,
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
      name: 'body',
      type: 'simplePortableText',
      title: 'Texte',
    },
  ],
}
