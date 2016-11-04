import sinon from 'sinon'

const domSpies = (stubs = {}) => ({ appendChild: sinon.spy(), removeChild: sinon.spy(), querySelector: sinon.spy(), querySelectorAll: sinon.stub().returns([]), ...stubs })

export const mockHead = (stubs) => {
  return { ...domSpies(stubs) }
}

export const mockBody = (stubs) => {
  return { ...domSpies(stubs) }
}

export const mockStyle = (styleMap = []) => {

  const getPropertyValue = sinon.stub()
  const getPropertyPriority = sinon.stub()
  const setProperty = sinon.spy()
  const removeProperty = sinon.spy()
  for(let [ key, value, priority ] of styleMap) {
    getPropertyValue.withArgs(key).returns(value)
    getPropertyPriority.withArgs(key).returns(priority)
  }
  return { getPropertyValue, getPropertyPriority, setProperty, removeProperty, _keys: styleMap.map(([ key ]) => key) }
}

export const mockElement = ({} = {}) => {
  const getAttribute = sinon.spy()
  const setAttribute = sinon.spy()
  const style = mockStyle()
  return { getAttribute, setAttribute, style, styleSheets: [] }
}

export const mockDocument = ({ head, body, ...stubs } = {}) => {
  const createElement = sinon.stub().returns(mockElement())
  return { ...domSpies({ createElement, ...stubs }), head, body }
}

export const mockWindow = ({ document, computedStyle = mockStyle() } = {}) => {
  const { _keys, ...fns } = computedStyle
  const _computedStyle = Object.defineProperties(_keys, { getPropertyValue: { value: computedStyle.getPropertyValue }, getPropertyPriority: { value: computedStyle.getPropertyPriority }, setProperty: { value: computedStyle.setProperty }, removeProperty: { value: computedStyle.removeProperty } })
  const getComputedStyle = sinon.stub().returns(_computedStyle)

  return { document, getComputedStyle, _computedStyle }
}
