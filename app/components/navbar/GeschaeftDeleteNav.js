import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

const StyledNavItem = styled(NavItem)`
  border-right: ${props => props.showGeschaefteNavs ? 'solid grey 1px' : 'dotted #505050 1px'};
`

const NavbarGeschaeftLoeschenNav = ({
  geschaeftSetDeleteIntended,
  activeId,
  showGeschaefteNavs,
}) =>
  <StyledNavItem
    onClick={() =>
      geschaeftSetDeleteIntended(activeId)
    }
    title="Geschäft löschen"
    disabled={!activeId}
    showGeschaefteNavs={showGeschaefteNavs}
  >
    <Glyphicon glyph="trash" />
  </StyledNavItem>

NavbarGeschaeftLoeschenNav.displayName = 'NavbarGeschaeftLoeschenNav'

NavbarGeschaeftLoeschenNav.propTypes = {
  geschaeftSetDeleteIntended: PropTypes.func.isRequired,
  activeId: PropTypes.number,  // does NOT always exist
  showGeschaefteNavs: PropTypes.bool.isRequired,
}

export default NavbarGeschaeftLoeschenNav
