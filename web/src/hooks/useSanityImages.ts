import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'

export interface SanityImage {
  id: string
  xxs: FluidObject
  xs: FluidObject
  sm: FluidObject
  md: FluidObject
  lg: FluidObject
  xl: FluidObject
}

/**
 * Utility function to find an image
 * Return getImageById() => SanityImage?
 */
type getImageFn = (id?: string) => SanityImage | undefined
type imageFn = (images: SanityImage[]) => getImageFn
type HookReturn = [getImageFn, SanityImage[]]

const imageLoader: imageFn = images => id => {
  if (!images || !images.length || !id) {
    return undefined
  }
  return images.filter(item => item.id === id)[0] || undefined
}

export default function useSanityImages(): HookReturn {
  const data = useStaticQuery(graphql`
    {
      allSanityImageAsset(limit: 1000) {
        nodes {
          id
          xxs: fluid(maxWidth: 100) {
            ...GatsbySanityImageFluid
          }
          xs: fluid(maxWidth: 250) {
            ...GatsbySanityImageFluid
          }
          sm: fluid(maxWidth: 600) {
            ...GatsbySanityImageFluid
          }
          md: fluid(maxWidth: 960) {
            ...GatsbySanityImageFluid
          }
          lg: fluid(maxWidth: 1440) {
            ...GatsbySanityImageFluid
          }
          xl: fluid(maxWidth: 1920) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  `)

  const images = data.allSanityImageAsset.nodes || []
  const getImageById = imageLoader(images)

  return [getImageById, images]
}
