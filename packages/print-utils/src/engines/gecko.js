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
  const printElement = document.createElement('div')
  printElement.setAttribute('id', 'print-content')
  printElement.setAttribute('style', 'display: none')
  document.body.insertBefore(printElement, document.body.firstChild)

  let undos = new Set()
  let undoTopPrintCSS
  let undoFramePrintCSS
  let undoHeadStyles
  frame.addEventListener('load', () => {
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
    //undoFramePrintCSS = framePrintCSS ? setCSS(frameDocument, framePrintCSS, 'print') : () => {}
    undoHeadStyles = copyHeadStyles(frameDocument, document)
  })

  function copyStyles (sourceElement, targetElement) {
    const styles = window.getComputedStyle(sourceElement)
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
      }, targetElement.style)
    return () => oldStyles.forEach(([ name, value ]) => {
      targetElement.style.setProperty(name, value)
    })
  }

  const startsWithPrint = /^\s*@media print/

  function copyHeadStyles (sourceDocument, targetDocument) {
    const sourceLinks = sourceDocument.querySelectorAll('head > link')
    const sourceStyles = sourceDocument.querySelectorAll('head > style')
    const _undos = new Set()
    Array.from(sourceLinks).forEach((link) => {
      console.info('COPYING LINK ELEMENT', link)
      const _link = document.createElement('link')
      _link.setAttribute('href', link.getAttribute('href'))
      _link.setAttribute('type', 'text/css')
      _link.setAttribute('media', 'print')
      _link.setAttribute('rel', 'stylesheet')
      targetDocument.head.appendChild(_link)
      _undos.add(() => targetDocument.head.removeChild(_link))
    })
    Array.from(sourceStyles).forEach((style) => {
      console.info('COPYING STYLE ELEMENT', style)
      const _style = document.createElement('style')
      const isPrint = startsWithPrint.test(style.innerHTML)
      _style.innerHTML = isPrint ? style.innerHTML : `
@media print {
  ${style.innerHTML}
}`
      targetDocument.head.appendChild(_style)
      _undos.add(() => targetDocument.head.removeChild(_style))
    })
    return () => _undos.forEach((fn) => fn())
  }


  function preprint () {
    const frameDocument = resolveDocument(frame)
    printElement.innerHTML = frameDocument.body.innerHTML
    undos.add(copyStyles(frameDocument.body, printElement))
    //undos.add(copyHeadStyles(frameDocument, document))
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
    if(undoHeadStyles)
      undoHeadStyles()
  }

  return { preprint, postprint, dispose }
}
