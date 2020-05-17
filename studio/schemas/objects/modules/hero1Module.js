// ? HERO 2 => variant as "template" field instead new file.js

export default {
  name: 'hero1Module',
  type: 'object',
  title: 'Hero 1 - Image Portrait',
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
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Image Portrait',
      description: `Recadrer l'image au format Portrait`,
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
  ],
}
