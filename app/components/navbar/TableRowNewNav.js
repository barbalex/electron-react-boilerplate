import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const NavbarTableRowNeuNav = ({
  rowNewCreate,
  table,
}) =>
  <NavItem
    onClick={() =>
      rowNewCreate(table)
    }
    title="neuer Datensatz"
  >
    <Glyphicon glyph="plus" />
  </NavItem>

NavbarTableRowNeuNav.displayName = 'NavbarTableRowNeuNav'

NavbarTableRowNeuNav.propTypes = {
  table: PropTypes.string,
  rowNewCreate: PropTypes.func.isRequired,
}

export default NavbarTableRowNeuNav
