import { MdPerson } from 'react-icons/md'

export default {
  name: 'customersModule',
  type: 'object',
  title: 'Avis par client',
  icon: MdPerson,
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
      name: 'customers',
      type: 'array',
      title: 'Mes avis',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      description: `Sélectionner les clients qui vous ont donné un avis. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'customer',
          },
        },
      ],
    },
  ],
}
