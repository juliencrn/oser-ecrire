/* eslint-disable no-underscore-dangle */

export default function resolveProductionUrl(document) {
  let id = document._id

  // if it's a draft, the id is prefixed with "drafts."
  // Remove it to get the normal id
  const isDraft = id.includes('drafts')
  if (isDraft) {
    // eslint-disable-next-line prefer-destructuring
    id = id.split('drafts.')[1]
  }

  const path = `preview?id=${id}`
  // const base = `https://oser-ecrire.netlify.app`
  const base = `http://localhost:8000`

  // Active url per post type
  switch (document._type) {
    case 'page':
    case 'post':
      return `${base}/${path}&type=${document._type}`

    default:
      return undefined
  }
}
