const getImagesFunc = images => id => {
  const results = images.filter(({ node }) => node.id === id)
  return results && results.length > 0 ? results[0] : null
}

const addImagesInPosts = (posts, images) => {
  const getImageById = getImagesFunc(images)
  return posts.map(({ node }) => ({
    node: {
      ...node,
      images: node.body
        ? node.body
            .filter(({ _type }) => _type === 'mainImage')
            .map(({ asset }) => getImageById(asset._ref))
        : [],
    },
  }))
}

// Remove empty categories
// Add "postsIn" posts array in each category
const normalizeCategories = (categories, posts) =>
  categories
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

module.exports = {
  addImagesInPosts,
  normalizeCategories,
}
