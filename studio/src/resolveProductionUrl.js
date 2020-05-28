/* eslint-disable no-underscore-dangle */
const { SANITY_STUDIO_SITE_URL, SANITY_ACTIVE_ENV } = process.env

const isDev = SANITY_ACTIVE_ENV !== 'production'
const siteUrl = SANITY_STUDIO_SITE_URL

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
  const base = isDev ? `http://localhost:8000` : siteUrl

  // Active url per post type
  switch (document._type) {
    case 'page':
    case 'post':
      return `${base}/${path}&type=${document._type}`

    default:
      return undefined
  }
}
