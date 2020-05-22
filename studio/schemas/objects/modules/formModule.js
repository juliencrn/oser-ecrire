/* eslint-disable no-underscore-dangle */
import { GrDocumentPerformance } from 'react-icons/gr'

export default {
  name: 'formModule',
  type: 'object',
  title: 'Formulaire',
  icon: GrDocumentPerformance,
  fields: [
    {
      name: 'form',
      type: 'reference',
      title: 'Formulaire',
      to: [{ type: 'contactForm' }, { type: 'newsletterForm' }],
    },
  ],
  preview: {
    select: {
      form: 'form',
    },
    prepare({ form }) {
      let name = ''
      if (form) {
        switch (form._ref) {
          case 'newsletterForm':
            name = 'Newsletter'
            break
          case 'contactForm':
            name = 'Contact'
            break
          default:
            break
        }
      }
      return {
        title: `Formulaire ${name ? `: ${name}` : ''}`,
      }
    },
  },
}
