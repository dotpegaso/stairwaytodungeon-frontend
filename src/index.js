import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './globalStyles'
import Routes from './router'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
)
