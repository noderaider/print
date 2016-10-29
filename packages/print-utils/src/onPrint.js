export default function onPrint({ preprint, postprint } = {}) {
  if(typeof window !== 'object')
    return
  if(window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    if(preprint)
      window.onbeforeprint = preprint
    if(postprint)
      window.onafterprint = postprint
    return function dispose () {
      if(preprint)
        window.onbeforeprint = null
      if(postprint)
        window.onafterprint = null
    }
  } else if(preprint || postprint) {
    function mqlListener (mql) {
      if(mql.matches && preprint)
        preprint()
      else if(!mql.matches && postprint)
        postprint()
    }
    const mql = window.matchMedia('print')
    mql.addListener(mqlListener)
    return function disposeMedia () {
      mql.removeListener(mqlListener)
    }
  } else {
    return () => {}
  }
}
