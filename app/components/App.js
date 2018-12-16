import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'

import GeschaefteLayout from './GeschaefteLayout'
import FilterFieldsLayout from './FilterFieldsLayout'
import TableLayout from './TableLayout'
import Navbar from './Navbar'
import storeContext from '../storeContext'

const App = () => {
  const store = useContext(storeContext)
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
    '/geschaeftPdf',
  ].includes(pathname)
  const showFilterFieldsLayout = pathname === '/filterFields'
  const showTableLayout = pathname === '/table'

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
  store: PropTypes.object.isRequired,
}

export default observer(App)
