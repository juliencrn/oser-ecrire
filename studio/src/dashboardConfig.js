/**
 * Doc
 * - https://www.sanity.io/docs/dashboard
 * - https://www.sanity.io/docs/installing-and-configuring-widgets
 */

// SIZE: auto | small | medium | large | full
const { SANITY_STUDIO_SITE_URL } = process.env

export default {
  widgets: [
    {
      name: 'project-info',
      layout: {
        width: 'medium',
        height: 'small',
      },
      options: {
        __experimental_before: [
          // dashboard-widget-netlify
          {
            name: 'netlify',
            options: {
              title: 'Liens de déploiement',
              description: `
                          NOTE : Étant donné que ces sites sont statiques, 
                          ils ont besoin d'être re-construit pour voir les changements quand les documents sont publiés
                      `,
              sites: [
                {
                  title: 'Studio',
                  apiId: '724cd5fe-a72f-41bd-9725-d88f06275015',
                  buildHookId: '5ee1316c3a13d7307523fea3',
                  name: 'admin-oser-ecrire',
                },
                {
                  title: 'Site',
                  apiId: 'c8044772-066b-42e1-a67a-f4c50760a009',
                  buildHookId: '5ee131bc8db0aa5f5941670c',
                  name: 'oser-ecrire-frontend',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub',
            value: 'https://github.com/Junscuzzy/oser-ecrire',
            category: 'Code',
          },
          {
            title: 'Site',
            value: SANITY_STUDIO_SITE_URL,
            category: 'apps',
          },
        ],
      },
    },

    // dashboard-widget-document-list
    {
      name: 'document-list',
      layout: {
        width: 'medium',
        height: 'medium',
      },
      options: {
        title: 'Derniers articles modifiés',
        order: '_updatedAt desc',
        limit: 12,
        types: ['post'],
      },
    },
    {
      name: 'document-list',
      layout: {
        width: 'small',
        height: 'medium',
      },
      options: {
        title: 'Autres documents récents',
        order: '_updatedAt desc',
        limit: 12,
        types: [
          'category',
          'customer',
          'service',
          'formation',
          'project',
          'topic',
          'comment',
        ],
      },
    },

    // {
    //   name: 'project-users',
    //   layout: {
    //     width: 'small',
    //     height: 'small',
    //   },
    // },
  ],
}
