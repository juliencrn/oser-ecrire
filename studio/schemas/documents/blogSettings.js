export default {
  name: 'blogSettings',
  type: 'document',
  title: 'Réglages du blog',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
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
      name: 'slogan',
      type: 'string',
      title: 'Slogan',
      description: 'Visible en sous titre sur la page des articles.',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'excerpt',
      type: 'excerpt',
      title: 'Extrait',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
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
}
