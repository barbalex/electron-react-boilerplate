import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import GeschaefteLayout from './GeschaefteLayout'
import FilterFieldsLayout from './FilterFieldsLayout'
import TableLayout from './TableLayout'
import Navbar from './Navbar'

const enhance = compose(
  inject('store'),
  observer
)

const App = ({ store }) => {
  // setting ref according to this:
  // http://stackoverflow.com/questions/35918706/overcoming-lack-of-refs-in-stateless-components
  let app // eslint-disable-line no-unused-vars
  const setRef = passedApp => {
    app = passedApp
  }
  const { pathname } = store.history.location
  const showGeschaefteLayout = [
    '/geschaefte',
    '/pages',
    '/geschaeftPdf'
  ].includes(pathname)
  const showFilterFieldsLayout = pathname === '/filterFields'
  const showTableLayout = pathname === '/table'
  console.log('App rendering', {
    showGeschaefteLayout,
    showFilterFieldsLayout,
    showTableLayout
  })

  return (
    <div ref={setRef}>
      <Navbar />
      {showGeschaefteLayout && <GeschaefteLayout />}
      {showFilterFieldsLayout && <FilterFieldsLayout />}
      {showTableLayout && <TableLayout />}
    </div>
  )
}
App.propTypes = {
  store: PropTypes.object.isRequired
}

export default enhance(App)
