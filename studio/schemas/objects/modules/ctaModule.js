import { FaDirections } from 'react-icons/fa'

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
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'introduction',
      type: 'text',
      title: `Texte d'introduction`,
    },
    {
      name: 'internalLink',
      type: 'selectPage',
      title: 'Lien vers page',
    },
  ],
}
