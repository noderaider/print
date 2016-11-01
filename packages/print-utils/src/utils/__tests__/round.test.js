import round from '../round'

describe('round', () => {
  it('should round to nearest (default) hundredth (default)', () => {
    expect(round(1.86934)).toBe(1.87)
  })
  it('should round down to nearest hundredth (default)', () => {
    expect(round(1.86934, { down: true })).toBe(1.86)
  })
  it('should round up to nearest hundredth (default)', () => {
    expect(round(1.86334, { up: true })).toBe(1.87)
  })
  it('should round down to nearest ten thousandth', () => {
    expect(round(1.86936, { digits: 4, down: true })).toBe(1.8693)
  })
  it('should throw on 0 digits', () => {
    expect(() => round(1.86936, { digits: 0 })).toThrow()
  })
})
