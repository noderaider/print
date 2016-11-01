import getScale from '../getScale'
import round from '../round'

describe('getScale', () => {
  const smallWidth = 600
  const mediumWidth = 750
  const largeWidth = 925

  it('should return a number for large width with small width', () => {
    expect(typeof getScale(largeWidth, smallWidth)).toBe('number')
  })
  it('should return a number for small width with large width', () => {
    expect(typeof getScale(smallWidth, largeWidth)).toBe('number')
  })
  it('should return fraction for small width with large width', () => {
    expect(round(getScale(smallWidth, largeWidth), { down: true })).toBe(0.64)
  })
  it('should return fraction for large width with small width', () => {
    expect(round(getScale(largeWidth, smallWidth), { down: true })).toBe(1.54)
  })
})


