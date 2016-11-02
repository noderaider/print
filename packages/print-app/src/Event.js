import React from 'react'
import LoremIpsum from './LoremIpsum'
import { onPrint } from 'print-utils'
const { Component } = React

function parseQuery(key) {
  const regex = new RegExp(`${key}=([^&|$]*)`)
  const [ match, value ] = regex.exec(window.location.search) || []
  return value
}

const now = Date.now()

export default class Event extends Component {
  constructor(props) {
    super(props)

    this.setValue = (value) => {
      const { prop, key } = this.state
      let oldValue
      if(prop === 'style') {
        oldValue = this.frame.style.getPropertyValue(key)
        this.frame.style.setProperty(key, value)
      } else {
        oldValue = this.frame[prop][key]
        this.frame[prop][key] = value
      }
      return oldValue
    }
    this.state = (
      { prop: parseQuery('prop') || 'style'
      , key: parseQuery('key')
      , init: parseQuery('init')
      , pre: parseQuery('pre')
      , post: parseQuery('post')
      , segments: parseQuery('segments') || 20
      , segmentLength: parseQuery('segment-length') || 25
      }
    )
  }
  componentDidMount() {
    const { prop, key, init, pre, post } = this.state
    if(init)
      this.setValue(init)
    this.dispose = onPrint(
      { preprint: () => {
          if(pre)
            this.setValue(pre)
        }
      , postprint: () => {
          if(post)
            this.setValue(post)
        }
      }
    )
  }
  componentWillUnmount() {
    this.dispose()
  }
  render() {
    const { prop, key, init, pre, post, segments, segmentLength } = this.state



    const ruler = new Array(segments).fill(0)

    return (
      <div>
        {ruler.map((x, i) => {
          return (
            <div
              key={i}
              style={
                { position: 'absolute'
                , display: 'inline-block'
                , left: segmentLength * i
                , top: 0
                , height: i % 4 === 0 ? 20 : i % 2 === 0 ? 10 : 5
                , borderLeft: '1px solid blue'
                }
              }
            />
          )
        })}
        <div style={{ paddingTop: 20 }}>
          <h1>Event Test</h1>
        </div>

        <hr />

        <ul>
          <li>prop: {prop || 'use query string to set'}</li>
          <li>key: {key || 'use query string to set'}</li>
          <li>init: {init || 'use query string to set'}</li>
          <li>pre: {pre || 'use query string to set'}</li>
          <li>post: {post || 'use query string to set'}</li>
          <li>segments: {segments || 'use query string to set'}</li>
          <li>segment-length: {segmentLength || 'use query string to set'}</li>
        </ul>


        <iframe src={`/?d=${now}`} ref={(x) => this.frame = x} />

      </div>
    )
  }
}
