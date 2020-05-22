import { MdComment } from 'react-icons/md'

export default {
  name: 'quote',
  type: 'object',
  title: 'Citation',
  icon: MdComment,

  fields: [
    {
      name: 'author',
      type: 'string',
      title: 'Auteur',
    },
    {
      name: 'text',
      type: 'text',
      title: 'Citation',
      rows: 3,
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
  ],
  preview: {
    select: {
      author: 'author',
      quote: 'text',
    },
    prepare({ author, quote }) {
      return {
        title: `Citation${author ? ` de "${author}"` : ``}`,
        subtitle: `${quote.split('').slice(0, 80).join('')}}...`,
        media: undefined,
      }
    },
  },
}
