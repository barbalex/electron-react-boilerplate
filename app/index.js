import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
// loading store from separate file does not work for server rendering
// see: http://stackoverflow.com/questions/33643290/how-do-i-get-a-hold-of-the-store-dispatch-in-react-router-onenter
// but I need to fetch it from wrapComponentInProvider.js
import store from './store'
import './app.global.css'

const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store)
}
