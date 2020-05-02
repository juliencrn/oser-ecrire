/**
 * Doc
 * - https://www.sanity.io/docs/dashboard
 * - https://www.sanity.io/docs/installing-and-configuring-widgets
 */

// SIZE: auto | small | medium | large | full

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
                  apiId: '12ecf4cf-ddba-43bc-80c0-0d17ce95ab5e',
                  buildHookId: '5eaca6696d3a2d23bfe121c0',
                  name: 'oser-ecrire-dashboard',
                },
                {
                  title: 'Site',
                  apiId: 'c1937fa3-d070-4469-9e1a-94425df86bca',
                  buildHookId: '5eacd62ae83a6538a488bdc5',
                  name: 'oser-ecrire',
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
            value: 'https://oser-ecrire.netlify.app',
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
