/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const queries = require('./src/gatsby/queries')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const results = await graphql(`
    {
      posts: allSanityPost(
        limit: 1000
        sort: { fields: _createdAt, order: DESC }
      ) {
        edges {
          node {
            ${queries.Post}
          }
        }
      }
      categories: allSanityCategory(limit: 1000) {
        edges {
          node {
            id
            title
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL posts query.`)
    return
  }

  const posts = results.data.posts.edges

  // Use only not empty categories
  const categories = results.data.categories.edges
    // 1. Get posts in category
    .map(({ node }) => ({
      node: {
        ...node,
        postsIn:
          posts.filter(post => {
            const matchesArr = post.node.categories.filter(
              category => category.id === node.id,
            )
            return matchesArr.length > 0
          }) || [],
      },
    }))
    // 2. Remove category if has not posts
    .filter(({ node }) => node.postsIn.length > 0)

  /**
   * Create posts
   */
  posts.forEach(({ node }, i) => {
    // Get prev/next post
    const next = posts[i + 1] ? posts[i + 1].node : posts[0].node
    const prev = posts[i - 1] ? posts[i - 1].node : posts[posts.length - 1].node

    createPage({
      path: node.slug.current,
      component: path.resolve(`./src/templates/post.tsx`),
      context: { current: node, next, prev },
    })
  })

  /**
   * Create posts list (with pagination)
   */
  const postsPerPage = 6
  const blogPath = `/atelier-ecriture`
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? blogPath : `${blogPath}/${i + 1}`,
      component: path.resolve(`./src/templates/postList.tsx`),
      context: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        categories: categories.map(({ node: { postsIn, ...rest } }) => ({
          node: rest,
        })),
        numPages,
        basePath: blogPath,
        currentPage: i + 1,
        posts: posts.slice(i * postsPerPage, i * postsPerPage + postsPerPage),
      },
    })
  })

  /**
   * Create categories archive of posts list (with pagination)
   */
  categories.forEach(({ node }) => {
    // Pagination
    const numArchivePages = Math.ceil(node.postsIn.length / postsPerPage)

    Array.from({ length: numArchivePages }).forEach((_, i) => {
      const basePath = `${blogPath}/${node.slug.current}`
      createPage({
        path: i === 0 ? basePath : `${basePath}/${i + 1}`,
        component: path.resolve(`./src/templates/postList.tsx`),
        context: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          categories: categories.map(({ node: { postsIn, ...rest } }) => ({
            node: rest,
          })),
          basePath,
          numPages: numArchivePages,
          currentPage: i + 1,
          posts: node.postsIn.slice(
            i * postsPerPage,
            i * postsPerPage + postsPerPage,
          ),
        },
      })
    })
  })
}
