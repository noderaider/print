export default function setCSS(doc, css, media, { id = 'use-print-frame-styles' } = {}) {
  if(typeof window !== 'object')
    return

  const oldCSS = doc.querySelector(`head > #${id}`)
  if(oldCSS)
    doc.head.removeChild(oldCSS)
  const styleElement = doc.createElement('style')
  styleElement.setAttribute('id', id)
  styleElement.setAttribute('type', 'text/css')
  if(media)
    styleElement.setAttribute('media', media)
  styleElement.innerHTML = css
  doc.getElementsByTagName('head')[0].appendChild(styleElement)
  return function undoPrintCSS () {
    doc.getElementsByTagName('head')[0].removeChild(styleElement)
  }
}


