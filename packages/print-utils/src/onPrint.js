export default function onPrint({ preprint, postprint } = {}) {
  if(typeof window !== 'object')
    return
  if(window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    if(preprint)
      window.addEventListener('beforeprint', preprint)
    if(postprint)
      window.addEventListener('afterprint', postprint)

    return function dispose () {
      if(preprint)
        window.removeEventListener('beforeprint', preprint)
      if(postprint)
        window.removeEventListener('afterprint', postprint)
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
