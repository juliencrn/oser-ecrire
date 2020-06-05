import { AiFillStar } from 'react-icons/ai'

import { getModuleSlugSrc } from '../../../src/schemaUtils'

export default {
  name: 'heroModule',
  type: 'object',
  title: 'Hero',
  icon: AiFillStar,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Utilisé pour les ancres',
      validation: Rule => Rule.error('Champ obligatoire').required(),
      options: {
        source: getModuleSlugSrc,
        maxLength: 96,
      },
    },
    {
      name: 'introduction',
      type: 'text',
      title: `Texte`,
    },
    {
      name: 'link',
      type: 'internalLink',
      title: 'Ajouter un lien interne (optionnel)',
    },
    {
      name: 'textSide',
      type: 'string',
      title: 'Coté du texte',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Droit', value: 'right' },
        ],
      },
    },
    {
      name: 'disableOverlap',
      type: 'boolean',
      title: 'Désactiver le chevauchement',
    },
    {
      name: 'width',
      type: 'string',
      title: 'Largeur',
      description: "Agrandir la zone agrandira l'image.",
      options: {
        list: [
          { title: 'Moyenne', value: 'lg' },
          { title: 'Large', value: 'xl' },
        ],
      },
    },
    {
      name: 'overlay',
      type: 'string',
      title: 'Encadré clair',
      options: {
        list: [
          { title: `Pas d'encadré`, value: 'none' },
          { title: 'Sur le texte', value: 'text' },
          { title: 'Sur la zone image', value: 'image' },
        ],
      },
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Image',
      // description: `Recadrer l'image au format Portrait`,
      // validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
  ],
}
