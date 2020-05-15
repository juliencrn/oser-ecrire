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

const { getPages } = require('./src/gatsby/croqQueries')
const queries = require('./src/gatsby/queries')
const { addImagesInPosts, normalizeCategories } = require('./src/gatsby/utils')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  /**
   * Fetch data
   */

  // from GraphQL
  const results = await graphql(`{
    posts: ${queries.posts}
    images: ${queries.images}
  }`)

  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL posts query.`)
    return
  }

  // from Sanity.client()
  const pages = await getPages()

  /**
   * Normalize data
   */
  const posts = addImagesInPosts(
    results.data.posts.edges,
    results.data.images.edges,
  )

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
   * Create pages
   */
  // Util
  const isTemplate = value => ({ template }) => template === value

  // Blog
  const blogTemplate = pages.filter(isTemplate('blog'))[0]
  if (blogTemplate) {
    /**
     * Create posts list (with pagination)
     */
    const { blog, ...page } = blogTemplate
    const categories = normalizeCategories(blog.categories, posts)
    const postsPerPage = 6
    const blogPath = `/${page.slug.current}`
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? blogPath : `${blogPath}/${i + 1}`,
        component: path.resolve(`./src/templates/postList.tsx`),
        context: {
          categories,
          numPages,
          basePath: blogPath,
          currentPage: i + 1,
          posts: posts.slice(i * postsPerPage, i * postsPerPage + postsPerPage),
          page,
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
            categories,
            basePath,
            numPages: numArchivePages,
            currentPage: i + 1,
            posts: postsIn.slice(
              i * postsPerPage,
              i * postsPerPage + postsPerPage,
            ),
            page,
          },
        })
      })
    })
  }

  // Home
  const homeTemplate = pages.filter(isTemplate('home'))[0]
  if (homeTemplate) {
    createPage({
      path: '/',
      component: path.resolve(`./src/templates/home.tsx`),
      context: { page: homeTemplate },
    })
  }

  // Contact
  const contactTemplate = pages.filter(isTemplate('contact'))[0]
  if (contactTemplate) {
    createPage({
      path: contactTemplate.slug.current,
      component: path.resolve(`./src/templates/contact.tsx`),
      context: { page: contactTemplate },
    })
  }

  // Other Pages
  const otherPages = pages.filter(({ template }) => !template)
  otherPages.forEach(page => {
    createPage({
      path: page.slug.current,
      component: path.resolve(`./src/templates/page.tsx`),
      context: { page },
    })
  })
}
