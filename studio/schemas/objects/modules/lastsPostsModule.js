export default {
  name: 'lastsPostsModule',
  type: 'object',
  title: 'Derniers articles',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'introduction',
      type: 'text',
      title: `Texte`,
    },
  ],
}
