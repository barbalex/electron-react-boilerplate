import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

const StyledNavItem = styled(NavItem)`
  border-right: dotted #505050 1px;
`

const NavbarGeschaeftLoeschenNav = ({
  geschaeftSetDeleteIntended,
  activeId,
}) =>
  <StyledNavItem
    onClick={() =>
      geschaeftSetDeleteIntended(activeId)
    }
    title="Geschäft löschen"
    disabled={!activeId}
  >
    <Glyphicon glyph="trash" />
  </StyledNavItem>

NavbarGeschaeftLoeschenNav.displayName = 'NavbarGeschaeftLoeschenNav'

NavbarGeschaeftLoeschenNav.propTypes = {
  geschaeftSetDeleteIntended: PropTypes.func.isRequired,
  activeId: PropTypes.number,  // does NOT always exist
}

export default NavbarGeschaeftLoeschenNav
