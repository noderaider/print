import { usePrintFrame } from 'print-utils'
import cn from 'classnames'

function getDocument (frame) {
  if(!frame)
    return null
  if(!frame.contentDocument && !frame.contentWindow)
    return false
  return frame.contentDocument || frame.contentWindow.document
}

export default function reactFocus (React) {
  const { Component } = React
  return class Focus extends Component {
    constructor(props) {
      super(props)
      this.handleLoad = (...args) => {
        const { frameBodyClassName } = this.props
        const frameDocument = getDocument(this.frame)
        if(frameBodyClassName) {
          frameDocument.body.className =  cn(frameDocument.body.className, frameBodyClassName)
        }
      }
    }
    componentDidMount() {
      this.disposePrintFrame = usePrintFrame(this.frame)
    }
    componentWillUnmount() {
      this.disposePrintFrame()
    }
    render() {
      const { src, frameRef, frameClassName, frameBodyClassName, onFrameLoad, className, ...props } = this.props
      return (
        <iframe
          {...props}
          ref={(x: any): any => {
            this.frame=x
            if(frameRef)
              frameRef(x)
          }}
          onLoad={(...args: any): any => {
            this.handleLoad(...args)
            if(onFrameLoad)
              onFrameLoad(...args)
          }}
          className={cn(frameClassName)}
          src={src}
          scrolling="no"
          width="100%"
          height="100%"
          frameBorder="0"
          marginWidth="0"
          marginHeight="0"
          allowFullScreen
          allowTransparency
          seamless
        />
      )
    }
  }
}

