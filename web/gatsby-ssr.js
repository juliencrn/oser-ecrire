/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Helmet } = require('react-helmet')

const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}) => {
  const helmet = Helmet.renderStatic()
  setHtmlAttributes(helmet.htmlAttributes.toComponent())
  setBodyAttributes(helmet.bodyAttributes.toComponent())
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ])
}

const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()

  headComponents.sort((x, y) => {
    if (x.props && x.props['data-react-helmet']) {
      return -1
    } else if (y.props && y.props['data-react-helmet']) {
      return 1
    }
    return 0
  })

  replaceHeadComponents(headComponents)
}

export { onPreRenderHTML, onRenderBody }

export { default as wrapRootElement } from './src/libs/wrapRootElement'
