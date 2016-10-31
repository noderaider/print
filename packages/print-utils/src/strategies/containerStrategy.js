import { setCSS, resolveDocument } from '../utils'

export default function containerStrategy (frame, opts = {}) {
  const topPrintCSS = `
* {
  overflow: visible !important;
  margin: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  float: none !important;
}
body, html {
  margin: 0 !important;
  padding: 0 !important;
}
body > *:not(#print-content),
body > *:not(#print-content) * {
  display: none !important;
  position: unset !important;
}
body > #print-content {
  display: inline !important;
}
`
  const framePrintCSS = `
  `
  const printElement = document.createElement('div')
  printElement.setAttribute('id', 'print-content')
  printElement.setAttribute('style', 'display: none')
  document.body.insertBefore(printElement, document.body.firstChild)

  let undoTopPrintCSS
  let undoFramePrintCSS
  frame.addEventListener('load', () => {
    const frameDocument = resolveDocument(frame)
    undoTopPrintCSS = topPrintCSS ? setCSS(document, topPrintCSS, 'print') : () => {}
    undoFramePrintCSS = framePrintCSS ? setCSS(frameDocument, framePrintCSS, 'print') : () => {}
  })

  function preprint () {
    const frameDocument = resolveDocument(frame)
    printElement.innerHTML = frameDocument.body.innerHTML
    // TRY SPINNING IN CHROME TO DELAY IT
  }

  function postprint() {
  }

  function dispose() {
    if(undoTopPrintCSS)
      undoTopPrintCSS()
    if(undoFramePrintCSS)
      undoFramePrintCSS()
  }

  return { preprint, postprint, dispose }
}
