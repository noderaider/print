import { assert } from 'chai'

const tridentRegex = /Trident\/(\d+)/i
const msieRegex = /MSIE (\d+)/i
const chromeRegex = /Chrome\/(\d+)/i
const firefoxRegex = /Firefox\/(\d+)/i
const safariRegex = /Safari\/(\d+)/i

const windowsRegex = /Windows (NT \d\.\d+|Windows 9[\d]|Windows 98; Win 9x 4\.90|Windows CE)/i

/** Trident represents the actual browser version. */
const tridentMap = new Map( [ ['8', 11]
                            , ['7', 11]
                            , ['6', 10]
                            , ['5', 9]
                            , ['4', 8]
                            ])

const windowsMap = new Map( [ [ 'NT 6.3', '8.1' ]
                            , [ 'NT 6.2', '8' ]
                            , [ 'NT 6.1', '7' ]
                            , [ 'NT 6.0', 'Vista' ]
                            , [ 'NT 5.2', 'Server 2003' ]
                            , [ 'NT 5.1', 'XP' ]
                            , [ 'NT 5.01', '2000 SP1' ]
                            , [ 'NT 5.0', '2000' ]
                            , [ 'NT 4.0', 'NT 4.0' ]
                            , [ '98; Win 9x 4.90', 'ME']
                            , [ '98', '98' ]
                            , [ '95', '95' ]
                            , [ 'CE', 'CE' ]
                            ] )

const findMatch = (regex, input) => {
  const result = regex.exec(input)
  if(result && result.length > 1)
    return result[1]
}

export const detectUserAgent = () => {
  assert(typeof window === 'object', 'user agent can only be detected in browser environment')
  assert.ok(window.navigator, 'window.navigator is required for user agent detection')
  assert.ok(window.navigator.userAgent, 'window.navigator is required for user agent detection')
  return window.navigator.userAgent
}

export const detectBrowser = (userAgent = detectUserAgent()) => {
  const trident = findMatch(tridentRegex, userAgent)
  const msie = findMatch(msieRegex, userAgent)
  const chrome = findMatch(chromeRegex, userAgent)
  const firefox = findMatch(firefoxRegex, userAgent)
  const safari = findMatch(safariRegex, userAgent)

  let name = null
  let title = null
  let version = null
  let emulatedVersion = null
  let platform = null
  let platformVersion = null

  if(trident || msie) {
    name = 'ie'
    title = 'Internet Explorer'
    version = trident ? tridentMap.get(trident) : msie
    emulatedVersion = msie || version

    let windowsPlatform = findMatch(windowsRegex, userAgent)
    if(windowsPlatform) {
      platform = 'Windows'
      platformVersion = windowsMap.get(windowsPlatform)
    }
  } else if(chrome) {
    name = 'chrome'
    title = 'Chrome'
    version = chrome
    emulatedVersion = chrome
  } else if(firefox) {
    name = 'firefox'
    title = 'Firefox'
    version = firefox
    emulatedVersion = firefox
  } else if(safari) {
    name = 'safari'
    title = 'Safari'
    version = safari
    emulatedVersion = safari
  }
  return { name, title, version, emulatedVersion, platform, platformVersion }
}
