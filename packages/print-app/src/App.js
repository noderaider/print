import 'babel-polyfill'
import React, { Component } from 'react'
import LoremIpsum from './LoremIpsum'
import reactFocus from 'react-focus'
import { isFrame } from 'print-utils'
import logo from './logo.svg'
import './App.css'

const Focus = reactFocus(React)

class App extends Component {
  render() {
    if(isFrame()) {
      return <LoremIpsum sections={10} />
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
