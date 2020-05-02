export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Réglages généraux',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
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
      title: 'Logo du site',
    },
    {
      name: 'social',
      type: 'siteLinks',
      title: 'Social',
    },
  ],
}
