const gatsbyFluid = `
    srcWebp
    src
    srcSetWebp
    srcSet
    sizes
    base64
    aspectRatio
`

const gatsbyFixed = `
    srcWebp
    src
    srcSetWebp
    srcSet
    base64
    aspectRatio
    height
    width
`

const mainImage = `
  mainImage {
    alt
    caption
    asset {
      extension
      size
      url
      sm: fluid(maxWidth: 600) {
        ${gatsbyFluid}
      }
      md: fluid(maxWidth: 960) {
        ${gatsbyFluid}
      }
    }
  }
`

const post = `
    id
    _createdAt
    _updatedAt
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
    ${mainImage}
    body: _rawBody
`

const posts = `
  allSanityPost(
    limit: 1000
    sort: { fields: _createdAt, order: DESC }
  ) {
    edges {
      node {
        ${post}
      }
    }
  }
`

// const categories = `
//   allSanityCategory(limit: 1000) {
//     edges {
//       node {
//         id
//         title
//         slug {
//           current
//         }
//       }
//     }
//   }
// `

const blogSettings = `
  sanityBlogSettings {
    title
    slogan
    slug {
      current
    }
    excerpt
    categories {
      id
      slug {
        current
      }
      title
    }
  }
`

const images = `
  allSanityImageAsset(limit: 1000) {
    edges {
      node {
        id
        sm: fluid(maxWidth: 600) {
          ${gatsbyFluid}
        }
        md: fluid(maxWidth: 960) {
          ${gatsbyFluid}
        }
      }
    }
  }
`

module.exports = {
  gatsbyFluid,
  gatsbyFixed,
  mainImage,
  post,
  posts,
  // categories,
  blogSettings,
  images,
}
