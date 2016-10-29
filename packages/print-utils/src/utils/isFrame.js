export default function isFrame() {
  try {
    return typeof window === 'object' && window.frameElement !== null
  } catch(err) {
    log.error(err, 'error detecting if in iframe, blocking...')
    return false
  }
}
