export default {
  name: 'blogSettings',
  type: 'document',
  title: 'Réglages du blog',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      description: `L'ordre compte.`,
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
  preview: {
    prepare() {
      return {
        title: 'Réglages du blog',
      }
    },
  },
}
