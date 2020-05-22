import { MdFeaturedPlayList } from 'react-icons/md'

export default {
  name: 'featuresModule',
  type: 'object',
  title: 'Fonctionnalités',
  icon: MdFeaturedPlayList,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre de la section',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'features',
      type: 'array',
      title: 'Fonctionnalités',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(3)
          .error('Il doit y avoir entre 2 et 3 colonnes'),
      of: [{ type: 'feature' }],
    },
  ],
}
