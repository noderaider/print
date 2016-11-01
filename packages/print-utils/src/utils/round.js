import invariant from 'invariant'

export default function round (value, { digits = 2, down = false, up = false } = {}) {
  invariant(down === false || up === false, 'down and up cannot both be true')
  invariant(digits, 'digits must be non-zero')
  const place = Math.pow(10, digits)
  const fn = Math[up ? 'ceil' : (down ? 'floor' : 'round')]
  return fn(value * place) / place
}
