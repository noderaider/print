import invariant from 'invariant'

export default function copyHeadLinks (sourceDocument, targetDocument) {
  invariant(sourceDocument, 'source document is required')
  invariant(sourceDocument.head, 'source document must have a head')
  invariant(targetDocument, 'target document is required')
  invariant(targetDocument.head, 'target document must have a head')
  const sourceLinks = sourceDocument.querySelectorAll('head > link')
  //const _undos = new Set()
  Array.from(sourceLinks).forEach((link) => {
    const _link = document.createElement('link')
    if(_link.getAttribute('media') === 'screen')
      return
    _link.setAttribute('href', link.getAttribute('href'))
    _link.setAttribute('type', 'text/css')
    _link.setAttribute('media', 'print')
    _link.setAttribute('rel', 'stylesheet')
    _link.setAttribute('id', 'printCopy')
    targetDocument.head.appendChild(_link)
    //_undos.add(() => targetDocument.head.removeChild(_link))
  })
  return () => {
    const targetLinks = targetDocument.querySelectorAll('#printCopy')
    Array.from(targetLinks).forEach((link) => {
      targetDocument.head.removeChild(link)
    })
  }
}
