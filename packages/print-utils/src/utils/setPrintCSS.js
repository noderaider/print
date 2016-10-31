const stylesID = 'use-print-frame-styles'
export default function setPrintCSS(doc, css) {
  if(doc.getElementById(stylesID))
    throw new Error('setPrintCSS should not be registered twice on the same document - call undoPrintCSS first.')
  const styleElement = doc.createElement('style')
  styleElement.setAttribute('id', stylesID)
  styleElement.setAttribute('type', 'text/css')
  styleElement.setAttribute('media', 'print')
  styleElement.innerHTML = css
  document.getElementsByTagName('head')[0].appendChild(styleElement)
  return function undoPrintCSS () {
    document.getElementsByTagName('head')[0].removeChild(styleElement)
  }
}
