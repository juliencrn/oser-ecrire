/**
 * Doc
 * - https://www.sanity.io/docs/dashboard
 * - https://www.sanity.io/docs/installing-and-configuring-widgets
 */

 // SIZE: auto | small | medium | large | full

export default {
    widgets: [
        // dashboard-widget-document-list
        {
            name: 'document-list',
            layout: {
                width: 'medium',
                height: 'small'
            },
            options: {
                title: 'Derniers articles modifiés',
                order: '_updatedAt desc',
                limit: 6,
                types: ['post']
            }
        },
        {
            name: 'document-list',
            layout: {
                width: 'medium',
                height: 'small'
            },
            options: {
                title: 'Autres documents récents',
                order: '_updatedAt desc',
                limit: 6,
                types: ['category', 'customer', 'service', 'formation', 'project', 'topic']
            }
        },
        {
            name: 'project-info',
            layout: {
                width: 'medium',
                height: 'small'
            }
        },
        

        // dashboard-widget-netlify
        {
            name: 'netlify',
            layout: {
                width: 'medium',
                height: 'small'
            },
            options: {
                title: 'Liens de déploiement',
                description: `
                    NOTE : Étant donné que ces sites sont statiques, 
                    ils ont besoin d\'être re-construit pour voir les changements quand les documents sont publiés
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
                        apiId: 'yyyyy-xxxxx-zzzz-xxxx-yyyyyyyy',
                        buildHookId: 'yyyyxxxxxyyyxxdxxx',
                        name: 'sanity-gatsby-blog-20-web'
                    }
                ]
            },
        },

        {
            name: 'project-users',
            layout: {
                width: 'small',
                height: 'small'
            }
        },

        
    ]
}