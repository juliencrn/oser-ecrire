import { InternalLink, MenuItem } from './interfaces'

type LinkSerializer = (blogPrefix: string) => (props: InternalLink) => MenuItem

export const linkSerializer: LinkSerializer = blogPrefix => props => {
  const { label, anchor, reference } = props
  const {
    _type,
    title,
    slug: { current: slug },
  } = reference

  let to = _type === 'category' ? `${blogPrefix}/${slug}` : `/${slug}`
  to = `${to}${!anchor ? `` : `#${anchor}`}`

  return {
    label: label || title,
    to,
  }
}
