import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'

export interface Image {
  name: string
  childImageSharp: {
    xxs: FluidObject
    xs: FluidObject
    sm: FluidObject
    md: FluidObject
    lg: FluidObject
    xl: FluidObject
  }
}

type getImageFn = (id?: string) => Image | undefined
type imageFn = (images: Image[]) => getImageFn
type HookReturn = [getImageFn, Image[]]
const imageLoader: imageFn = images => id => {
  // 1. Check
  if (!images || !images.length || !id) {
    return undefined
  }

  // 2. Filter
  const image = images.filter(({ name }) => name === id)[0]

  // 3. Return data
  return image ? image : undefined
}

export default function useLocalImages(): HookReturn {
  const data = useStaticQuery(graphql`
    {
      allFile {
        nodes {
          name
          childImageSharp {
            xxs: fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid
            }
            xs: fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid
            }
            sm: fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
            md: fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
            lg: fluid(maxWidth: 1440) {
              ...GatsbyImageSharpFluid
            }
            xl: fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  const images = data.allFile.nodes || []
  const getImageByName = imageLoader(images)

  return [getImageByName, images]
}
