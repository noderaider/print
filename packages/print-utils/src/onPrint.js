export default function printEvents({ preprint = () => {}, postprint = () => {} } = {}) {
  if(typeof window !== 'object')
    return
  if(window.matchMedia) {
    window.matchMedia('print').addListener((mql) => (mql.matches ? preprint : postprint)())
  } else {
    window.onbeforeprint = preprint
    window.onafterprint = postprint
  }
}
