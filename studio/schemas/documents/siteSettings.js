export default {
    name: 'siteSettings',
    type: 'document',
    title: 'Réglages du site',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Titre'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'Courte description pour le SEO et les partages'
      }
    ]
  }