import invariant from 'invariant'

export default function copyStyles (sourceElement, targetElement, window = global) {
  invariant(sourceElement, 'sourceElement is required')
  invariant(targetElement, 'targetElement is required')
  const styles = window.getComputedStyle(sourceElement)
  const oldStyles = new Map()
  const styleMap = Array.from(styles)
    .filter((x) => {
      const value = styles.getPropertyValue(x)
      return typeof value === 'string' && value.length > 0 && value !== 'normal'
    })
    .map((x) => [ x, styles.getPropertyValue(x) ])
    .reduce((style, [ name, value ]) => {
      oldStyles.set(name, style.getPropertyValue(name))
      style.setProperty(name, value)
      return style
    }, targetElement.style)
  return () => Object.entries(oldStyles).forEach(([ name, value ]) => {
    targetElement.style.setProperty(name, value)
  })
}
