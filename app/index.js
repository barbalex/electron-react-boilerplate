import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import app from 'ampersand-app'

import App from './components/App'

// loading store from separate file does not work for server rendering
// see: http://stackoverflow.com/questions/33643290/how-do-i-get-a-hold-of-the-store-dispatch-in-react-router-onenter
// but I need to fetch it from wrapComponentInProvider.js
import store from './store'
import './app.global.css'

app.extend({
  init() {
    this.store = store
  },
})
app.init()
// make store accessible in dev
window.app = app

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
