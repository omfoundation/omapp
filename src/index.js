import registerServiceWorker from './registerServiceWorker'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import 'semantic-ui-css/semantic.min.css'

import App from './App.react'

ReactDOM.render(<App />, document.getElementById('app')
)

registerServiceWorker()