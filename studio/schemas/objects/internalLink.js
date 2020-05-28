import { FaLink } from 'react-icons/fa'

export default {
  name: 'internalLink',
  type: 'object',
  title: 'Lien interne',
  icon: FaLink,
  blockEditor: {
    icon: FaLink,
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Lien',
      validation: Rule => Rule.error('Champ obligatoire').required(),
      to: [
        { type: 'post' },
        { type: 'page' },
        { type: 'category' },
        // other types you may want to link to
      ],
    },
    {
      name: 'label',
      type: 'string',
      title: 'Texte du bouton',
      description: `Si le lien n'a pas de label, alors il utilisera le nom de la page en question`,
    },
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({ label }) {
      return {
        title: `Lien vers "${label || '...'}"`,
      }
    },
  },
}
