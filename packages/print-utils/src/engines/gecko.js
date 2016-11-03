import { setCSS, resolveDocument } from '../utils'

export default function gecko (frame, opts = {}) {
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

  function copyStyles (source, target) {
    const styles = window.getComputedStyle(source)
    const oldStyles = new Map()
    const styleMap = Array.from(styles)
      .filter((x) => {
        const value = styles[x]
        return typeof value === 'string' && value.length > 0 && value !== 'normal'
      })
      .map((x) => [ x, styles[x] ])
      .reduce((style, [ name, value ]) => {
        oldStyles.set(name, style.getPropertyValue(name))
        style.setProperty(name, value)
        return style
      }, target.style)
    return () => oldStyles.forEach(([ name, value ]) => {
      target.style.setProperty(name, value)
    })
  }

  let undos = new Set()

  function preprint () {
    const frameDocument = resolveDocument(frame)
    printElement.innerHTML = frameDocument.body.innerHTML
    undos.add(copyStyles(frameDocument.body, printElement))
    /* COPY CHILD NODES STYLES (UNNECESSARY?)
    Array.from(frameDocument.body.childNodes).forEach((node, i) => {
      undos.add(copyStyles(node, printElement.childNodes[i]))
    })
    */
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
    if(undoFramePrintCSS)
      undoFramePrintCSS()
  }

  return { preprint, postprint, dispose }
}
