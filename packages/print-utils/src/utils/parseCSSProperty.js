const stripper = /^ *([0-9a-z\-\.()% ]*[0-9a-z\-\.()%])[ !]*([a-z]+)?/

export default function parseCSSProperty(raw) {
  if(typeof raw !== 'string')
    throw new Error('parseCSSProperty expects a string CSS value input.')

  const [ match, value, priority = '' ] = stripper.exec(raw) || []
  if(!value)
    throw new Error(`parseCSSProperty could not parse a property value from '${raw}'`)
  return { value, priority }
}
