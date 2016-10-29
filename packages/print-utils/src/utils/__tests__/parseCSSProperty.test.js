import parseCSSProperty from '../parseCSSProperty'

describe('parseCSSProperty', () => {
  it('throws for non string', () => {
    expect(() => parseCSSProperty({})).toThrow()
  })
  it('throws for no property input', () => {
    expect(() => parseCSSProperty(' !important')).toThrow()
  })
  it('gets correct value for string "auto"', () => {
    expect(parseCSSProperty('auto')).toEqual({ value: 'auto', priority: '' })
  })
  it('gets correct value for string "auto !important"', () => {
    expect(parseCSSProperty('auto !important')).toEqual({ value: 'auto', priority: 'important' })
  })
  it('gets correct value for string "inline-block"', () => {
    expect(parseCSSProperty('inline-block')).toEqual({ value: 'inline-block', priority: '' })
  })
  it('gets correct value for string "inline-block !important"', () => {
    expect(parseCSSProperty('inline-block !important')).toEqual({ value: 'inline-block', priority: 'important' })
  })
  it('gets correct value for string "1px solid black"', () => {
    expect(parseCSSProperty('1px solid black')).toEqual({ value: '1px solid black', priority: '' })
  })
  it('gets correct value for string "1px solid black !important"', () => {
    expect(parseCSSProperty('1px solid black !important')).toEqual({ value: '1px solid black', priority: 'important' })
  })
  it('gets correct value for string "scale(0.75)"', () => {
    expect(parseCSSProperty('scale(0.75)')).toEqual({ value: 'scale(0.75)', priority: '' })
  })
  it('gets correct value for string "scale(0.75) !important"', () => {
    expect(parseCSSProperty('scale(0.75) !important')).toEqual({ value: 'scale(0.75)', priority: 'important' })
  })
  it('gets correct value for string "0"', () => {
    expect(parseCSSProperty('0')).toEqual({ value: '0', priority: '' })
  })
  it('gets correct value for string "0 !important"', () => {
    expect(parseCSSProperty('0 !important')).toEqual({ value: '0', priority: 'important' })
  })
  it('gets correct value for string "100%"', () => {
    expect(parseCSSProperty('100%')).toEqual({ value: '100%', priority: '' })
  })
  it('gets correct value for string "100% !important"', () => {
    expect(parseCSSProperty('100% !important')).toEqual({ value: '100%', priority: 'important' })
  })
})
