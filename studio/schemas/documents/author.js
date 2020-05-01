export default {
    name: 'author',
    type: 'document',
    title: 'Auteur',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Nom',
        validation: Rule => Rule.error('Champ obligatoire').required(),
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Ceci est l\'identifiant unique utilisé dans l\'url',
        validation: Rule => Rule.error('Champ obligatoire').required(),
        options: {
          source: 'name',
          maxLength: 96
        }
      },
      {
        name: 'mainImage',
        type: 'mainImage',
        title: 'Photo',
      },
      {
        name: 'excerpt',
        type: 'excerpt',
        title: 'Courte présentation',
      },
      {
        name: 'body',
        type: 'bodyPortableText',
        title: 'Présentation complète'
      },
      {
        name: 'social',
        type: 'object',
        title: 'Social',
        fields: [
          {name: 'facebook', type: 'url', title: 'Facebook'},
          {name: 'linkedin', type: 'url', title: 'Linkedin'},
          {name: 'malt', type: 'url', title: 'Malt'},
          {name: 'laredacduweb', type: 'url', title: 'La Redac du Web'},
        ]
      }
    ],
    preview: {
      select: {
        title: 'name',
        media: 'mainImage'
      }
    }
  }
  