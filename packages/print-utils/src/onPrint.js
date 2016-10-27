export default function printEvents({ preprint, postprint } = {}) {
  if(typeof window !== 'object')
    return
  if(window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    if(preprint)
      window.onbeforeprint = preprint
    if(postprint)
      window.onafterprint = postprint
  } else {
    if(preprint || postprint)
      window.matchMedia('print').addListener((mql) => mql.matches ? (preprint && preprint()) : (postprint && postprint()))
  }
}
