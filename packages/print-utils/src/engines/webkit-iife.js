import { setCSS, resolveDocument, copyHeadLinks, copyHeadStyles, copyStyles, replaceNode } from '../utils'

const { adjustMarks, showMarks, hideMarks } = (function () {
  let div = document.getElementById('__marks__')
  if(!div) {
    div = document.body.appendChild(document.createElement('div'))
    div.setAttribute('id', '__marks__')
    div.setAttribute('style', 'position:absolute;height:1px;width:1px;left:0;display:none;')
  }
  return (
    { adjustMarks(top) {
        div.style.setProperty('top', `${top}px`, 'important')
      }
    , showMarks() {
        div.style.setProperty('display', `inline-block`, 'important')
      }
    , hideMarks() {
        div.style.setProperty('display', `none`, 'important')
      }
    }
  )
}())


export default function webkit (frame, opts = {}) {
  const startWebkit = performance.now()
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
iframe {
  display: none !important;
  width: 0 !important;
  min-width: 0 !important;
  max-width: 0 !important;
  border: 0 !important;
  padding: 0 !important;
}
`
  const printElement = document.createElement('div')
  printElement.setAttribute('id', 'print-content')
  printElement.setAttribute('style', 'display: none')
  document.body.insertBefore(printElement, document.body.firstChild)

  let undos = new Set()
  let undoTopPrintCSS
  let undoHeadLinks
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
    undoHeadLinks = copyHeadLinks(frameDocument, document)
    adjustMarks(frameDocument.body.offsetHeight)
    /*
    raf(() => {
      let undoStyles = applyStyles()
      raf(() => {
        undoStyles()
      })
    })
    */
  })

  let undoStyles
  const preprint = (function () {
    return () => {
      const startPreprint = performance.now()
      showMarks()

      const frameDocument = resolveDocument(frame)
        //printElement.innerHTML = frameDocument.body.innerHTML
      undoStyles = (
        [ replaceNode(frameDocument.body, document.body)
        //, copyStyles(frameDocument.body, printElement)
        , copyHeadStyles(frameDocument, document)
        ]
      )
      const endPreprint= performance.now()
      console.info('ELAPSED (preprint)', endPreprint - startPreprint)
    }
  }())

  const postprint = (function() {
    return () => {
      while(undoStyles.length > 0) {
        undoStyles.pop()()
      }
    }
  }())

  function dispose() {
    if(undoTopPrintCSS)
      undoTopPrintCSS()
    if(undoHeadLinks)
      undoHeadLinks()
  }

  const endWebkit = performance.now()
  console.info('ELAPSED (WEBKIT)', endWebkit - startWebkit)
  return { preprint, postprint, dispose }
}
