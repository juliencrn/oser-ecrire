export default {
  name: 'aboutMeModule',
  type: 'object',
  title: 'À propos de moi',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Sous titre',
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Image',
      description:
        'À recadrer dans un format carré / portrait pour un meilleur rendu',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'qualities',
      type: 'array',
      title: 'Qualités',
      description:
        "Ordre: De haut en bas, d'abord la colonne de gauche, puis l'autre",
      of: [{ type: 'quality' }],
      validation: (Rule) =>
        Rule.required().min(5).max(5).error('Il doit y avoir 3 colonnes'),
    },
    {
      name: 'link',
      type: 'internalLink',
      title: 'Ajouter un lien interne (optionnel)',
    },
  ],
}
