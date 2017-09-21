import { setCSS, resolveDocument, copyHeadLinks, copyHeadStyles, copyStyles } from '../utils'
import { POLLING, TRIGGERED } from '../modes'

export default function trident (frame, { mode }) {
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
iframe {
  display: none !important;
  width: 0 !important;
  min-width: 0 !important;
  max-width: 0 !important;
  border: 0 !important;
  padding: 0 !important;
}
body > #print-content {
  display: inline !important;
}
`
  const framePrintCSS = `
  `

  let printElement = document.getElementById('print-content')
  if(!printElement) {
    printElement = document.createElement('div')
    printElement.setAttribute('id', 'print-content')
    printElement.setAttribute('style', 'display: none')
    document.body.insertBefore(printElement, document.body.firstChild)
  }

  let undos = new Set()
  let undoTopPrintCSS
  let undoHeadLinks
  function init () {
    const frameDocument = resolveDocument(frame)
    if(undos.size > 0) {
      for(let undo of undos) {
        undo()
      }
      undos.clear()
    }
    if(undoTopPrintCSS)
      undoTopPrintCSS()
    undoTopPrintCSS = topPrintCSS ? setCSS(document, topPrintCSS, 'print', { id: 'top-css' }) : () => {}
    undoHeadLinks = copyHeadLinks(frameDocument, document)

    if(mode === TRIGGERED) {
      window.onbeforeprint = preprint
      window.onafterprint = postprint
    }

    frame.removeEventListner('load', init)
  }

  frame.addEventListener('load', init)

  function preprint () {
    const frameDocument = resolveDocument(frame)
    printElement.innerHTML = frameDocument.body.innerHTML
    undos.add(copyStyles(frameDocument.body, printElement))
    undos.add(copyHeadStyles(frameDocument, document))
  }

  function postprint() {
    for(let undo of undos) {
      undo()
    }
    undos.clear()
    printElement.setAttribute('style', 'display: none')
  }

  function dispose() {
    if(undoTopPrintCSS)
      undoTopPrintCSS()
    if(undoHeadLinks)
      undoHeadLinks()
  }


  function trigger() {
    if(frame.contentWindow) {
      init()
    }
    /*
    window.onbeforeprint = preprint

    window.onafterprint = postprint
    */
    window.focus()
    window.print()
  }

  return { preprint, postprint, dispose, trigger }
}
