export default function onPrint({ preprint, postprint } = {}) {
  if(typeof window !== 'object')
    return
  if(window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    console.info('onPrint => STRATEGY 1')
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
    console.info('onPrint => STRATEGY 2')
    function mqlListener (mql) {
      if(mql.matches && preprint)
        preprint()
      else if(!mql.matches && postprint)
        postprint()
    }
    const mql = window.matchMedia('print')
    mql.addListener(mqlListener)
    return function disposeMedia () {
      console.info('DISPOSING STRATEGY 2')
      mql.removeListener(mqlListener)
    }
  } else {
    console.info('onPrint => STRATEGY 3')
    return () => {}
  }
}
