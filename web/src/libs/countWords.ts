export function countWords(string: string): number {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff\u0400-\u04ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
  const m = string.match(pattern)
  let count = 0
  if (!m) {
    return 0
  }
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

export function countWordInBlocks(blocks: any[]): number {
  const count = blocks.reduce((prev, curr) => {
    if (curr._type === 'block' && curr.children.length > 0) {
      const children = curr.children.map(({ text }: any) => text).join(' ')
      return prev + countWords(children)
    }
    return prev
  }, 0)
  return count || 0
}
