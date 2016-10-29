import onPrint from './onPrint'
import parseCSSProperty from './utils/parseCSSProperty'
import serializeCSSProperty from './utils/serializeCSSProperty'

function round(num) {
  return Math.floor(num * 100) / 100
}
const scaleToWidth = 800
function getScale (width) {
  return round(scaleToWidth / width)
}
export default function usePrintFrame( frame
, { selectHeightElement = (doc) => doc.querySelector('[data-iframe-height]') || doc.body
  , selectWidthElement = (doc) => doc.querySelector('[data-iframe-width]') || doc.body
  , selectContainerStyle = ({ doc, heightElement, widthElement } = {}) => (
      { position: 'absolute !important'
      /*
      , width: 'unset !important'
      , height: 'unset !important'
      , width: `${widthElement.offsetWidth}px`
      , height: `${heightElement.offsetHeight}px`
      */
      , 'min-width': '900px !important'
      , 'min-height': 'unset !important'
      , 'max-width': 'unset !important'
      , 'max-height': 'unset !important'
      , top: '0px !important'
      , bottom: '0px !important'
      , left: '0px !important'
      , right: '0px !important'
      , border: '2px dashed blue !important'
      //, border: '0px !important'
      , overflow: 'visible !important'
      }
    /*
      , display: 'inline-block'
      , height: '100%'
      , width: '100%'
      */
    )

  , selectFrameStyle = ({ doc, heightElement, widthElement } = {}) => {
      return (
        { position: 'absolute !important'
        , display: 'inline-block !important'
        , transform: `scale(${getScale(widthElement.offsetWidth)}) !important`
        , width: `${widthElement.offsetWidth}px !important`
        , height: `${heightElement.offsetHeight}px !important`
        /*
        , 'min-width': 'unset !important'
        , 'min-height': 'unset !important'
        , 'max-width': 'unset !important'
        , 'max-height': 'unset !important'
        */
        , top: '0px !important'
        , bottom: '0px !important'
        , left: '0px !important'
        , right: '0px !important'
        , border: '1px dashed green !important'
        //, border: '0px !important'
        , margin: '0px !important'
        , padding: '0px !important'
        , 'padding-top': '0px !important'
        , 'padding-bottom': '0px !important'
        , overflow: 'visible !important'
        , 'box-shadow': 'none !important'
        , 'background-color': 'transparent !important'
        , 'border-radius': '0 !important'
        }
      )
      /*
      , 'min-height': `${heightElement.offsetHeight}px !important`
      , 'min-width': `${widthElement.offsetWidth}px !important`
      */
      /*
      .print-target {
  display: inline-block;
  /* position: fixed !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  overflow: visible;
  height: 100% !important;
  width: 1500px;
      border:none;position:absolute;width:0px;height:0px;bottom:0px;left:0px;
      */
    }
    , selectHeightElementStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectWidthElementStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectFrameBodyStyle = ({ doc, heightElement, widthElement } = {}) => (
      { margin: '0px !important'
      //, 'margin-right': '40px !important'
      , padding: '0px !important'
      //, 'padding-right': '30px !important'
      , 'padding-top': '0px !important'
      , 'padding-bottom': '0px !important'
      , 'position': 'fixed !important'
      , top: '0px !important'
      , bottom: '0px !important'
      , left: '0px !important'
      , right: '0px !important'
      , overflow: 'visible !important'
      }
    )
  , selectAncestorStyle = ({ doc, heightElement, widthElement } = {}) => (
      { display: 'inline-block !important'
      , position: 'static !important'
      , overflow: 'visible !important'
      }
    )
  , topPrintCSS = `
body {
  display: inline-block !important;
  border: 3px solid red !important;
}
body * {
  display: none !important;
  position: unset !important;
  margin: 0 !important;
  padding: 0 !important;
}
`
  , framePrintCSS = ''
  } = {}
) {
  if(typeof window !== 'object')
    return
  if(!frame)
    throw new Error('usePrintFrame must be provided the frame element.')

  const undoTopCSS = topPrintCSS ? setPrintCSS(document, topPrintCSS) : () => {}
  const undoFrameCSS = framePrintCSS ? setPrintCSS(resolveDocument(frame), framePrintCSS) : () => {}


  //setStyles(document.body, { border: '1px dashed red !important' })

  //const undoPrelimFrameStyle = setStyles(frame, { 'will-change': 'position display width height min-width min-height max-width max-height !important' })

  let undos = new Set()
  const disposePrint = onPrint(
    { preprint() {
        const { container, doc, ancestors } = selectNodes(frame)
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
          , setStyles(doc.body, heightElementStyle)
          , setStyles(doc.body, widthElementStyle)
          , setStyles(doc.body, frameBodyStyle)
          , ...ancestors.map((ancestor) => setStyles(ancestor, ancestorStyle))
          ]
        )
        console.log('--preprint--', undos.size)
      }
    , postprint() {
        console.log('--postprint--', undos.size)
        for(let undo of undos) {
          undo()
        }
        undos.clear()
      }
    }
  )

  return function dispose () {
    undoTopCSS()
    undoFrameCSS()
    undoStyles()
  }
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

/*
overflow: hidden; min-width: 990px; height: 385px; width: 990px;
overflow: hidden; min-width: 377px !important; height: 385px; width: 990px; position: fixed !important; display: inline-block !important; min-height: 286px !important;
overflow: hidden; min-width: 990px !important; height: 385px; width: 990px;
*/

function resolveDocument(obj) {
  if(obj.contentDocument)
    return obj.contentDocument
  else if(obj.contentWindow)
    return obj.contentWindow.contentDocument
  else if(obj.document)
    return obj.document
  throw new Error('resolveDocument found no document object')
}

const stylesID = 'use-print-frame-styles'
function setPrintCSS(doc, css) {
  if(doc.getElementById(stylesID))
    throw new Error('setPrintCSS should not be registered twice on the same document - call undoPrintCSS first.')
  const styleElement = doc.createElement('style')
  styleElement.setAttribute('id', stylesID)
  styleElement.setAttribute('type', 'text/css')
  styleElement.setAttribute('media', 'print')
  styleElement.innerHTML = css
  doc.head.appendChild(styleElement)
  return function undoPrintCSS () {
    doc.head.removeChild(styleElement)
  }
}


function setStyles (element, styles) {
  const prevStyles = Object.entries(styles).reduce((prev, [ key, next ]) => {
    const prop = { value: element.style.getPropertyValue(key), priority: element.style.getPropertyPriority(key) }
    console.info('SET STYLES', key, next, prop)
    const serialized = prop.value ? serializeCSSProperty(prop) : null
    Object.defineProperty(prev, key, { value: serialized, enumerable: true })
    if(next) {
      const { value, priority } = parseCSSProperty(next)
      element.style.setProperty(key, value, priority)
    } else {
      element.style.removeProperty(key)
    }
    return prev
  }, {})
  return function undoStyles () {
    setStyles (element, prevStyles)
  }
}
