import { FaPencilAlt } from 'react-icons/fa'

export default {
  name: 'projectsModule',
  type: 'object',
  title: 'Mes projets',
  icon: FaPencilAlt,
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
      name: 'projects',
      type: 'array',
      title: 'Mes références',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      description: `Sélectionner les références clients à mettre en avant sur le portfolio. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'project',
          },
        },
      ],
    },
  ],
}
