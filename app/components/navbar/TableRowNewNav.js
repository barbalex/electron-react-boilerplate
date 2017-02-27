import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

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

export default NavbarTableRowNeuNav
