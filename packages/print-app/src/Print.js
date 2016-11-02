import React from 'react'
import { onPrint } from 'print-utils'
import LoremIpsum from './LoremIpsum'
import reactRuler from 'react-ruler'
const Ruler = reactRuler(React)
const { Component } = React

function parseQuery(key, transform, defaultValue) {
  try {
    const regex = new RegExp(`${key}=([^&|$]*)`)
    const [ match, value ] = regex.exec(window.location.search) || []
    return (transform ? transform(value) : value) || defaultValue
  } catch(err) {
    return defaultValue
  }

}

const now = Date.now()

class Rulers extends Component {
  render() {
    const { hSegments, hSegmentLength, vSegments, vSegmentLength, ...props } = this.props

    const hRuler = new Array(hSegments + 1).fill(0)
    const vRuler = new Array(vSegments + 1).fill(0)

    return (
      <div>
        <Ruler {...props} orientation="horizontal" segments={hSegments} segmentLength={hSegmentLength} />
        <Ruler {...props} orientation="vertical" segments={vSegments} segmentLength={vSegmentLength} />
      </div>
    )
  }
}

export default class Print extends Component {
  constructor(props) {
    super(props)

    this.setValue = (prop, key, value) => {
      let oldValue
      if(prop === 'style') {
        oldValue = this.frame.style.getPropertyValue(key)
        this.frame.style.setProperty(key, value)
      } else {
        console.info('SETTING PROP', prop, key)
        oldValue = this.frame.getAttribute(prop)
        this.frame.setAttribute(prop, key)
      }
      return oldValue
    }
    const parseBool = (value) => value && value.toLowerCase() !== 'false' && value !== '0'
    function parseProps (str) {

      const defs = str.split('/')
      console.info('PARSEPROPS', str, '\n', defs)
      return defs.map((def) => {
        let [ prop, key, init, pre, post ] = def.split(':')
        if(props !== 'style') {
          post = pre
          pre = init
          init = key
        }
        return { prop, key, init, pre, post }
      })
    }
    const queryProps = parseQuery('props')
    this.state = (
      { props: queryProps ? parseProps(queryProps) : []
      , hSegments: parseQuery('h-segments', parseInt, 20)
      , hSegmentLength: parseQuery('h-segment-length', parseInt, 25)
      , vSegments: parseQuery('v-segments', parseInt, 20)
      , vSegmentLength: parseQuery('v-segment-length', parseInt, 25)
      , hide: parseQuery('hide', parseBool, false)
      , showRulers: parseQuery('show-rulers', parseBool, false)
      }
    )
  }
  componentDidMount() {
    const { props } = this.state

    props.filter((x) => (x.init)).forEach(({ prop, key, init, pre, post }) => {
      this.setValue(prop, key, init)
    })

    this.dispose = onPrint(
      { preprint: () => {
          props.filter((x) => x.pre).forEach(({ prop, key, init, pre, post }) => {
            this.setValue(prop, key, pre)
          })
          document.body.style.width = `${this.frame.offsetWidth}px`
          document.body.style.height = `${this.frame.offsetHeight}px`
          this.frame.contentWindow.focus()
        }
      , postprint: () => {
          props.filter((x) => x.post).forEach(({ prop, key, init, pre, post }) => {
            this.setValue(prop, key, post)
          })
        }
      }
    )
  }
  componentWillUnmount() {
    this.dispose()
  }
  render() {
    const { props, hide, showRulers, ...rulerProps } = this.state


    return (
      <div style={{ position: 'relative' }}>
        <Rulers {...rulerProps} hide={hide && !showRulers} />
        <div style={hide ? null : { paddingTop: 20, paddingLeft: 20, position: 'relative' }}>

          <div id="legend" style={{display: hide ? 'none' : 'block'}}>
            <h1>Print</h1>
            <div style={{ fontSize: '0.8rem', margin: 10, padding: 10 }}>
              <sup>Query string props:</sup>
              <pre style={{margin: 10}}>?props=style:width:100px:500px:200px/style:max-height::500px</pre>
              <sup style={{ margin: 10 }}>sets initial width to 100px, preprint width and max-height to 500px, and postprint width to 200px.</sup>
            </div>
            <hr />

            <ul style={{ listStyle: 'none' }}>
              <li>h-segments: {rulerProps.hSegments || 'use query string to set'}</li>
              <li>h-segment-length: {rulerProps.hSegmentLength || 'use query string to set'}</li>
              <li>v-segments: {rulerProps.vSegments || 'use query string to set'}</li>
              <li>v-segment-length: {rulerProps.vSegmentLength || 'use query string to set'}</li>
              <li>hide: {hide || 'use query string to set'}</li>
              <li>show-rulers: {showRulers || 'use query string to set'}</li>
            </ul>

            {props.map(({ prop, key, init, pre, post }, i) => (
              <div key={i}>
                <hr />
                <ul style={{ listStyle: 'none' }}>
                  <li><h4>{prop}: {key}</h4></li>
                  <li>{init || 'not set'} => {pre || 'not set'} => {post || 'not set'}</li>
                </ul>
              </div>
            ))}

            <hr />
          </div>

          <iframe src={`/?d=${now}`} ref={(x) => this.frame = x} />
        </div>
      </div>
    )
  }
}
