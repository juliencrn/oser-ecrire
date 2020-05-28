/* eslint-disable @typescript-eslint/no-var-requires */
const queries = require('./queries')

// Extension: string => ImageType: string
const getMediaType = extention => {
  switch (extention) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'png':
      return 'image/png'
    default:
      return 'image/*'
  }
}

// gatsby-plugin-feed serializer
const feedSerializer = (posts, siteMetadata) => {
  return posts.map(({ node }) => {
    const { title, excerpt, slug, mainImage, _createdAt } = node
    const { author, siteUrl } = siteMetadata

    const formattedPost = {
      title,
      description: excerpt,
      author,
      date: new Date(_createdAt),
      url: `${siteUrl}/${slug.current}`,
      guid: `${siteUrl}/${slug.current}`,
    }

    if (mainImage && typeof mainImage.asset !== 'undefined') {
      const { extension, size, url } = mainImage.asset
      const image = {
        url,
        type: getMediaType(extension),
        size,
      }
      formattedPost.enclosure = image
    }

    return formattedPost
  })
}

const algoliaQueries = [
  {
    query: `{posts: ${queries.posts}}`,
    transformer: ({ data }) =>
      data.posts.edges.map(({ node: { title, excerpt, slug } }) => ({
        id: slug.current,
        path: slug.current,
        title,
        excerpt,
      })),
    indexName: `Posts`,
  },
]

// Remove empty categories
// Add "postsIn" posts array in each category
const mergePostsInCategories = (categories, posts) => {
  if (!categories || categories.length < 1) {
    return []
  }

  return (
    categories
      // 1. Get posts in category
      .map(node => ({
        ...node,
        postsIn:
          posts.filter(post => {
            const matchesArr = post.node.categories.filter(
              category => category.slug.current === node.slug.current,
            )
            return matchesArr.length > 0
          }) || [],
      }))
      // 2. Remove category if has not posts
      .filter(({ postsIn }) => postsIn.length > 0)
  )
}

module.exports = {
  mergePostsInCategories,
  feedSerializer,
  algoliaQueries,
}
