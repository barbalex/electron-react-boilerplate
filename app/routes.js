import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import GeschaefteLayout from './components/GeschaefteLayout'
import FilterFieldsLayout from './components/FilterFieldsLayout'
import TableLayout from './components/TableLayout'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GeschaefteLayout} />
    <Route path="/geschaefte" component={GeschaefteLayout} />
    <Route path="/filterFields" component={FilterFieldsLayout} />
    <Route path="/table" component={TableLayout} />
    <Route path="/pages" component={GeschaefteLayout} />
    <Route path="/geschaeftPdf" component={GeschaefteLayout} />
  </Route>
)
