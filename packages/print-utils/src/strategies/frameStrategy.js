import { setStyles, setPrintCSS, resolveDocument } from '../utils'

export default function frameStrategy (frame
, { selectHeightElement = (doc) => doc.querySelector('[data-iframe-height]') || doc.body
  , selectWidthElement = (doc) => doc.querySelector('[data-iframe-width]') || doc.body
  , selectContainerStyle = ({ doc, heightElement, widthElement } = {}) => (
      { height: `${heightElement.offsetHeight}px !important`
      , width: '700px !important'
      , display: 'inline-table !important'
      , 'overflow': 'scroll !important'
      , top: '0 !important'
      , left: '0 !important'
      }
    )
  , selectFrameStyle = ({ doc, heightElement, widthElement } = {}) => {
      console.info('FRAME', widthElement.offsetWidth, heightElement.offsetHeight)
      return (
        { height: `${heightElement.offsetHeight}px !important`
        , width: '100% !important'
        , display: 'inline-block !important'
        , top: '0 !important'
        , left: '0 !important'
        }
      )
    }
  , selectHeightElementStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectWidthElementStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectFrameBodyStyle = ({ doc, heightElement, widthElement } = {}) => (
      {
      }
    )
  , selectAncestorStyle = ({ doc, heightElement, widthElement } = {}) => (
      { display: 'inline-block !important'
      }
    )
  } = {}) {
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
}
body, html {
  margin: 0 !important;
  padding: 0 !important;
  //, 'min-height': '200vh !important'
}
body {
  overflow: intitial !important;
  /*
  padding-right: 30px !important;
  */
}
body * {
  display: none !important;
}
.react-focus {
  /*
  position: fixed !important;
  */
  display: block !important;
  top: 0 !important;
  /*
  bottom: 0 !important;
  */
  left: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  /*
  overflow: initial !important;
  */
}
iframe {
  position: absolute !important;
  display: block !important;
  border: 0 !important;
  /*
  overflow: initial !important;
  */
  top: 0 !important;
  /*
  bottom: 0 !important;
  */
  left: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}
`
  const framePrintCSS = `
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
}
h1 {
  padding: 0 !important;
  margin: 0 !important;
}
body,
body * {
  /*
  overflow: initial !important;
  */
}
  `


  const undoTopCSS = topPrintCSS ? setPrintCSS(document, topPrintCSS) : () => {}
  let frameDocument
  let undoFrameCSS
  if(framePrintCSS && frame.contentWindow) {
    frameDocument = resolveDocument(frame)
    undoFrameCSS = setPrintCSS(frameDocument, framePrintCSS)
  }
  frame.addEventListener('load', () => {
    frameDocument = resolveDocument(frame)
    console.info('LOADED FRAME', frameDocument)
    undoFrameCSS = framePrintCSS ? setPrintCSS(frameDocument, framePrintCSS) : () => {}
    //const heightElement = selectHeightElement(frameDocument)
    //frame.setAttribute('style', `height: ${heightElement.offsetHeight}px !important; min-height: ${heightElement.offsetHeight}px !important;`)
  })
  let undos = new Set()

  function preprint () {
    frame.contentWindow.focus()
    console.info('PREprint')
    const { container, doc, ancestors } = selectNodes(frame)
    /*
    frame.setAttribute('width', '0')
    frame.setAttribute('height', '0')
    */

    if(!doc)
      throw new Error('Could not find doc in frame.')

    const heightElement = selectHeightElement(doc)
    const widthElement = selectWidthElement(doc)
    if(!heightElement)
      throw new Error('Could not find height element in frame.')
    if(!widthElement)
      throw new Error('Could not find width element in frame.')

    const containerStyle = selectContainerStyle({ doc, heightElement, widthElement })
    const frameStyle = selectFrameStyle({ doc, heightElement, widthElement })
    const frameBodyStyle = selectFrameBodyStyle({ doc, heightElement, widthElement })
    const heightElementStyle = selectHeightElementStyle({ doc, heightElement, widthElement })
    const widthElementStyle = selectWidthElementStyle({ doc, heightElement, widthElement })
    const ancestorStyle = selectAncestorStyle({ doc, heightElement, widthElement })


    undos = new Set(
      [ setStyles(container, containerStyle)
      , setStyles(frame, frameStyle)
      , setStyles(heightElement, heightElementStyle)
      , setStyles(widthElement, widthElementStyle)
      , setStyles(doc.body, frameBodyStyle)
      , ...ancestors.map((ancestor) => setStyles(ancestor, ancestorStyle))
      ]
    )
    console.log('--preprint--', undos.size)
  }

  function postprint() {
    console.info('POSTprint')
    console.log('--postprint--', undos.size)
    for(let undo of undos) {
      undo()
    }
    undos.clear()
  }

  function dispose () {
    undoTopCSS()
    undoFrameCSS()
    undoStyles()
  }

  return { preprint, postprint, dispose }
}

function selectNodes (frame) {
  const container = frame.parentNode
  const doc = resolveDocument(frame)

  const ancestors = []
  let current = container
  while(current.parentNode) {
    current = current.parentNode
    if(current.style)
      ancestors.push(current)
  }
  return { container, doc, ancestors }
}
