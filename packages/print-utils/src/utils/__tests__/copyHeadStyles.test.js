import copyHeadStyles from '../copyHeadStyles'
import sinon from 'sinon'
import { mockDocument, mockElement, mockHead, mockBody } from './__fixtures__/dom'

describe('copyHeadStyles', () => {
  it('should throw with no arguments', () => {
    expect(() => copyHeadStyles()).toThrow()
  })

  it('should throw if source document has no head', () => {
    const source = mockDocument({ body: mockBody() })
    const target = mockDocument({ head: mockHead(), body: mockBody() })
    expect(() => copyHeadStyles(source, target)).toThrow()
  })
  it('should throw if target document has no head', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody() })
    const target = mockDocument({ body: mockBody() })
    expect(() => copyHeadStyles(source, target)).toThrow()
  })
  it('should return undo function for valid input', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody() })
    const target = mockDocument({ head: mockHead(), body: mockBody() })
    expect(typeof copyHeadStyles(source, target)).toBe('function')
  })
  it('should alter target head for valid input', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody(), querySelectorAll: sinon.stub().returns([ mockElement() ])  })
    const head = mockHead()
    const target = mockDocument({ head, body: mockBody() })
    copyHeadStyles(source, target)
    expect(head.appendChild.called).toBe(true)
  })
  it('should not remove from head until undo is called', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody(), querySelectorAll: sinon.stub().returns([ mockElement() ])  })
    const head = mockHead()
    const target = mockDocument({ head, body: mockBody() })
    copyHeadStyles(source, target)
    expect(head.removeChild.called).toBe(false)
  })
  it('should call removeChild of target head when undo is called', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody(), querySelectorAll: sinon.stub().returns([ mockElement() ])  })
    const head = mockHead()
    const target = mockDocument({ head, body: mockBody() })
    copyHeadStyles(source, target)()
    expect(head.removeChild.called).toBe(true)
  })
})
