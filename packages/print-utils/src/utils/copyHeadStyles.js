import invariant from 'invariant'

export default function copyHeadStyles (sourceDocument, targetDocument) {
  invariant(sourceDocument, 'source document is required')
  invariant(sourceDocument.head, 'source document must have a head')
  invariant(targetDocument, 'target document is required')
  invariant(targetDocument.head, 'target document must have a head')
  const sourceStyles = sourceDocument.querySelectorAll('head > style')
  const _undos = new Set()
  Array.from(sourceStyles).forEach((style) => {
    const _style = document.createElement('style')
    _style.innerHTML = style.innerHTML
    targetDocument.head.appendChild(_style)
    _undos.add(() => targetDocument.head.removeChild(_style))
  })
  return () => {
    for(let undo of _undos) {
      undo()
    }
  }
}

