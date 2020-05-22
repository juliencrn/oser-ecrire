export default {
  name: 'author',
  type: 'document',
  title: 'Auteur',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: "Ceci est l'identifiant unique utilisé dans l'url",
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
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
      name: 'social',
      type: 'authorLinks',
      title: 'Social',
    },
  ],
}
