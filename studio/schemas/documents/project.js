export default {
    name: 'project',
    type: 'document',
    title: 'Mes références client',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: Rule => Rule.error('Champ obligatoire').required(),
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Ceci est l\'identifiant unique de l\'article utilisé dans l\'url',
        validation: Rule => Rule.error('Champ obligatoire').required(),
        options: {
          source: 'title',
          maxLength: 96
        }
      },
      {
        name: 'customer',
        type: 'reference',
        title: 'Client',
        to: {
          type: 'customer'
        }
      },
      {
        name: 'service',
        type: 'reference',
        title: 'Prestation',
        to: {
          type: 'service'
        }
      },
      {
        name: 'link',
        type: 'url',
        title: 'Lien vers la référence'
      },
      {
        name: 'mainImage',
        type: 'mainImage',
        title: 'Image'
      },
      {
        name: 'excerpt',
        type: 'excerpt',
        title: 'Extrait'
      }
    ],
    preview: {
      select: {
        title: 'title',
        customer: 'customer.title',
      },
      prepare ({title, customer}) {
        return {
          title,
          subtitle: `Ecrit pour : ${customer || 'Client non spécifié'}`
        }
      }
    }
  }
  