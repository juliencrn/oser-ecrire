const GatsbyFluid = `
    srcWebp
    src
    srcSetWebp
    srcSet
    sizes
    base64
    aspectRatio
`

const GatsbyFixed = `
    srcWebp
    src
    srcSetWebp
    srcSet
    base64
    aspectRatio
    height
    width
`

const MainImage = `
  mainImage {
    alt
    caption
    asset {
      sm: fluid(maxWidth: 600) {
        ${GatsbyFluid}
      }
    }
  }
`

const Post = `
    id
    title
    slug {
      current
    }
    excerpt
    categories {
      id
      title
      slug {
        current
      }
    }
    ${MainImage}
`

module.exports = {
  Post,
}
