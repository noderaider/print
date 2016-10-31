import { setPrintCSS, resolveDocument } from '../utils'

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
}
body, html {
  height: 100vh;
}
body > *:not(#print-content),
body > *:not(#print-content) * {
  display: none !important;
  position: unset !important;
}
body > #print-content,
body > #print-content * {
  display: inline-block !important;
  margin: 0 !important;
  padding: 0 !important;
  max-width: 750px !important;
}
`
  const framePrintCSS = `
  `
  const printElement = document.createElement('div')
  printElement.setAttribute('id', 'print-content')
  printElement.setAttribute('style', 'display: none')
  document.body.insertBefore(printElement, document.body.firstChild)

  const undoTopCSS = topPrintCSS ? setPrintCSS(document, topPrintCSS) : () => {}
  let undoFrameCSS = framePrintCSS ? setPrintCSS(resolveDocument(frame), framePrintCSS) : () => {}
  frame.addEventListener('load', () => {
    const frameDocument = resolveDocument(frame)
    undoFrameCSS = framePrintCSS ? setPrintCSS(frameDocument, framePrintCSS) : () => {}
    printElement.innerHTML = frameDocument.body.innerHTML
  })

  function preprint () {
  }

  function postprint() {
  }

  function dispose() {
  }

  return { preprint, postprint, dispose }
}
