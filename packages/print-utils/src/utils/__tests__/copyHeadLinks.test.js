import copyHeadLinks from '../copyHeadLinks'
import sinon from 'sinon'
import { mockDocument, mockElement, mockHead, mockBody } from './__fixtures__/dom'

describe('copyHeadLinks', () => {
  it('should throw with no arguments', () => {
    expect(() => copyHeadLinks()).toThrow()
  })


  it('should throw if source document has no head', () => {
    const source = mockDocument({ body: mockBody() })
    const target = mockDocument({ head: mockHead(), body: mockBody() })
    expect(() => copyHeadLinks(source, target)).toThrow()
  })
  it('should throw if target document has no head', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody() })
    const target = mockDocument({ body: mockBody() })
    expect(() => copyHeadLinks(source, target)).toThrow()
  })
  it('should return undo function for valid input', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody() })
    const target = mockDocument({ head: mockHead(), body: mockBody() })
    expect(typeof copyHeadLinks(source, target)).toBe('function')
  })
  it('should alter target head for valid input', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody(), querySelectorAll: sinon.stub().returns([ mockElement() ])  })
    const head = mockHead()
    const target = mockDocument({ head, body: mockBody() })
    copyHeadLinks(source, target)
    expect(head.appendChild.called).toBe(true)
  })
  it('should not remove from head until undo is called', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody(), querySelectorAll: sinon.stub().returns([ mockElement() ])  })
    const head = mockHead()
    const target = mockDocument({ head, body: mockBody() })
    copyHeadLinks(source, target)
    expect(head.removeChild.called).toBe(false)
  })
  it('should call removeChild of target head when undo is called', () => {
    const source = mockDocument({ head: mockHead(), body: mockBody(), querySelectorAll: sinon.stub().returns([ mockElement() ])  })
    const head = mockHead()
    const target = mockDocument({ head, body: mockBody() })
    copyHeadLinks(source, target)()
    expect(head.removeChild.called).toBe(true)
  })
})
