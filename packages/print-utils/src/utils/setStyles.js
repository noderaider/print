import serializeCSSProperty from './serializeCSSProperty'
import parseCSSProperty from './parseCSSProperty'

export default function setStyles (element, styles) {
  const prevStyles = Object.entries(styles).reduce((prev, [ key, next ]) => {
    if(!element.style) {
      console.warn('element has no style', element)
      return prev
    }

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
