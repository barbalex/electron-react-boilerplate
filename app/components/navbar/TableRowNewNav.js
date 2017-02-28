import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const { tableRowNewCreate } = store
    const { table } = store.table
    return { table, tableRowNewCreate }
  }),
  observer
)

const NavbarTableRowNeuNav = ({
  tableRowNewCreate,
  table,
}) =>
  <NavItem
    onClick={() =>
      tableRowNewCreate(table)
    }
    title="neuer Datensatz"
  >
    <Glyphicon glyph="plus" />
  </NavItem>

NavbarTableRowNeuNav.displayName = 'NavbarTableRowNeuNav'

NavbarTableRowNeuNav.propTypes = {
  table: PropTypes.string.isRequired,
  tableRowNewCreate: PropTypes.func.isRequired,
}

export default enhance(NavbarTableRowNeuNav)
