import replaceNode from '../replaceNode'

describe('replaceNode', () => {
  it('should throw for no source element', () => {
    expect(() => replaceNode(undefined, { innerHTML: '' })).toThrow()
  })
  it('should throw for no target element', () => {
    expect(() => replaceNode({ innerHTML: '' }, undefined)).toThrow()
  })
  it('should remove the old HTML and replace with the new HTML', () => {
    const source = { innerHTML: '<div id="root">THIS IS SOURCE ROOT</div>' }
    const target = { innerHTML: '<div id="root">THIS IS TARGET ROOT</div>' }
    replaceNode(source, target)
    expect(target.innerHTML).toBe(source.innerHTML)
  })
  it('should return an undo function', () => {
    const source = { innerHTML: '<div id="root">THIS IS SOURCE ROOT</div>' }
    const target = { innerHTML: '<div id="root">THIS IS TARGET ROOT</div>' }
    replaceNode(source, target)
    expect(target.innerHTML).toBe(source.innerHTML)
  })
  it('should return an undo function', () => {
    const source = { innerHTML: '<div id="root">THIS IS SOURCE ROOT</div>' }
    const target = { innerHTML: '<div id="root">THIS IS TARGET ROOT</div>' }
    expect(typeof replaceNode(source, target)).toBe('function')
  })
  it('should set the source HTML back after executing undo function', () => {
    const source = { innerHTML: '<div id="root">THIS IS SOURCE ROOT</div>' }
    const target = { innerHTML: '<div id="root">THIS IS TARGET ROOT</div>' }
    const pre = source.innerHTML
    replaceNode(source, target)()
    const post = source.innerHTML
    expect(pre).toBe(post)
  })
})
