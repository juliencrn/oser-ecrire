import S from '@sanity/desk-tool/structure-builder'
import {MdPerson, MdSettings, MdWork, MdLocalOffer} from 'react-icons/md'
import {FaPencilAlt, FaHeart, FaRegLightbulb, FaNewspaper} from 'react-icons/fa'

export default () =>
  S.list()
    .title('Content')
    .items([
        // Singleton
        S.listItem()
            .title('Réglages généraux')
            .icon(MdSettings)
            .child(
            S.editor()
                .schemaType('siteSettings')
                .documentId('siteSettings')
        ),
        // Singleton
        S.listItem()
            .title('À propos de l\'auteur')
            .icon(MdPerson)
            .child(
            S.editor()
                .schemaType('author')
                .documentId('author')
        ),
        S.listItem()
        .title('L\'atelier d\'écriture')
        .icon(FaPencilAlt)
        .child(
            S.list()
            .title('L\'atelier d\'écriture')
            .items([
                S.listItem()
                    .title('Articles')
                    .icon(FaNewspaper)
                    .schemaType('post')
                    .child(S.documentTypeList('post').title('Articles')),
                S.listItem()
                    .title('Categories')
                    .icon(MdLocalOffer)
                    .schemaType('category')
                    .child(S.documentTypeList('category').title('Categories'))
            ])
        ),
        S.listItem()
            .title('Rédaction SEO')
            .icon(MdWork)
            .child(
                S.list()
                .title('Rédaction SEO')
                .items([
                    S.listItem()
                        .title('Références client')
                        .schemaType('project')
                        .icon(FaPencilAlt)
                        .child(S.documentTypeList('project').title('Références client')),
                    S.listItem()
                        .title('Thèmes de prédictions')
                        .schemaType('topic')
                        .icon(FaHeart)
                        .child(S.documentTypeList('topic').title('Thèmes de prédictions')),
                    S.listItem()
                        .title('Clients')
                        .icon(MdPerson)
                        .schemaType('customer')
                        .child(S.documentTypeList('customer').title('Clients')),
                    S.listItem()
                        .title('Prestations proposées')
                        .icon(FaRegLightbulb)
                        .schemaType('service')
                        .child(S.documentTypeList('service').title('Prestations'))
                ])
            ),
    //   ...S.documentTypeListItems().filter(listItem => !['siteSettings', 'author'].includes(listItem.getId()))
    ])
