import serializeCSSProperty from '../serializeCSSProperty'

describe('serializeCSSProperty', () => {
  it('throws for non-object', () => {
    expect(() => serializeCSSProperty('auto !important').toThrow())
  })
  it('throws for object with no value', () => {
    expect(() => serializeCSSProperty({ priority: 'important' }).toThrow())
  })
  it('gets correct value for string "auto"', () => {
    expect(serializeCSSProperty({ value: 'auto' })).toBe('auto')
  })
  it('gets correct value for string "auto !important"', () => {
    expect(serializeCSSProperty({ value: 'auto', priority: 'important' })).toBe('auto !important')
  })
  it('gets correct value for string "inline-block"', () => {
    expect(serializeCSSProperty({ value: 'inline-block' })).toBe('inline-block')
  })
  it('gets correct value for string "inline-block !important"', () => {
    expect(serializeCSSProperty({ value: 'inline-block', priority: 'important' })).toBe('inline-block !important')
  })
  it('gets correct value for string "1px solid black"', () => {
    expect(serializeCSSProperty({ value: '1px solid black', priority: '' })).toBe('1px solid black')
  })
  it('gets correct value for string "1px solid black !important"', () => {
    expect(serializeCSSProperty({ value: '1px solid black', priority: 'important' })).toBe('1px solid black !important')
  })
  it('gets correct value for string "scale(0.75)"', () => {
    expect(serializeCSSProperty({ value: 'scale(0.75)', priority: '' })).toBe('scale(0.75)')
  })
  it('gets correct value for string "scale(0.75) !important"', () => {
    expect(serializeCSSProperty({ value: 'scale(0.75)', priority: 'important' })).toBe('scale(0.75) !important')
  })
  it('gets correct value for string "0"', () => {
    expect(serializeCSSProperty({ value: '0', priority: '' })).toBe('0')
  })
  it('gets correct value for string "0 !important"', () => {
    expect(serializeCSSProperty({ value: '0', priority: 'important' })).toBe('0 !important')
  })
  it('gets correct value for string "100%"', () => {
    expect(serializeCSSProperty({ value: '100%', priority: '' })).toEqual('100%')
  })
  it('gets correct value for string "100% !important"', () => {
    expect(serializeCSSProperty({ value: '100%', priority: 'important' })).toEqual('100% !important')
  })
})
