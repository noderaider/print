import onPrint from './onPrint'
import * as engines from './engines'
import { detectBrowser } from 'browser-detective'

const browser = typeof window === 'object' ? detectBrowser() : {}
console.info('BROWSER DETECTED\n', JSON.stringify(browser, null, 2))

const defaultEngine = browser.engine || 'webkit'

export default function usePrintFrame( frame
, { engine = defaultEngine
  , ...opts
  } = {}
) {
  if(typeof window !== 'object')
    return
  if(!frame)
    throw new Error('usePrintFrame must be provided the frame element.')
  let frameID = frame.getAttribute('id')
  if(!frameID) {
    frameID = 'content-frame'
    frame.setAttribute('id', frameID)
  }


  console.info('--engine--', engine)
  const useEngine = engines[engine]
  if(!useEngine)
    throw new Error(`Unknown engine '${engine}'!`)

  const { preprint, postprint, dispose } = useEngine(frame, opts)
  onPrint({ preprint, postprint })
  return dispose
}

