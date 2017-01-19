import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

// eslint-disable-next-line no-unused-vars
const StyledNavItem = styled(({ showGeschaefteNavs, children, ...rest }) => <NavItem {...rest}>{children}</NavItem>)`
  border-right: ${props => (props.showGeschaefteNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
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
  activeId: PropTypes.number,
  showGeschaefteNavs: PropTypes.bool.isRequired,
}

NavbarGeschaeftLoeschenNav.defaultProps = {
  activeId: null,
}

export default NavbarGeschaeftLoeschenNav
