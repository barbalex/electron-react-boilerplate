import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import app from 'ampersand-app'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'

import App from './components/App'
import { Provider as MobxProvider } from './mobxStoreContext'

// loading store from separate file does not work for server rendering
// see: http://stackoverflow.com/questions/33643290/how-do-i-get-a-hold-of-the-store-dispatch-in-react-router-onenter
// but I need to fetch it from wrapComponentInProvider.js
import store from './store'
import './app.global.css'

registerLocale('de', de)
setDefaultLocale('de')

app.extend({
  init() {
    this.store = store
  },
})
app.init()

// make store accessible in dev
window.app = app

render(
  <MobxProvider value={store}>
    <Provider store={store}>
      <App />
    </Provider>
  </MobxProvider>,
  document.getElementById('root'),
)
