import { InternalLink, MenuItem } from './interfaces'

type LinkSerializer = (blogPrefix: string) => (props: InternalLink) => MenuItem

export const linkSerializer: LinkSerializer = blogPrefix => props => {
  const { label, reference } = props
  const {
    _type,
    title,
    slug: { current: slug },
  } = reference

  const to = _type === 'category' ? `/${blogPrefix}/${slug}` : `/${slug}`

  return {
    label: label || title,
    to,
  }
}
