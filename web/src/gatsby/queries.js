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

// const customer = `
//   id
//   link
//   slug {
//     current
//   }
//   title
//   testimonial {
//     name
//     text
//     avatar {
//       asset {
//         avatar: fluid(maxWidth: 250) {
//           ${gatsbyFluid}
//         }
//       }
//     }
//   }
// `

// const customers = `
//   customers {
//     ${customer}
//   }
// `

// const service = `
//     id
//     title
//     slug {
//       current
//     }
//     description
// `

// const services = `
//   services {
//     ${service}
//   }
// `

// const formations = `
//   formations {
//     _rawDescription
//     id
//     title
//     link
//     slug {
//       current
//     }
//     testimonial {
//       name
//       text
//       avatar {
//         asset {
//           avatar: fluid(maxWidth: 250) {
//             ${gatsbyFluid}
//           }
//         }
//       }
//     }
//   }
// `

// const projects = `
//   projects {
//     id
//     link
//     title
//     slug {
//       current
//     }
//     service {
//       ${service}
//     }
//     customer {
//       ${customer}
//     }
//     ${mainImage}
//   }
// `

module.exports = {
  gatsbyFluid,
  gatsbyFixed,
  mainImage,
  post,
  posts,
  blogSettings,
  images,
}
