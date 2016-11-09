import invariant from 'invariant'

export default function copyStyles (sourceElement, targetElement, window = global) {
  invariant(sourceElement, 'sourceElement is required')
  invariant(targetElement, 'targetElement is required')
  const sourceStyles = window.getComputedStyle(sourceElement)
  const undos = []
  const sourceStyle = sourceElement.getAttribute('style')
  const targetStyle = targetElement.getAttribute('style')

  targetElement.setAttribute('style', sourceStyle)
  return function undoStyles () {
    targetElement.setAttribute('style', targetStyle)
  }
  /*
  const styleMap = Array.from(sourceStyles)
    .map((name) => [ name, sourceStyles.getPropertyValue(name), sourceStyles.getPropertyPriority(name) ])
    .filter(([ name, value ]) => typeof value === 'string' && value.length > 0 && value !== 'normal')
    .reduce((targetStyle, [ name, value, priority ]) => {
      const prevStyle = [ targetElement.style.getPropertyValue(name), targetElement.style.getPropertyPriority(name) ]
      undos.push(() => {
        console.info('ROLLING BACK STYLE', name, ...prevStyle)
        targetElement.style.setProperty(name, ...prevStyle)
      })
      targetStyle.setProperty(name, value, priority)
      return targetStyle
    }, targetElement.style)
  return () => {
    for(let undo of undos) {
      undo()
    }
  }
  */
}
