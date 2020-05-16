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
      name: 'email',
      type: 'string',
      title: 'Email',
      description: `Ceci est l'email administrateur, celui sur lequel vous recevrez les notifications de gestion du site.`,
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
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'social',
      type: 'siteLinks',
      title: 'Social',
    },
    {
      name: 'mainMenu',
      type: 'array',
      title: 'Menu principal',
      of: [{ type: 'internalLink' }],
    },
    {
      name: 'footerMenus',
      type: 'array',
      title: 'Colonnes du pied de page.',
      validation: (Rule) =>
        Rule.required().min(3).max(3).error('Il doit y avoir 3 colonnes'),
      of: [
        {
          name: 'footerColumn',
          title: 'colonne',
          type: 'footerColumn',
        },
      ],
    },
  ],
}
