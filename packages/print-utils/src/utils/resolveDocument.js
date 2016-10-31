export default function resolveDocument(obj) {
  if(obj.contentDocument)
    return obj.contentDocument
  else if(obj.contentWindow)
    return obj.contentWindow.contentDocument
  else if(obj.document)
    return obj.document
  throw new Error('resolveDocument found no document object')
}
