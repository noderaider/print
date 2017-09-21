import { setCSS, resolveDocument, copyHeadLinks, copyHeadStyles, copyStyles } from '../utils'
import { POLLING, TRIGGERED } from '../modes'





const css = `
#print-directions {
  display: none;
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items:center;
  justify-content:center;
  font-size:1.2rem;
}

@media print {
  body > *:not(#print-directions) {
    display: none !important;
  }
  body #print-directions {
    display: flex !important;
    flex-direction: column;
  }
}
`

export default function webkit (frame, { mode, directionsHTML }) {
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

  function printSizing () {
    const undoCSS = setCSS(document, css, null, { id: 'print-zoom' })
    let printDirectionsElement = document.getElementById('print-directions')
    if(!printDirectionsElement) {
      printDirectionsElement = document.createElement('div')
      printDirectionsElement.innerHTML = directionsHTML
      printDirectionsElement.setAttribute('id', 'print-directions')
      document.body.insertBefore(printDirectionsElement, document.body.children[0])
    }

    frame.removeEventListener('load', printSizing)
    undos.add(() => {
      undoCSS()
      document.body.removeChild(printDirectionsElement)
    })
  }

  let printElement = document.getElementById('print-content')

  let undos = new Set()
  let undoTopPrintCSS
  let undoHeadLinks
  if(mode === POLLING) {
    let timeoutID
    let intervalID

    if(!printElement) {
      printElement = document.createElement('div')
      printElement.setAttribute('id', 'print-content')
      printElement.setAttribute('style', 'display: none')
      document.body.insertBefore(printElement, document.body.firstChild)
    }

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
      if(timeoutID)
        clearTimeout(timeoutID)
      if(intervalID)
        clearInterval(intervalID)
      timeoutID = setTimeout(() => {
        preprint()
        postprint()
        intervalID = setInterval(() => {
          preprint()
          postprint()
        }, 8000)
      }, 5000)

      frame.removeEventListener('load', printSizing)
    }

    frame.addEventListener('load', init)
  } else if (mode === TRIGGERED) {
    frame.addEventListener('load', printSizing)
  }

  function preprint () {
    if(mode === POLLING) {
      const startPreprint = performance.now()
      try {
        const frameDocument = resolveDocument(frame)
        printElement.innerHTML = frameDocument.body.innerHTML
        Array.from(printElement.querySelectorAll('link')).forEach((link) => link.setAttribute('media', 'print'))
        undos.add(copyStyles(frameDocument.body, printElement))
        undos.add(copyHeadStyles(frameDocument, document))
        //undos.add(() => { printElement.innerHTML = '' })
      }
      catch(ex) {
        console.info('PREPRINT ERROR')
      }
      const endPreprint = performance.now()
      console.info('PREPRINT', endPreprint - startPreprint)

    }
  }

  function postprint() {
    if(mode === POLLING) {
      for(let undo of undos) {
        undo()
      }
      undos.clear()
      printElement.setAttribute('style', 'display: none')
    }
  }

  function dispose() {
    if(undoTopPrintCSS)
      undoTopPrintCSS()
    if(undoHeadLinks)
      undoHeadLinks()
  }

  function trigger() {
    preprint()
    frame.contentWindow.focus()
    frame.contentWindow.print()
    postprint()
  }

  return { preprint, postprint, dispose, trigger }
}
