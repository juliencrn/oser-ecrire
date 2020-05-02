export default {
  name: 'testimonial',
  type: 'object',
  title: 'Avis',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom du contact',
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'avatar',
      type: 'image',
      title: 'Photo',
      description: "L'image doit être carrée",
      options: {
        hotspot: true,
      },
    },
    {
      name: 'text',
      type: 'text',
      title: 'Message',
      rows: 3,
      validation: (Rule) => Rule.error('Champ obligatoire').required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      testimonial: 'text',
      media: 'photo',
    },
    prepare({ name, testimonial, media }) {
      return {
        title: `Avis de ${name}`,
        subtitle: `${testimonial.split('').slice(0, 80).join('')}}...`,
        media,
      }
    },
  },
}
