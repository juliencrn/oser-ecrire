import { MdSchool } from 'react-icons/md'

export default {
  name: 'formationsModule',
  type: 'object',
  title: 'Mes formations',
  icon: MdSchool,
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
      name: 'formations',
      type: 'array',
      title: 'Mes formations',
      validation: Rule => Rule.error('Champ obligatoire').required(),
      description: `Sélectionner les formations suivies dans le cadre de la rédaction SEO. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'formation',
          },
        },
      ],
    },
  ],
}
