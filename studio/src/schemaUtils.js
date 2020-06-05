/* eslint-disable import/prefer-default-export */
export const getModuleSlugSrc = (doc, options) => {
  const self = doc.pageBuilder.modules.filter(
    // eslint-disable-next-line no-underscore-dangle
    ({ _key }) => _key === options.parentPath[2]._key,
  )[0]

  return self && self.title ? self.title : undefined
}
