# [react-ruler](https://npmjs.com/package/react-ruler)

**Measure stuff with React.**

[![NPM](https://nodei.co/npm/react-ruler.png?stars=true&downloads=true)](https://nodei.co/npm/react-ruler/)

## Install

`npm i -S react-ruler@latest`

```js
import reactRuler from 'react-ruler'
const Ruler = reactRuler(React)

// Ruler with 20 segments, each segment being 50 px wide, oriented horizontally.
export default props => <Ruler orientation="horizontal" segments={20} segmentLength={50} />

// Ruler with 10 segments, each segment being 20 px wide, oriented vertically.
export default props => <Ruler orientation="vertical" segments={10} segmentLength={20} />
```
