import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const NavbarGeschaeftNeuNav = ({
  geschaeftNewCreate,
}) =>
  <NavItem
    onClick={geschaeftNewCreate}
    title="neues Geschäft"
  >
    <Glyphicon glyph="plus" />
  </NavItem>

NavbarGeschaeftNeuNav.displayName = 'NavbarGeschaeftNeuNav'

NavbarGeschaeftNeuNav.propTypes = {
  geschaeftNewCreate: PropTypes.func.isRequired,
}

export default NavbarGeschaeftNeuNav
