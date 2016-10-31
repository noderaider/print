import { setStyles, setCSS, resolveDocument } from '../utils'
import raf from 'raf'

export default function frameStrategy (frame
, { selectHeightElement = (frameDocument) => frameDocument.querySelector('[data-iframe-height]') || frameDocument.body
  , selectWidthElement = (frameDocument) => frameDocument.querySelector('[data-iframe-width]') || frameDocument.body
  , selectContainerStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
    { //'font-size': '12px !important'
    }
  /*
      { height: `${heightElement.offsetHeight}px !important`
      , width: '700px !important'
      , display: 'inline-table !important'
      , 'overflow': 'scroll !important'
      , top: '0 !important'
      , left: '0 !important'
      }
      */
    )
  , selectFrameStyle = ({ frameDocument, heightElement, widthElement } = {}) => {
      return (
        /*
        { visibility: 'visible !important'
        , position: 'fixed !important'
        , right: '0 !important'
        , bottom: '0 !important'
        }
        */
        { 'height': `${heightElement.offsetHeight}px !important`
        //, 'width': `${widthElement.offsetWidth}px !important`
        //, width: '100% !important'
        , display: 'inline-block !important'
        , top: '0 !important'
        , left: '0 !important'
        //, position: 'absolute !important'
        //, 'font-size': '10px !important'
        }
      )
    }
  , selectBodyStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
      //{ height: `${1.5 * heightElement.offsetHeight}px !important`
      {
      }
    )
  , selectAncestorStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
      { display: 'inline-block !important'
      }
    )
  , selectTopPrintCSS = ({ frameDocument, heightElement, widthElement }) => {

      //const undoWidthStyle = setStyles(heightElement, { width: '100vw !important' })
      const topPrintCSS = `
* {
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
  min-height: 0 !important;
  min-width: 0 !important;
  display: none !important;
  float: none !important;
}
body, html {
  margin: 0 !important;
  padding: 0 !important;
  display: inline-block !important;
}
body {
  height: ${heightElement.offsetHeight}px !important;
}
.react-focus {
  display: inline !important;
  position: absolute !important;
  width: 100vw !important;
  border: 0 !important;
  overflow: visible !important;
}
iframe {
  /*

   height: ${heightElement.offsetHeight}px !important;
  */
  position: relative !important;
  display: inline-block !important;
  border: 0 !important;
  top: 0 !important;
  left: 0 !important;
  /*
  right: 0 !important;
  */
  margin: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
  will-change: height;
}
`
      //undoWidthStyle()
      return topPrintCSS
    }
  , selectFramePrintCSS = ({ frameDocument, heightElement, widthElement }) => {
      return `
body {
  display: block !important;
}
`
    }
  } = {}) {

  let frameDocument
  let undoTopPrintCSS
  let undoFramePrintCSS
  frame.addEventListener('load', () => {
    frameDocument = resolveDocument(frame)
    const heightElement = selectHeightElement(frameDocument)
    const widthElement = selectWidthElement(frameDocument)
    const topPrintCSS = selectTopPrintCSS({ frameDocument, heightElement, widthElement })
    const framePrintCSS = selectFramePrintCSS({ frameDocument, heightElement, widthElement })
    undoTopPrintCSS = topPrintCSS ? setCSS(document, topPrintCSS, 'print') : () => {}
    undoFramePrintCSS = framePrintCSS ? setCSS(frameDocument, framePrintCSS, 'print') : () => {}
  })
  let undos = new Set()

  //let _bodyClassName

  function preprint () {
    frameDocument = resolveDocument(frame)
    //_bodyClassName = frameDocument.body.className
    //frameDocument.body.className = 'use-print-frame'
    const { container, ancestors } = selectAncestors (frame)
    frame.contentWindow.focus()

    if(!frameDocument)
      throw new Error('Could not find document in frame.')

    const heightElement = selectHeightElement(frameDocument)
    const widthElement = selectWidthElement(frameDocument)
    if(!heightElement)
      throw new Error('Could not find height element in frame.')
    if(!widthElement)
      throw new Error('Could not find width element in frame.')

    const containerStyle = selectContainerStyle({ frameDocument, heightElement, widthElement })
    const frameStyle = selectFrameStyle({ frameDocument, heightElement, widthElement })
    const bodyStyle = selectBodyStyle({ frameDocument, heightElement, widthElement })
    const ancestorStyle = selectAncestorStyle({ frameDocument, heightElement, widthElement })

    undos = new Set(
      [ setStyles(document.body, bodyStyle)
      , setStyles(container, containerStyle)
      , setStyles(frame, frameStyle)
      , ...ancestors.map((ancestor) => setStyles(ancestor, ancestorStyle))
      ]
    )
    console.log('--preprint--', undos.size)
  }

  function postprint() {
    //frameDocument.body.className = _bodyClassName
    console.log('--postprint--', undos.size)
    for(let undo of undos) {
      undo()
    }
    undos.clear()
  }

  function dispose () {
    if(undoTopPrintCSS)
      undoTopPrintCSS()
    if(undoFramePrintCSS)
      undoFramePrintCSS()
    if(undoStyles)
      undoStyles()
  }

  return { preprint, postprint, dispose }
}

function selectAncestors (frame) {
  const container = frame.parentNode
  const ancestors = []
  let current = container
  while(current.parentNode) {
    current = current.parentNode
    if(current.style)
      ancestors.push(current)
  }
  return { container, ancestors }
}
