export default function printEvents({ preprint, postprint } = {}) {
  if(typeof window !== 'object')
    return
  if(window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    if(preprint)
      window.onbeforeprint = preprint
    if(postprint)
      window.onafterprint = postprint
    return function dispose () {
      window.onbeforeprint = null
      window.onafterprint = null
    }
  } else {
    if(preprint || postprint) {
      const listener = (mql) => mql.matches ? (preprint && preprint()) : (postprint && postprint())
      window.matchMedia('print').addListener(listener)
      return function disposeMedia () {
        window.matchMedia('print').removeListener(listener)
      }
    }
    return () => {}
  }
}
