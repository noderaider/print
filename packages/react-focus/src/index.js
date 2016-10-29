import { usePrintFrame } from 'print-utils'

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
      const { url, ...props } = this.props
      return (
        <iframe
          {...props}
          ref={(x: any): any => this.frame=x}
          onLoad={(...args: any): any => this.handleLoad(...args)}
          src={url}
          width="100%"
          frameBorder="0"
          allowFullScreen
          allowTransparency
          seamless
        />
      )
    }
  }
}

