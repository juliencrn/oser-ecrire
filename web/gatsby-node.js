/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

// Deep node console.log util
// require('util').inspect.defaultOptions.depth = null

const { getRedactionSettings } = require('./src/gatsby/croqQueries')
const queries = require('./src/gatsby/queries')
const { addImagesInPosts, normalizeCategories } = require('./src/gatsby/utils')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const results = await graphql(`{
    posts: ${queries.posts}
    images: ${queries.images}
    blogSettings: ${queries.blogSettings}
  }`)

  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL posts query.`)
    return
  }

  // Foreach post, add body mainImages (used for gatsby-image)
  const posts = addImagesInPosts(
    results.data.posts.edges,
    results.data.images.edges,
  )

  // Remove empty categories
  // Add "postsIn" posts array in each category
  const categories = normalizeCategories(
    results.data.blogSettings.categories,
    results.data.posts.edges,
  )

  // Merge blogSettings with serialized categories instead existing
  const blogSettings = {
    ...results.data.blogSettings,
    categories,
  }

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
  const blogPath = `/${blogSettings.slug.current}`
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? blogPath : `${blogPath}/${i + 1}`,
      component: path.resolve(`./src/templates/postList.tsx`),
      context: {
        blogSettings,
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
  categories.forEach(({ slug, postsIn }) => {
    // Pagination
    const numArchivePages = Math.ceil(postsIn.length / postsPerPage)

    Array.from({ length: numArchivePages }).forEach((_, i) => {
      const basePath = `${blogPath}/${slug.current}`
      createPage({
        path: i === 0 ? basePath : `${basePath}/${i + 1}`,
        component: path.resolve(`./src/templates/postList.tsx`),
        context: {
          blogSettings,
          basePath,
          numPages: numArchivePages,
          currentPage: i + 1,
          posts: postsIn.slice(
            i * postsPerPage,
            i * postsPerPage + postsPerPage,
          ),
        },
      })
    })
  })

  /**
   * Create "Redaction SEO" template page
   */
  const redactionSettings = await getRedactionSettings()
  createPage({
    path: redactionSettings.slug.current,
    component: path.resolve(`./src/templates/redaction.tsx`),
    context: redactionSettings,
  })
}
