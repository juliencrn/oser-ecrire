import ConditionalInput from '../../../src/components/conditionalInput'

export default {
  name: 'blog',
  type: 'object',
  title: 'Réglage du blog',
  inputComponent: ConditionalInput,
  templates: ['blog'], // Matches template value
  fields: [
    {
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      description: `Les catégories utilisées pour filter dans le blog. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
    },
  ],
}
