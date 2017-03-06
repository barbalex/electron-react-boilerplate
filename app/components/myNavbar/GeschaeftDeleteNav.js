import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

// eslint-disable-next-line no-unused-vars
const StyledNavItem = styled(({ showGeschaefteNavs, children, ...rest }) => <NavItem {...rest}>{children}</NavItem>)`
  border-right: ${props => (props.showGeschaefteNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
`

const enhance = compose(
  inject('store'),
  observer
)

const NavbarGeschaeftLoeschenNav = ({ store }) => {
  const { geschaeftSetDeleteIntended, showGeschaefteNavs } = store
  const { activeId } = store.geschaefte
  return (
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
  )
}

NavbarGeschaeftLoeschenNav.displayName = 'NavbarGeschaeftLoeschenNav'

NavbarGeschaeftLoeschenNav.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(NavbarGeschaeftLoeschenNav)
