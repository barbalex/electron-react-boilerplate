import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'

const StyledNavItem = styled(NavItem)`
  border-right: ${props => props.showTableNavs ? 'solid grey 1px' : 'dotted #505050 1px'};
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

export default NavbarTableRowDeleteNav
