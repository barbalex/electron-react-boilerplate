import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import { AppContainer as HotLoaderContainer } from 'react-hot-loader'

import App from './components/App'
import { Provider as MobxProvider } from './storeContext'

// loading store from separate file does not work for server rendering
// see: http://stackoverflow.com/questions/33643290/how-do-i-get-a-hold-of-the-store-dispatch-in-react-router-onenter
// but I need to fetch it from wrapComponentInProvider.js
import store from './store'
import './app.global.css'

registerLocale('de', de)
setDefaultLocale('de')

// make store accessible in dev
window.store = store

render(
  <HotLoaderContainer>
    <MobxProvider value={store}>
      <Provider store={store}>
        <App />
      </Provider>
    </MobxProvider>
  </HotLoaderContainer>,
  document.getElementById('root'),
)
