import invariant from 'invariant'
import setStyles from './setStyles'

const replaceNode = (function() {
  return (sourceNode, targetNode, { sloppy = false } = {}) => {
    invariant(sourceNode, 'sourceElement must be defined')
    invariant(targetNode, 'targetElement must be defined')

    const external = sourceNode.ownerDocument !== targetNode.ownerDocument
    console.info(`--replaceNode-- external? ${external}`)

    let undos = []
    for(let iframe of Array.from(document.getElementsByTagName('iframe'))) {
      const oldDisplay = [ iframe.style.getPropertyValue('display'), targetNode.style.getPropertyPriority('display') ]
      iframe.style.setProperty('display', ...oldDisplay)
    }


    if(sloppy) {
      const startTime = performance.now()
      const oldHTML = targetNode.innerHTML
      targetNode.innerHTML = `${sourceNode.innerHTML}
      <div id="__restore__" style="display:none !important; width: 0 !important; height: 0 !important;">${oldHTML}</div>`
      const endTime = performance.now()
      console.info('ELAPSED (SLOPPY)', endTime - startTime)
      return function restoreSloppy() {
        const restoreHTML = document.getElementById('__restore__').innerHTML
        targetNode.innerHTML = restoreHTML
      }
    } else {

      const startTime = performance.now()
      const hideNodes = Array.from(targetNode.childNodes)
      const referenceNode = targetNode.childNodes[0]

      /*
      const oldHeight = [ targetNode.style.getPropertyValue('height'), targetNode.style.getPropertyPriority('height') ]
      const oldWidth = [ targetNode.style.getPropertyValue('width'), targetNode.style.getPropertyPriority('width') ]
      const oldDisplay = [ targetNode.style.getPropertyValue('display'), targetNode.style.getPropertyPriority('display') ]
      targetNode.style.setProperty('height', `${sourceNode.offsetHeight}px`, 'important')
      targetNode.style.setProperty('width', `${sourceNode.offsetWidth}px`, 'important')
      targetNode.style.setProperty('display', `inline-block`, 'important')

      undos.push(() => {
        targetNode.style.setProperty('height', ...oldHeight)
        targetNode.style.setProperty('width', ...oldWidth)
        targetNode.style.setProperty('display', ...oldDisplay)
      })
      */

      for(const node of sourceNode.childNodes) {
        if(node.nodeType !== Node.ELEMENT_NODE || node.nodeName === 'SCRIPT')
          continue
        const cloned = targetNode.insertBefore(external ? document.importNode(node, true) : node.cloneNode(true), referenceNode)
        undos.push(() => targetNode.removeChild(cloned))
      }

      const sourceStyle = sourceNode.getAttribute('style')
      const targetStyle = targetNode.getAttribute('style')
      targetNode.setAttribute('style', sourceStyle)
      if(sourceStyle || targetStyle)
        undos.push(() => targetNode.setAttribute('style', targetStyle))
      for(const node of hideNodes) {
        if(node.nodeType === Node.ELEMENT_NODE /*&& node.nodeName === 'IFRAME'*/) {
          const oldStyle = [ node.style.getPropertyValue('display'), node.style.getPropertyPriority('display') ]
          node.style.setProperty('display', 'none', 'important')
          undos.push(() => node.style.setProperty('display', ...oldStyle))
        }
          /*
        } else {
          const removed = targetNode.removeChild(node)
          undos.push(() => targetNode.appendChild(removed)) //setStyles(node, { display: 'none !important'}))
        }
        */
      }
      const endTime = performance.now()
      console.info('ELAPSED (NOT SLOPPY)', endTime - startTime)
      return function () {
        for(let undo of undos) {
          undo()
        }
      }
    }
  }
}())

export default replaceNode
