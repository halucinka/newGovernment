import ReactDOM from 'react-dom'
import React from 'react'
import Hello from './hello'
//import Hello from './barhello'

require('./style.css')

window.onload = () => {
  const app = document.getElementById('app')
  ReactDOM.render(React.createElement(Hello, null), app)
}
