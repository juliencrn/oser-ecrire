import { MdLocalOffer } from 'react-icons/md'

export default {
  name: 'category',
  type: 'document',
  title: 'Catégories du blog',
  icon: MdLocalOffer,
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
      description: "Ceci est l'identifiant unique utilisé dans l'url",
      validation: Rule => Rule.error('Champ obligatoire').required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      type: 'excerpt',
      title: 'Extrait',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Type : Catégories du blog',
      }
    },
  },
}
