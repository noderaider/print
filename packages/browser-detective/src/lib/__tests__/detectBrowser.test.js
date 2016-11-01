import { detectBrowser } from '../'

describe('name', () => {
  const chrome = detectBrowser('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36')
  const ie11 = detectBrowser('Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko')
  const ff = detectBrowser('Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0')
  const safari7 = detectBrowser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A')
  it('chrome should have name chrome', () => {
    expect(chrome.name).toBe('chrome')
  })
  it('firefox should have name firefox', () => {
    expect(ff.name).toBe('firefox')
  })
  it('ie11 should have name ie', () => {
    expect(ie11.name).toBe('ie')
  })
  it('safari7 should have name safari', () => {
    expect(safari7.name).toBe('safari')
  })
})

describe('engine', () => {
  const chrome = detectBrowser('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36')
  const ie11 = detectBrowser('Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko')
  const ff = detectBrowser('Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0')
  const safari7 = detectBrowser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A')
  it('chrome should have engine webkit', () => {
    expect(chrome.engine).toBe('webkit')
  })
  it('firefox should have engine gecko', () => {
    expect(ff.engine).toBe('gecko')
  })
  it('ie11 should have engine trident', () => {
    expect(ie11.engine).toBe('trident')
  })
  it('safari7 should have engine webkit', () => {
    expect(safari7.engine).toBe('webkit')
  })
})
