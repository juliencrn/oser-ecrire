export default {
  name: 'redactionSettings',
  type: 'document',
  title: 'Réglages rédaction SEO',
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
    },
    {
      name: 'body',
      type: 'textPortableText',
      title: 'Présentation principale',
    },
    {
      name: 'services',
      type: 'array',
      title: 'Mes services',
      description: `Sélectionner les services proposés. L'ordre compte.`,
      of: [
        {
          type: 'reference',
          to: {
            type: 'service',
          },
        },
      ],
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Mes références',
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
    {
      name: 'customers',
      type: 'array',
      title: 'Mes avis',
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
    {
      name: 'formations',
      type: 'array',
      title: 'Mes formations',
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
    {
      name: 'whyMe',
      type: 'textPortableText',
      title: 'Pourquoi moi ?',
    },
  ],
}
