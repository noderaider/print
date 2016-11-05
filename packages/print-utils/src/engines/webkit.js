import { setStyles, setCSS, resolveDocument, getScale, round } from '../utils'
import raf from 'raf'
import cn from 'classnames'
import invariant from 'invariant'

export default function webkit (frame
  //TODO TEST WITHOUT data-iframe-height and data-iframe-width
, { selectHeightElement = (frameDocument) => frameDocument.querySelector('[data-iframe-height]') || frameDocument.body
  , selectWidthElement = (frameDocument) => frameDocument.querySelector('[data-iframe-width]') || frameDocument.body
  , selectContainerStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
      { position: 'absolute !important'
      , 'z-index': '99999'
      }
    )
  , selectFrameStyle = ({ frameDocument, heightElement, widthElement } = {}) => {
      return (
        { 'height': `${heightElement.offsetHeight}px !important`
        , width: '1107px !important'
        , position: 'absolute !important'
        , 'z-index': '99999'
        , display: 'block !important'
        , top: '0 !important'
        , left: '0 !important'
        }
      )
    }
  , selectBodyStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
      { display: 'inline-block !important'
      , width: '1107px !important'
      , height: `${heightElement.offsetHeight}px !important`
      , overflow: 'visible !important'
      }
    )
  , selectAncestorStyle = ({ frameDocument, heightElement, widthElement } = {}) => (
      { display: 'inline-block !important'
      , width: '1107px !important'
      , 'max-width': '1107px !important'
      , height: `${heightElement.offsetHeight}px !important`
      , overflow: 'visible !important'
      }
    )
  , selectTopPrintCSS = ({ frameDocument, heightElement, widthElement, frameID }) => {

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
  display: none !important;
  float: none !important;
  /*
  box-sizing: border-box;
  min-height: 0;
  min-width: 0;
  width: 0;
  height: 0;
  */
}
body, html {
  margin: 0 !important;
  padding: 0 !important;
}
body {
  height: ${heightElement.offsetHeight}px !important;
}
.react-focus {
  display: inline-block !important;
  /* transform-origin: top left !important; */
  /* position: relative !important; */
  top: 0 !important;
  left: 0 !important;
  /* right: 0 !important; */
  border: 0 !important;
  overflow: visible !important;
  /*
  height: ${heightElement.offsetHeight}px !important;
  */
  width: 1107px !important;
}
iframe#${frameID} {
  width: 100%;
  max-width: 1107px !important;
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
  float: none !important;

}
body {
  display: block !important;
  max-width: 1107px !important;
}
`
    }
  , selectMaxWidth = ({} = {}) => {
      return 1107
    }
  , selectPrintWidth = ({} = {}) => {
      return 1107
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
    const pageScale = round(getScale(printWidth, topWidth), { down: true })
    const containerScale = round(getScale(printWidth, containerWidth), { down: true })
    // the top frame size relative to the iframe
    const frameScale = round(getScale(printWidth, frameWidth), { down: true })
    const scale = round(pageScale * frameScale, { down: true })
    //const width = frame.contentWindow.innerWidth
    //const width = widthElement.offsetWidth
    const scaledWidth = printWidth //roundDown(topWidth * pageScale, 1)
    console.info(`--calculateScale--\nprintWidth: ${printWidth}\ntopWidth: ${topWidth}\nframeWidth: ${frameWidth}\nwidthElement: ${widthElement.offsetWidth}\npageScale: ${pageScale}\nframeScale: ${frameScale}\ncontainerScale: ${containerScale}\nscale: ${scale}\nscaledWidth: ${scaledWidth}`)
    return { scale, scaledWidth, pageScale, frameScale, containerScale }
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

    if(undoTopPrintCSS)
      undoTopPrintCSS()
    if(undoFramePrintCSS)
      undoFramePrintCSS()
    undoTopPrintCSS = topPrintCSS ? setCSS(document, topPrintCSS, 'print', { id: 'top-css' }) : () => {}
    undoFramePrintCSS = framePrintCSS ? setCSS(frameDocument, framePrintCSS, 'print', { id: 'frame-css' }) : () => {}
  }


  let containerClassName
  frame.addEventListener('load', () => {
    setPrintStyles()
    const { container, ancestors } = selectAncestors (frame)
    containerClassName = container.className
    container.className = cn(container.className, 'react-focus')
  })
  let undos = new Set()

  // FINDINGS
  // DOES NOT UNDERSTAND WIDTH CHANGES INSIDE
  function preprint () {
    frameDocument = resolveDocument(frame)
    const undoFrameBodyStyles = setStyles(frameDocument.body, { 'width': `${1100}px !important`, overflow: 'visible !important' })
    const printWidth = selectPrintWidth()


    const { container, ancestors } = selectAncestors (frame)



    //frame.setAttribute('width', 1107)
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

    //const { scale, scaledWidth, frameScale, pageScale, containerScale } = calculateScale ({ widthElement })


    undos = new Set(
      [ undoFrameBodyStyles
      , setStyles(document.body, bodyStyle)
      //, setStyles(container, containerStyle)
      //, setStyles(container, { transform: `scale(${containerScale}) !important` })
      , setStyles(container, { width: `1107px !important`, height: `${heightElement.offsetHeight}px !important`, overflow: 'visible !important' })
      , setStyles(frame, frameStyle)
      , setStyles(frame, { /* transform: `scale(${frameScale}) !important`, */ overflow: 'visible !important' })


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
