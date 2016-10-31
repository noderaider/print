import onPrint from './onPrint'
import * as strategies from './strategies'
import { detectBrowser } from 'browser-detective'

function round(num) {
  return Math.floor(num * 100) / 100
}
const scaleToWidth = 700
function getScale (width) {
  return round(scaleToWidth / width)
}
function descaleHeight (height, scaleFactor) {
  return height * scaleFactor
}

const browser = typeof window === 'object' ? detectBrowser() : {}
console.info('BROWSER DETECTED\n', JSON.stringify(browser, null, 2))

let defaultStrategy = 'containerStrategy'
if(browser.name === 'chrome') {
  defaultStrategy = 'frameStrategy'
} else if (browser.name === 'firefox') {
  //defaultStrategy = 'frameStrategy'
} else if (browser.name === 'safari') {

} else if (browser.name === 'ie') {
  //defaultStrategy = 'frameStrategy'
}

export default function usePrintFrame( frame
, { strategy = defaultStrategy
  , ...opts
  } = {}
) {
  if(typeof window !== 'object')
    return
  if(!frame)
    throw new Error('usePrintFrame must be provided the frame element.')

  console.info('USING STRATEGY', strategy)
  const useStrategy = strategies[strategy]
  if(!useStrategy)
    throw new Error(`Unknown strategy '${strategy}'!`)

  const { preprint, postprint, dispose } = useStrategy(frame, opts)
  onPrint({ preprint, postprint })
  return dispose
}

