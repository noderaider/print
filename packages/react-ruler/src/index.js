export default function reactRuler (React) {
  const { Component, PropTypes } = React

  return class Ruler extends Component {
    render() {
      const { orientation, segments, segmentLength, hide } = this.props
      const ruler = new Array(segments + 1).fill(0)
      return (
        <div>
          {ruler.map((x, i) => {
            const total = segmentLength * i
            return (
              <div
                key={i}
                style={
                  { position: 'absolute'
                  , display: 'inline'
                  , boxSizing: 'border-box'
                  , [orientation === 'horizontal' ? 'left' : 'top']: total
                  , [orientation === 'horizontal' ? 'top' : 'left']: 0
                  , [orientation === 'horizontal' ? 'height' : 'width']: total % 100 === 0 ? 25 : i % 2 === 0 ? 10 : 5
                  , [orientation === 'horizontal' ? 'width' : 'height']: 1
                  , [orientation === 'horizontal' ? 'borderLeft' : 'borderTop']: `1px solid ${hide ? 'transparent' : total % 100 === 0 ? 'red' : 'blue'}`
                  }
                }
              />
            )
          })}
        </div>
      )
    }
  }
}
