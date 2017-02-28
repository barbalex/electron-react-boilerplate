import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon,
} from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const {
      store,
    } = props
    const {
      geschaeftNewCreate,
    } = store
    return {
      geschaeftNewCreate,
    }
  }),
  observer
)

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

export default enhance(NavbarGeschaeftNeuNav)
