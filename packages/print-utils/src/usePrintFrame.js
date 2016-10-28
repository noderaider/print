import onPrint from './onPrint'
import util from 'util'

export default function usePrintFrame(
  { selectFrame = (doc) => doc.getElementById('content-frame')
  , selectHeightElement = (doc) => doc.querySelector('[data-iframe-height]') || doc.body
  , selectWidthElement = (doc) => doc.querySelector('[data-iframe-width]') || doc.body
  , selectContainerStyle = (doc, heightElement, widthElement) => (
    /*
      { position: 'fixed'
      , display: 'inline-block'
      , height: '100%'
      , width: '100%'
      */
      {}
    )
  , selectFrameStyle = (doc, heightElement, widthElement) => (
      { position: 'fixed'
      , display: 'inline-block'
      , minHeight: `${heightElement.offsetHeight}px`
      , minWidth: `${widthElement.offsetWidth}px`
      }
    )
  , selectAncestorStyle = (doc, heightElement, widthElement) => (
      { display: 'inline-block'
      , position: 'static'
      }
    )
  , postDelay = 500
  } = {}
) {
  if(typeof window !== 'object')
    return


  const stylesID = 'print-frame-styles'
  if(document.getElementById(stylesID))
    throw new Error('usePrintFrame should not be registered twice - call dispose first.')


  const styleElement = document.createElement('style')
  styleElement.setAttribute('id', stylesID)
  styleElement.setAttribute('type', 'text/css')
  styleElement.setAttribute('media', 'print')
  const styles = `
body * {
  display: none !important;
  position: static !important;
  margin: 0 !important;
}
`
  styleElement.innerHTML = styles
  document.head.appendChild(styleElement)
  const undoStyles = () => document.head.removeChild(styleElement)

  const undos = []
  console.info('REGISTER ON PRINT')
  const disposePrint = onPrint(
    { preprint() {
        console.log('--PREPRINT--')
        const { frame, container, doc, ancestors } = selectNodes(selectFrame(document))

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
    undoStyles()
    disposePrint()
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

function setStyles (element, styles) {
  const prevStyles = Object.entries(styles).reduce((prev, [ key, next ]) => {
    prev[key] = element.style[key]
    if(next)
      element.style.setProperty(key, next, 'important')
    else
      element.style.removeProperty(key)
    return prev
  }, {})
  return function undoStyles () {
    setStyles (element, prevStyles)
  }
}
