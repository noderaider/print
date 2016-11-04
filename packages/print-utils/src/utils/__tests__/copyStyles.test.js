import copyStyles from '../copyStyles'
import sinon from 'sinon'
import { mockWindow, mockDocument, mockElement, mockStyle, mockHead, mockBody } from './__fixtures__/dom'

describe('copyStyles', () => {
  it('should throw with no arguments', () => {
    expect(() => copyStyles()).toThrow()
  })
  it('should throw if source document has no head', () => {
    const source = mockElement({ window: mockWindow() })
    const target = mockElement()
    expect(() => copyStyles(source, target)).toThrow()
  })
  it('should throw if target document has no head', () => {
    const source = mockElement({ window: mockWindow() })
    const target = mockElement()
    expect(() => copyStyles(source, target)).toThrow()
  })
  it('should call getComputedStyle on window', () => {
    const _window = mockWindow()
    const source = mockElement()
    const target = mockElement()
    copyStyles(source, target, _window)
    expect(_window.getComputedStyle.called).toBe(true)
  })
  it('should return undo function for valid input', () => {
    const source = mockElement()
    const target = mockElement()
    expect(typeof copyStyles(source, target, mockWindow())).toBe('function')
  })
  it('should call setProperty on target style', () => {
    const source = mockElement()
    const target = mockElement()
    const computedStyle = mockStyle([ [ 'display', 'inline-block' ] ])
    copyStyles(source, target, mockWindow({ computedStyle }))
    expect(target.style.setProperty.calledWith('display', 'inline-block')).toBe(true)
  })
  it('should call setProperty on target style once', () => {
    const source = mockElement()
    const target = mockElement()
    const computedStyle = mockStyle([ [ 'display', 'inline-block' ] ])
    copyStyles(source, target, mockWindow({ computedStyle }))
    expect(target.style.setProperty.calledOnce).toBe(true)
  })
  it('should call setProperty on target style twice on undo', () => {
    const source = mockElement()
    const target = mockElement()
    const computedStyle = mockStyle([ [ 'display', 'inline-block' ] ])
    copyStyles(source, target, mockWindow({ computedStyle }))()
    expect(target.style.setProperty.calledTwice).toBe(true)
  })
})
