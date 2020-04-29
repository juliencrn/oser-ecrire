import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fr from 'date-fns/locale/fr'

export default {
  name: 'post',
  type: 'document',
  title: 'Articles',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      description: 'Les titres doivent être accrocheurs, descriptifs et pas trop longs'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Ceci est l\'identifiant unique de l\'article utilisé dans l\'url',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Image Principale'
    },
    {
      name: 'excerpt',
      type: 'text',
      rows: 4,
      title: 'Extrait',
      description:
        'Se retrouvera sur les pages de résumé, sur Google, lorsque les gens partagent votre message sur les réseaux sociaux'
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Contenu Texte'
    }
  ],
  preview: {
    select: {
      title: 'title',
      createdAt: '_createdAt',
      updatedAt: '_updatedAt',
      media: 'mainImage'
    },
    prepare ({title = 'No title', createdAt, updatedAt, media}) {
      const options = { locale: fr }
      const createdDate = format(new Date(createdAt), `d MMMM yy`, options)
      const updatedDate = formatDistanceToNow(new Date(updatedAt), options)
      return {
        title,
        media,
        subtitle: `Publié le ${createdDate} | modifié il y a ${updatedDate}`
      }
    }
  }
}
