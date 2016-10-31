import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import GeschaefteLayout from './containers/GeschaefteLayout'
import FilterFieldsLayout from './containers/FilterFieldsLayout'
import TableLayout from './containers/TableLayout'
import Pages from './containers/Pages'
import GeschaeftPdf from './components/GeschaeftPdf'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GeschaefteLayout} />
    <Route path="/geschaefte" component={GeschaefteLayout} />
    <Route path="/filterFields" component={FilterFieldsLayout} />
    <Route path="/table" component={TableLayout} />
    <Route path="/pages" component={Pages} />
    <Route path="/geschaeftPdf" component={GeschaeftPdf} />
  </Route>
)
