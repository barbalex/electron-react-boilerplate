import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

// eslint-disable-next-line no-unused-vars
const StyledNavItem = styled(({ showTableNavs, children, ...rest }) => <NavItem {...rest}>{children}</NavItem>)`
  border-right: ${props => (props.showTableNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
`

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store } = props
    const { tableRowRemove, showTableNavs } = store
    const { table, id } = store.table
    return {
      table,
      activeTableRowId: id,
      tableRowRemove,
      showTableNavs,
    }
  }),
  observer
)

const NavbarTableRowDeleteNav = ({
  tableRowRemove,
  showTableNavs,
  table,
  activeTableRowId,
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

export default enhance(NavbarTableRowDeleteNav)
