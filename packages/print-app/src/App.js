import 'babel-polyfill'
import React, { Component } from 'react'
import LoremIpsum from './LoremIpsum'
import Event from './Event'
import reactFocus from 'react-focus'
import { isFrame } from 'print-utils'
import logo from './logo.svg'
import './App.css'

const Focus = reactFocus(React)

class App extends Component {
  render() {
    if(typeof window !== 'object')
      return null
    if(isFrame())
      return <LoremIpsum sections={10} />

    const { pathname, search } = window.location

    if(/event/.test(pathname)) {
      return <Event />
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to react-focus</h2>
        </div>
        <div>
          <Focus src={`?d=${Date.now()}`} />
        </div>
      </div>
    );
  }
}

export default App;
