export default {
    name: 'topic',
    type: 'document',
    title: 'Thèmes de prédilection',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: Rule => Rule.error('Champ obligatoire').required(),
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Ceci est l\'identifiant unique utilisé dans l\'url',
        validation: Rule => Rule.error('Champ obligatoire').required(),
        options: {
          source: 'title',
          maxLength: 96
        }
      },
      {
        name: 'excerpt',
        type: 'excerpt',
        title: 'Extrait',
      }
    ]
  }
  