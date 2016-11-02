# [react-focus](https://npmjs.com/package/react-focus)

**Perfect iframe printing with React.**

[![NPM](https://nodei.co/npm/react-focus.png?stars=true&downloads=true)](https://nodei.co/npm/react-focus/)

## Install

`npm i -S react-focus@latest`

```js
import reactFocus from 'react-focus'
const Focus = reactFocus(React)

// Use Focus element instead of iframe, it will print perfectly across multiple pages on all major browsers.
export default props => <Focus src="/cats" />
```
