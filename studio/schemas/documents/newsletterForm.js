import { GrDocumentPerformance } from 'react-icons/gr'

export default {
  name: 'newsletterForm',
  type: 'document',
  title: 'Newsletter',
  icon: GrDocumentPerformance,
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
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
      title: 'Sous-titre',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
  ],
}
