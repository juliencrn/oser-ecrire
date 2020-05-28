import { FaWindowRestore } from 'react-icons/fa'

export default {
  name: 'modal',
  type: 'document',
  title: 'Newsletter',
  icon: FaWindowRestore,
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'active',
      type: 'boolean',
      title: 'Activer le popup',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'delay',
      type: 'number',
      title: 'Délais en secondes',
      description: "Délais avant que le popup ne s'ouvre.",
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'modules',
      type: 'modules',
      title: 'Contenu',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
  ],
}
