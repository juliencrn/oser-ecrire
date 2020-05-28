export default {
  name: 'quality',
  type: 'object',
  title: 'Qualité',
  description: 'Mettre des phrases très courtes pour un bon affichage',
  fields: [
    {
      name: 'answer',
      type: 'string',
      title: 'Question',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'response',
      type: 'string',
      title: 'Réponse',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
  ],
}
