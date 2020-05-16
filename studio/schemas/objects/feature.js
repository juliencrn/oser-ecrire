export default {
  name: 'feature',
  type: 'object',
  title: 'Fonctionnalité',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'content',
      type: 'text',
      rows: 3,
      title: 'Contenu',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'link',
      type: 'internalLink',
      title: 'Lien',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
  ],
}
