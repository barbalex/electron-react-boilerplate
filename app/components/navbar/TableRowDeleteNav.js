import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

// eslint-disable-next-line no-unused-vars
const StyledNavItem = styled(({ showTableNavs, children, ...rest }) => <NavItem {...rest}>{children}</NavItem>)`
  border-right: ${props => (props.showTableNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
`

const NavbarTableRowDeleteNav = ({
  tableRowRemove,
  table,
  activeTableRowId,
  showTableNavs,
}) =>
  <StyledNavItem
    onClick={() =>
      tableRowRemove(table, activeTableRowId)
    }
    title="Datensatz löschen"
    disabled={!activeTableRowId}
    showTableNavs={showTableNavs}
  >
    <Glyphicon glyph="trash" />
  </StyledNavItem>

NavbarTableRowDeleteNav.displayName = 'NavbarTableRowDeleteNav'

NavbarTableRowDeleteNav.propTypes = {
  table: PropTypes.string.isRequired,
  activeTableRowId: PropTypes.number,
  tableRowRemove: PropTypes.func.isRequired,
  showTableNavs: PropTypes.bool.isRequired,
}

NavbarTableRowDeleteNav.defaultProps = {
  activeTableRowId: null,
}

export default NavbarTableRowDeleteNav
