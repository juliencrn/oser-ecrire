import { FaRegLightbulb } from 'react-icons/fa'

export default {
  name: 'servicesModule',
  type: 'object',
  title: 'Mes prestations',
  icon: FaRegLightbulb,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre de la section',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'introduction',
      type: 'text',
      title: `Texte d'introduction`,
    },
    {
      name: 'services',
      type: 'array',
      title: 'Mes services',
      description: `Sélectionner les services proposés. L'ordre compte.`,
      validation: Rule => Rule.error('Champ obligatoire').required(),
      of: [
        {
          type: 'reference',
          to: {
            type: 'service',
          },
        },
      ],
    },
  ],
}
