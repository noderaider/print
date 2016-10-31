const stylesID = 'use-print-frame-styles'
export default function setCSS(doc, css, media) {
  if(typeof window !== 'object')
    return
  if(doc.getElementById(stylesID))
    throw new Error('setPrintCSS should not be registered twice on the same document - call undoPrintCSS first.')
  const styleElement = doc.createElement('style')
  styleElement.setAttribute('id', stylesID)
  styleElement.setAttribute('type', 'text/css')
  if(media)
    styleElement.setAttribute('media', media)
  styleElement.innerHTML = css
  doc.getElementsByTagName('head')[0].appendChild(styleElement)
  return function undoPrintCSS () {
    doc.getElementsByTagName('head')[0].removeChild(styleElement)
  }
}


