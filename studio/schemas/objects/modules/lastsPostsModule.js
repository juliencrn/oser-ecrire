import { FaNewspaper } from 'react-icons/fa'

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
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'introduction',
      type: 'text',
      title: `Texte`,
    },
  ],
}
