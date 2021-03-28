import { MdVideoLibrary } from 'react-icons/md'

export default {
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: MdVideoLibrary,

  fields: [
    {
      name: 'url',
      type: 'string',
      title: 'Youtube URL',
    },
  ],
}
