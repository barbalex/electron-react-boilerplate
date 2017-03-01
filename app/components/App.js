import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import GeschaefteLayout from '../components/GeschaefteLayout'
import FilterFieldsLayout from '../components/FilterFieldsLayout'
import TableLayout from '../components/TableLayout'
import Navbar from '../components/navbar/Navbar'

const enhance = compose(
  inject('store'),
  observer
)

const App = ({ store }) => {
  // setting ref according to this:
  // http://stackoverflow.com/questions/35918706/overcoming-lack-of-refs-in-stateless-components
  let app  // eslint-disable-line no-unused-vars
  const setRef = (passedApp) => {
    app = passedApp
  }
  const { pathname } = store.history.location
  const showGeschaefteLayout = ['/geschaefte', '/pages', '/geschaeftPdf'].includes(pathname)
  const showFilterFieldsLayout = pathname === '/filterFields'
  const showTableLayout = pathname === '/table'
  return (
    <div ref={setRef}>
      <Navbar />
      {
        showGeschaefteLayout &&
        <GeschaefteLayout />
      }
      {
        showFilterFieldsLayout &&
        <FilterFieldsLayout />
      }
      {
        showTableLayout &&
        <TableLayout />
      }
    </div>
  )
}
App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(App)
