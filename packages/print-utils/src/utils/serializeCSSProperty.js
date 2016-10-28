export default function serializeCSSProperty (prop) {
  if(typeof prop !== 'object' || !prop.value)
    throw new Error('serializeCSSProperty requires an object property with value and priority (optional) keys.')
  const { value, priority } = prop
  return priority ? `${value} !${priority}` : value
}
