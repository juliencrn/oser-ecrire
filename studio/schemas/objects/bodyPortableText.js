export default {
    name: 'bodyPortableText',
    type: 'array',
    title: 'Contenu de l\'article',
    of: [
      {
        type: 'block',
        title: 'Block',
        // Styles let you set what your user can mark up blocks with. These
        // corrensponds with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Citation', value: 'blockquote'}
        ],
        lists: [
          {title: 'Liste à puces', value: 'bullet'},
          {title: 'Liste numérotée', value: 'number'}],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
            {title: 'Gras', value: 'strong'},
            {title: 'Italique', value: 'em'}
          ],
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'URL',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url'
                }
              ]
            }
          ]
        }
      },
      // You can add additional types here. Note that you can't use
      // primitive types such as 'string' and 'number' in the same array
      // as a block type.
      {
        type: 'mainImage',
        options: {hotspot: true}
      }
    ]
  }
  