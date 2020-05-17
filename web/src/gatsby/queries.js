const mainImage = `
  mainImage {
    alt
    caption
    _type
    asset {
      id
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

module.exports = { posts }
