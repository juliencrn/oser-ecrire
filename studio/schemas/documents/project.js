import { FaPencilAlt } from 'react-icons/fa'

export default {
  name: 'project',
  type: 'document',
  icon: FaPencilAlt,
  title: 'Mes références client',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        "Ceci est l'identifiant unique de l'article utilisé dans l'url",
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'customer',
      type: 'reference',
      title: 'Client',
      to: {
        type: 'customer',
      },
    },
    {
      name: 'topic',
      type: 'reference',
      title: 'Thème de prédilection',
      to: {
        type: 'topic',
      },
    },
    {
      name: 'service',
      type: 'reference',
      title: 'Prestation',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      to: {
        type: 'service',
      },
    },
    {
      name: 'link',
      type: 'url',
      title: 'Lien vers la référence',
    },
  ],
  preview: {
    select: {
      title: 'title',
      customer: 'customer.title',
    },
    prepare({ title, customer }) {
      return {
        title,
        subtitle: `Ecrit pour : ${customer || 'Client non spécifié'}`,
      }
    },
  },
}
