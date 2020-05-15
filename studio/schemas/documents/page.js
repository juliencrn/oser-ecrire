import { FaNewspaper } from 'react-icons/fa'

const templateList = [
  { title: 'Accueil', value: 'home' },
  { title: 'Contact', value: 'contact' },
  { title: 'Blog', value: 'blog' },
]

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: FaNewspaper,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      description:
        'Les titres doivent être accrocheurs, descriptifs et pas trop longs',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        "Ceci est l'identifiant unique de la page utilisé dans l'url.",
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },

    {
      name: 'subtitle',
      type: 'string',
      title: 'Sous Titre',
      description: 'Visible en sous titre sur la page',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image Principale',
      description: `Cette image ne sera pas forcement affichée sur le site mais elle servira pour les partages sur les réseaux sociaux.`,
    },
    {
      name: 'excerpt',
      type: 'excerpt',
      title: 'Extrait',
    },
    {
      name: 'template',
      type: 'string',
      title: 'Modèle de page',
      description: 'Appliquer un modèle de page. Laisser vide si page normale.',
      options: {
        list: templateList,
      },
    },
    {
      name: 'blog',
      type: 'blog',
      title: 'Réglage du blog',
    },
    {
      name: 'pageBuilder',
      type: 'pageBuilder',
      title: 'Constructeur de page',
    },
  ],
  preview: {
    select: {
      template: 'template',
      title: 'title',
    },
    prepare({ title, template }) {
      let templateName = 'Normal'
      if (template) {
        const item = templateList.filter(({ value }) => value === template)[0]
        if (item) {
          templateName = item.title
        }
      }
      return {
        title,
        subtitle: `Modèle : ${templateName}`,
      }
    },
  },
}
