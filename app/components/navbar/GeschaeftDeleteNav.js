import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'

const NavbarGeschaeftLoeschenNav = ({
  geschaeftSetDeleteIntended,
  activeId,
}) =>
  <NavItem
    onClick={() =>
      geschaeftSetDeleteIntended(activeId)
    }
    title="Geschäft löschen"
    disabled={!activeId}
  >
    <Glyphicon glyph="trash" />
  </NavItem>

NavbarGeschaeftLoeschenNav.displayName = 'NavbarGeschaeftLoeschenNav'

NavbarGeschaeftLoeschenNav.propTypes = {
  geschaeftSetDeleteIntended: PropTypes.func.isRequired,
  activeId: PropTypes.number,
}

export default NavbarGeschaeftLoeschenNav
