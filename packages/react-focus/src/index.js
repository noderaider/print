import { usePrintFrame } from 'print-utils'
import cn from 'classnames'

export default function reactFocus (React) {
  const { Component } = React
  return class Focus extends Component {
    constructor(props) {
      super(props)
      this.handleLoad = (...args) => {
      }
    }
    componentDidMount() {
      this.disposePrintFrame = usePrintFrame(this.frame)
    }
    componentWillUnmount() {
      this.disposePrintFrame()
    }
    render() {
      const { className, style, url, ...props } = this.props
      return (
        <div className={cn('react-focus', className)} style={style}>
          <iframe
            {...props}
            ref={(x: any): any => this.frame=x}
            onLoad={(...args: any): any => this.handleLoad(...args)}
            src={url}
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
        </div>
      )
    }
  }
}

