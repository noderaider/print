import onPrint from './onPrint'

export default function usePrintFrame(
  { selectFrame = (doc) => doc.getElementById('content-frame')
  , selectHeightElement = (doc) => doc.querySelector('[data-iframe-height]') || doc.body
  , selectWidthElement = (doc) => doc.querySelector('[data-iframe-width]') || doc.body
  , selectContainerStyle = (doc, heightElement, widthElement) => (
      { position: 'fixed !important'
      , display: 'inline-block !important'
      , height: '100% !important'
      , width: '100% !important'
      }
    )
  , selectFrameStyle = (doc, heightElement, widthElement) => (
      { position: 'fixed !important'
      , display: 'inline-block !important'
      , minHeight: `${heightElement.offsetHeight}px !important`
      , minWidth: `${widthElement.offsetWidth}px !important`
      }
    )
  , selectAncestorStyle = (doc, heightElement, widthElement) => (
      { display: 'inline-block !important'
      , position: 'static !important'
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
* {
  display: none !important;
  position: static !important;
  margin: 0 !important;
}
`
  styleElement.innerHTML = styles
  document.head.appendChild(styleElement)
  const undoStyles = () => document.head.removeChild(styleElement)

  const undos = []
  const disposePrint = onPrint(
    { preprint() {
        const { frame, container, doc, ancestors } = selectNodes(selectFrame(document))
        const heightElement = selectHeightElement(doc)
        const widthElement = selectWidthElement(doc)

        const containerStyle = selectContainerStyle(doc, heightElement, widthElement)
        const frameStyle = selectFrameStyle(doc, heightElement, widthElement)
        const ancestorStyle = selectAncestorStyle(doc, heightElement, widthElement)

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
    ancestors.push(current)
  }
  return { frame, container, doc, ancestors }
}

function setStyles (element, styles) {
  const prevStyles = Object.entries(styles).reduce((_, [ key, next ]) => {
    const __ = { ..._, [key]: element.style[key] }
    element.style[key] = next
    return __
  }, {})
  return function undoStyles () {
    setStyles (element, prevStyles)
  }
}
