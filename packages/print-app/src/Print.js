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

    this.setValue = (element, prop, key, value) => {
      let oldValue
      if(prop === 'style') {
        oldValue = element.style.getPropertyValue(key)
        element.style.setProperty(key, value)
      } else {
        console.info('SETTING PROP', prop, key)
        oldValue = element.getAttribute(prop)
        element.setAttribute(prop, key)
      }
      return oldValue
    }

    this.bubble = () => {
      const { bubbleWidth, bubbleHeight } = this.state
      const frameDocument = this.frame.contentDocument || this.frame.contentWindow.document
      if(bubbleWidth) {
        const frameWidth = frameDocument.body.offsetWidth
        console.info('bubbleWidth', frameWidth)
        if(frameWidth === 0)
          throw new Error('COULD NOT BUBBLE FRAME WIDTH (0)')
        const pxWidth = `${frameWidth}px`
        this.frame.style.width = pxWidth
        document.body.style.width = pxWidth
      }
      if(bubbleHeight) {
        const frameHeight = frameDocument.body.offsetHeight
        console.info('bubbleHeight', frameHeight)
        if(frameHeight === 0) {
          debugger
          throw new Error('COULD NOT BUBBLE FRAME HEIGHT (0)')
        }
        const pxHeight = `${frameHeight}px`
        this.frame.style.height = pxHeight
        document.body.style.height = pxHeight
      }
    }

    this.onFrameLoad = () => {
      this.bubble()
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
    const queryContainerProps = parseQuery('container-props')
    this.state = (
      { props: queryProps ? parseProps(queryProps) : []
      , containerProps: queryContainerProps ? parseProps(queryContainerProps) : []
      , hSegments: parseQuery('h-segments', parseInt, 20)
      , hSegmentLength: parseQuery('h-segment-length', parseInt, 25)
      , vSegments: parseQuery('v-segments', parseInt, 20)
      , vSegmentLength: parseQuery('v-segment-length', parseInt, 25)
      , hide: parseQuery('hide', parseBool, false)
      , showRulers: parseQuery('show-rulers', parseBool, false)
      , disableRulers: parseQuery('disable-rulers', parseBool, false)
      , bubbleWidth: parseQuery('bubble-width', parseBool, false)
      , bubbleHeight: parseQuery('bubble-height', parseBool, false)
      , bodyOverflow: parseQuery('body-overflow')
      }
    )
  }
  componentDidMount() {
    const { props, containerProps, bodyOverflow } = this.state

    if(bodyOverflow) {
      document.body.style.setProperty('overflow', bodyOverflow)
    }

    containerProps.filter((x) => (x.init)).forEach(({ prop, key, init, pre, post }) => {
      this.setValue(this.frame.parentNode, prop, key, init)
    })

    props.filter((x) => (x.init)).forEach(({ prop, key, init, pre, post }) => {
      this.setValue(this.frame, prop, key, init)
    })

    this.dispose = onPrint(
      { preprint: () => {
          containerProps.filter((x) => x.pre).forEach(({ prop, key, init, pre, post }) => {
            this.setValue(this.frame.parentNode, prop, key, pre)
          })
          props.filter((x) => x.pre).forEach(({ prop, key, init, pre, post }) => {
            this.setValue(this.frame, prop, key, pre)
          })
          this.bubble()
          this.frame.contentWindow.focus()
        }
      , postprint: () => {
          containerProps.filter((x) => x.post).forEach(({ prop, key, init, pre, post }) => {
            this.setValue(this.frame.parentNode, prop, key, post)
          })
          props.filter((x) => x.post).forEach(({ prop, key, init, pre, post }) => {
            this.setValue(this.frame, prop, key, post)
          })
          this.bubble()
        }
      }
    )
  }
  componentWillUnmount() {
    this.dispose()
  }
  render() {
    const { props, containerProps, hide, showRulers, disableRulers, bubbleWidth, bubbleHeight, bodyOverflow, ...rulerProps } = this.state


    return (
      <div style={{ position: 'relative' }}>
        {!disableRulers ? <Rulers {...rulerProps} hide={hide && !showRulers} /> : null}
        <div style={hide ? null : { paddingTop: 20, paddingLeft: 20, position: 'relative' }}>

          <div id="legend" style={{display: hide ? 'none' : 'block'}}>
            <h1>Print</h1>
            <div style={{ fontSize: '0.8rem', margin: 10, padding: 10 }}>
              <sup>Query string props:</sup>
              <pre style={{margin: 10}}>?props=style:width:100px:500px:200px/style:max-height::500px</pre>
              <sup style={{ margin: 10 }}>sets initial width to 100px, preprint width and max-height to 500px, and postprint width to 200px.</sup>
            </div>
            <hr />
            <div style={{ fontSize: '0.8rem', margin: 10, padding: 10 }}>
              <h3>Working Configurations</h3>
              <sup>Chrome</sup>
              <ul style={{listStyle: 'none'}}>
                <li>
                  <a href="http://localhost:3000/print?h-segments=1&h-segment-length=1107&v-segments=1&v-segment-length=13395&props=style:width:1107px/style:display:block/style:border:0/frameborder:0&hide=true&show-rulers=true&bubble-width=true&bubble-height=true&body-overflow=visible" target="_blank">
                    <pre>width &lt;= 1107px</pre>
                  </a>
                </li>
                <li>
                  <a href="/print?h-segments=1&h-segment-length=2074&v-segments=1&v-segment-length=10000&props=style:width:2074px/style:display:block/style:border:0/frameborder:0&hide=true&show-rulers=true&bubble-width=true&bubble-height=true&body-overflow=visible" target="_blank">
                    <pre>width &gt;= 2074px</pre>
                  </a>
                </li>
              </ul>
            </div>

            <ul style={{listStyle: 'none'}}>
              <li>h-segments: {rulerProps.hSegments || 'use query string to set'}</li>
              <li>h-segment-length: {rulerProps.hSegmentLength || 'use query string to set'}</li>
              <li>v-segments: {rulerProps.vSegments || 'use query string to set'}</li>
              <li>v-segment-length: {rulerProps.vSegmentLength || 'use query string to set'}</li>
              <li>hide: {hide.toString() || 'use query string to set'}</li>
              <li>show-rulers: {showRulers.toString() || 'use query string to set'}</li>
              <li>bubble-width: {bubbleWidth.toString() || 'use query string to set'}</li>
              <li>bubble-height: {bubbleHeight.toString() || 'use query string to set'}</li>
              <li>body-overflow: {bodyOverflow || 'use query string to set'}</li>
            </ul>

            {props.map(({ prop, key, init, pre, post }, i) => (
              <div key={i}>
                <hr />
                <h3>props</h3>
                <ul style={{ listStyle: 'none' }}>
                  <li><h4>{prop}: {key}</h4></li>
                  <li>{init || 'not set'} => {pre || 'not set'} => {post || 'not set'}</li>
                </ul>
              </div>
            ))}
            {containerProps.map(({ prop, key, init, pre, post }, i) => (
              <div key={i}>
                <hr />
                <h3>container-props</h3>
                <ul style={{ listStyle: 'none' }}>
                  <li><h4>{prop}: {key}</h4></li>
                  <li>{init || 'not set'} => {pre || 'not set'} => {post || 'not set'}</li>
                </ul>
              </div>
            ))}

            <hr />
          </div>

          <iframe src={`/?d=${now}`} ref={(x) => this.frame = x} onLoad={this.onFrameLoad} />
        </div>
      </div>
    )
  }
}
