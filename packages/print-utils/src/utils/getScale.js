function roundDown(num) {
  return Math.floor(num * 100) / 100
}

export default function getScale (outerWidth, innerWidth, { maximum = 1 } = {}) {
  const rawScale = outerWidth / innerWidth
  return rawScale
  return rawScale > maximum ? maximum : rawScale
}

function descaleHeight (height, scaleFactor) {
  return height * scaleFactor
}
