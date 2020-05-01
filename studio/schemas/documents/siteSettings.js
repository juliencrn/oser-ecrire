export default {
    name: 'siteSettings',
    type: 'document',
    title: 'Réglages du site',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Titre',
        validation: Rule => Rule.error('Champ obligatoire').required(),
      },
      {
        name: 'slogan',
        type: 'text',
        title: 'Slogan',
        rows: 2,
      },
      {
        name: 'logo',
        type: 'mainImage',
        title: 'Logo du site'
      },
      {
        name: 'social',
        type: 'object',
        title: 'Social',
        fields: [
          {name: 'facebook', type: 'url', title: 'Facebook'}
        ]
      }
    ]
  }