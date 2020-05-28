import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fr from 'date-fns/locale/fr'
import { MdComment } from 'react-icons/md'

export default {
  name: 'comment',
  type: 'document',
  title: 'Commentaires',
  icon: MdComment,
  fields: [
    {
      name: 'post',
      type: 'reference',
      title: 'Article',
      to: {
        type: 'post',
      },
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'username',
      type: 'string',
      title: 'Nom',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
    {
      name: 'message',
      type: 'text',
      title: 'Message',
      row: 4,
      validation: Rule => Rule.error('Champ obligatoire').required(),
    },
  ],
  preview: {
    select: {
      username: 'username',
      createdAt: '_createdAt',
    },
    prepare({ username, createdAt }) {
      const options = { locale: fr }
      const date = formatDistanceToNow(new Date(createdAt), options)
      return {
        title: `Commentaire de ${username}`,
        subtitle: `Il y a ${date}`,
        media: null,
      }
    },
  },
}
