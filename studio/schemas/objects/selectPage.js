export default {
  name: 'selectPage',
  type: 'array',
  title: 'Lien vers page',
  of: [{ type: 'string' }],
  description: `Merci de ne choisir qu'un lien.`,
  validation: (Rule) => Rule.error('Champ obligatoire').required(),
  options: {
    list: [{ title: 'Contact', value: 'contact' }],
  },
}
