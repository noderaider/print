import { setStyles, setCSS, resolveDocument, getScale } from '../utils'
import raf from 'raf'
import cn from 'classnames'
import invariant from 'invariant'

export default function webkit (frame
  //TODO TEST WITHOUT data-iframe-height and data-iframe-width
, { selectHeightElement = (frameDocument) => frameDocument.body /*frameDocument.querySelector('[data-iframe-height]') || frameDocument.body */
  , selectWidthElement = (frameDocument) => frameDocument.body /*frameDocument.querySelector('[data-iframe-width]') || frameDocument.body*/
  , selectContainerStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
      { position: 'absolute !important'
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
  , selectTopPrintCSS = ({ frameDocument, heightElement, widthElement, frameID }) => {

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
  /*
  min-height: 0 !important;
  min-width: 0 !important;
  */
  display: none !important;
  float: none !important;
  box-sizing: border-box;
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
  display: inline-block !important;
  transform-origin: top left !important;
  /* position: relative !important; */
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  border: 0 !important;
  overflow: visible !important;
}
iframe#${frameID} {
  width: 100%;
  /*

   height: ${heightElement.offsetHeight}px !important;
  */
  transform-origin: top left !important;
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
  will-change: height width;
}
`
      //undoWidthStyle()
      return topPrintCSS
    }
  , selectFramePrintCSS = ({ frameDocument, heightElement, widthElement }) => {
      return `
* {
  box-sizing: content-box;  /* border-box; */
}
body {
  display: block !important;
}
`
    }
  , selectMaxWidth = ({} = {}) => {
      return 990
    }
  , selectPrintWidth = ({} = {}) => {
      return 700
    }
  } = {}) {

  let frameID = frame.getAttribute('id')

  let frameDocument
  let undoTopPrintCSS
  let undoFramePrintCSS

  function calculateScale ({ widthElement }) {
    const printWidth = selectPrintWidth()
    const topWidth = window.innerWidth
    const frameWidth = frame.contentWindow.innerWidth
    const container = frame.parentNode
    if(container.offsetWidth === 0)
      container.style.setProperty('width', `${frameWidth}px`, 'important')
    const containerWidth = container.offsetWidth || frameWidth
    invariant(printWidth, 'printWidth must be a number greater than 0')
    invariant(topWidth, 'topWidth must be a number greater than 0')
    invariant(frameWidth, 'frameWidth must be a number greater than 0')
    invariant(containerWidth, 'containerWidth must be a number greater than 0')
    // the target page size relative to the top frame
    const pageScale = roundDown(getScale(printWidth, topWidth))
    const containerScale = roundDown(getScale(printWidth, containerWidth))
    // the top frame size relative to the iframe
    const frameScale = roundDown(getScale(printWidth, frameWidth))
    const scale = roundDown(pageScale * frameScale)
    //const width = frame.contentWindow.innerWidth
    //const width = widthElement.offsetWidth
    const scaledWidth = printWidth //roundDown(topWidth * pageScale, 1)
    console.info(`--calculateScale--\nprintWidth: ${printWidth}\ntopWidth: ${topWidth}\nframeWidth: ${frameWidth}\nwidthElement: ${widthElement.offsetWidth}\npageScale: ${pageScale}\nframeScale: ${frameScale}\ncontainerScale: ${containerScale}\nscale: ${scale}\nscaledWidth: ${scaledWidth}`)
    return { scale, scaledWidth, pageScale, frameScale, containerScale }
  }

  function roundDown(num, place = 100) {
    return Math.floor(num * place) / place
  }

  function setPrintStyles() {
    frameDocument = resolveDocument(frame)
    const heightElement = selectHeightElement(frameDocument)
    const widthElement = selectWidthElement(frameDocument)
    const topPrintCSS = selectTopPrintCSS({ frameDocument, heightElement, widthElement, frameID })
    const framePrintCSS = selectFramePrintCSS({ frameDocument, heightElement, widthElement })
    const printWidth = selectPrintWidth()
    //frame.setAttribute('width', pageWidth)
    //setStyles(frame, { 'max-width': `${printWidth}px !important` })

    undoTopPrintCSS = topPrintCSS ? setCSS(document, topPrintCSS, 'print') : () => {}
    undoFramePrintCSS = framePrintCSS ? setCSS(frameDocument, framePrintCSS, 'print') : () => {}
  }


  frame.addEventListener('load', () => {
    setPrintStyles()
  })
  let undos = new Set()

  // FINDINGS
  // DOES NOT UNDERSTAND WIDTH CHANGES INSIDE
  function preprint () {
    frameDocument = resolveDocument(frame)
    const printWidth = selectPrintWidth()

    const { container, ancestors } = selectAncestors (frame)

    let containerClassName = container.className
    container.className = cn(container.className, 'react-focus')
    let undoContainerClass = () => {
      container.className = containerClassName
    }

    frame.contentWindow.focus()

    invariant(frameDocument, 'Could not find document in frame')

    const heightElement = selectHeightElement(frameDocument)
    const widthElement = selectWidthElement(frameDocument)
    invariant(heightElement, 'DOM element must be returned from selectHeightElement')
    invariant(widthElement, 'DOM element must be returned from selectWidthElement')

    const opts = { frameDocument, heightElement, widthElement }

    const containerStyle = selectContainerStyle(opts)
    const frameStyle = selectFrameStyle(opts)
    const bodyStyle = selectBodyStyle(opts)
    const ancestorStyle = selectAncestorStyle(opts)

    const { scale, scaledWidth, frameScale, pageScale, containerScale } = calculateScale ({ widthElement })

    undos = new Set(
      [ undoContainerClass
      , setStyles(document.body, bodyStyle)
      , setStyles(container, containerStyle)
      , setStyles(container, { transform: `scale(${containerScale}) !important` })
      //, setStyles(container, { width: `${scaledWidth}px !important` })
      , setStyles(frame, frameStyle)

      //, setStyles(frame, { transform: `scale(${frameScale}) !important` })
      , ...ancestors.map((ancestor) => setStyles(ancestor, ancestorStyle))
      ]
    )
    console.log('--preprint--', undos.size)
  }

  function postprint() {
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
