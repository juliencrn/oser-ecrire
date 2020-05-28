/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { FaExternalLinkAlt, FaLink } from 'react-icons/fa'
import { MdTextFields } from 'react-icons/md'

const highlightIcon = () => <span style={{ fontWeight: 'bold' }}>H</span>
const highlightRender = props => (
  <span style={{ backgroundColor: 'rgba(0, 184, 212, 0.3)' }}>
    {props.children}
  </span>
)

// Same of bodyPortableText without image
export default {
  name: 'simplePortableText',
  type: 'array',
  title: "Contenu de l'article",
  icon: MdTextFields,
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Souligner', value: 'underline' },
          { title: 'Barrer', value: 'strike-through' },
          {
            title: 'Surligner',
            value: 'highlight',
            blockEditor: {
              icon: highlightIcon,
              render: highlightRender,
            },
          },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien externe',
            blockEditor: {
              icon: FaExternalLinkAlt,
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Lien interne',
            blockEditor: {
              icon: FaLink,
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'post' },
                  { type: 'page' },
                  // other types you may want to link to
                ],
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // {
    //   type: 'quote',
    // },
  ],
}
