export default function isFrame() {
  try {
    return typeof window === 'object' && window.frameElement !== null
  } catch(err) {
    console.error(err, 'error detecting if in iframe, blocking...')
    return false
  }
}
