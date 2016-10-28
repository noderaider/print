import onPrint from './onPrint'
import parseCSSProperty from './utils/parseCSSProperty'
import serializeCSSProperty from './utils/serializeCSSProperty'


export default function usePrintFrame( frame
, { selectHeightElement = (doc) => doc.querySelector('[data-iframe-height]') || doc.body
  , selectWidthElement = (doc) => doc.querySelector('[data-iframe-width]') || doc.body
  , selectContainerStyle = ({ doc, heightElement, widthElement } = {}) => (
    /*
      { position: 'fixed'
      , display: 'inline-block'
      , height: '100%'
      , width: '100%'
      */
      {}
    )
  , selectHeightElementStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectWidthElementStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectFrameBodyStyle = ({ doc, heightElement, widthElement } = {}) => (
      {}
    )
  , selectFrameStyle = ({ doc, heightElement, widthElement } = {}) => (
      { position: 'absolute !important'
      , display: 'inline-block !important'
      /*
      , 'min-height': `${heightElement.offsetHeight}px !important`
      , 'min-width': `${widthElement.offsetWidth}px !important`
      */
      , border: 'none !important'
      , width: '0px !important'
      , height: '0px !important'
      , bottom: '0px !important'
      , left: '0px !important'
      }
      /*
      border:none;position:absolute;width:0px;height:0px;bottom:0px;left:0px;
      */
    )
  , selectAncestorStyle = ({ doc, heightElement, widthElement } = {}) => (
      { display: 'inline-block !important'
      , position: 'static !important'
      }
    )
  , topPrintCSS = `
body * {
  display: none !important;
  position: static !important;
  margin: 0 !important;
}
`
  , framePrintCSS = ''
  , postDelay = 500
  } = {}
) {
  if(typeof window !== 'object')
    return
  if(!frame)
    throw new Error('usePrintFrame must be provided the frame element.')

  const undoTopCSS = topPrintCSS ? setPrintCSS(document, topPrintCSS) : () => {}
  const undoFrameCSS = framePrintCSS ? setPrintCSS(resolveDocument(frame), framePrintCSS) : () => {}



  const undos = []
  console.info('REGISTER ON PRINT')
  const disposePrint = onPrint(
    { preprint() {
        console.log('--PREPRINT--')
        const { container, doc, ancestors } = selectNodes(frame)

        const heightElement = selectHeightElement(doc)
        const widthElement = selectWidthElement(doc)

        const containerStyle = selectContainerStyle(doc, heightElement, widthElement)
        const frameStyle = selectFrameStyle(doc, heightElement, widthElement)
        const ancestorStyle = selectAncestorStyle(doc, heightElement, widthElement)

        console.info('--preprint--')

        undos.push(setStyles(container, containerStyle))
        undos.push(setStyles(frame, frameStyle))
        undos.concat(ancestors.map((ancestor) => setStyles(ancestor, ancestorStyle)))
      }
    , postprint() {
        setTimeout(() => {
          while(undos.length > 0) {
            (undos.pop())()
          }
        }, postDelay)
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
  const doc = frame.contentDocument

  const ancestors = []
  let current = container
  while(current.parentNode) {
    current = current.parentNode
    if(current.style)
      ancestors.push(current)
  }
  return { frame, container, doc, ancestors }
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
