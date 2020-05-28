export default {
  type: 'object',
  name: 'footerColumn',
  title: 'colonne',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre de la colonne',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'menu',
      type: 'array',
      title: 'Liens',
      of: [{ type: 'internalLink' }],
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
  ],
}
