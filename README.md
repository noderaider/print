# [noderaider/print](https://github.com/noderaider/print)

**Cross Browser IFrame Printing**

[![Build Status](https://travis-ci.org/noderaider/print.svg?branch=master)](https://travis-ci.org/noderaider/print)
[![codecov](https://codecov.io/gh/noderaider/print/branch/master/graph/badge.svg)](https://codecov.io/gh/noderaider/print)


## Whats this?

If you've tried to print iframes using the built-in browser print functionality, you've probably found it's near impossible. Not anymore!

## Standalone

`npm i -S print-utils`

**Usage:**

```js
import { usePrintFrame } from 'print-utils'

/** Start cross browser print frame */
const disposePrintFrame = usePrintFrame(document.getElementById('print-frame'))

/** Stop using print frame */
disposePrintFrame()
```

## React

`npm i -S react-focus`

**Usage:**

```js
import React, { Component } from 'react'
import reactFocus from 'react-focus'

/** Create Focus Component */
const Focus = reactFocus(React)

/**
 * Use the component within your application just like an iframe
 * it will automatically be printable across all major browsers (IE10+)
 */
export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to react-focus</h2>
        </div>
        <div>
          <Focus src={`?d=${Date.now()}`} />
        </div>
      </div>
    )
  }
}
```
