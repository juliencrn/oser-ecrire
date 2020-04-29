export default {
    name: 'mainImage',
    type: 'image',
    title: 'Image',
    options: {
      hotspot: true
    },
    fields: [
      {
        name: 'caption',
        type: 'string',
        title: 'Légende',
        options: {
          isHighlighted: true
        }
      },
      {
        name: 'alt',
        type: 'string',
        title: 'Texte alternatif',
        description: 'Important pour le SEO et l\'accessiblité.',
        validation: Rule => Rule.error('Vous devez mettre un texte alternatif').required(),
        options: {
          isHighlighted: true
        }
      }
    ],
    preview: {
      select: {
        imageUrl: 'asset.url',
        title: 'caption'
      }
    }
  }
  