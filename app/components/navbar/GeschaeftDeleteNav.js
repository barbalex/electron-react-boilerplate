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
const StyledNavItem = styled(({ showGeschaefteNavs, children, ...rest }) => <NavItem {...rest}>{children}</NavItem>)`
  border-right: ${props => (props.showGeschaefteNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
`

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const {
      store,
    } = props
    const {
      geschaeftSetDeleteIntended,
      showGeschaefteNavs,
    } = props.store
    const {
      activeId,
    } = store.geschaefte
    return {
      activeId,
      geschaeftSetDeleteIntended,
      showGeschaefteNavs,
    }
  }),
  observer
)

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

export default enhance(NavbarGeschaeftLoeschenNav)
