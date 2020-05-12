import { MdTextFields } from 'react-icons/md'

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
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'body',
      type: 'simplePortableText',
      title: 'Texte',
    },
  ],
}
