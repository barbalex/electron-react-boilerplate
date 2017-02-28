import React, { Component, PropTypes } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import ModalGeschaeftDelete from '../ModalGeschaeftDelete'
import ModalMessage from '../ModalMessage'
import PagesModal from '../PagesModal'
import BerichteNav from './BerichteNav'
import GeschaeftNeuNav from './GeschaeftNewNav'
import GeschaeftLoeschenNav from './GeschaeftDeleteNav'
import TableRowNeuNav from './TableRowNewNav'
import TableRowDeleteNav from './TableRowDeleteNav'
import ExportGeschaefteNav from './ExportGeschaefteNav'
import PrintToPdfNav from './PrintToPdfNav'
import PrintNav from './PrintNav'
import StammdatenNav from './StammdatenNav'
import FilterNav from './FilterNav'
import OptionsNav from './OptionsNav'
import styles from './Navbar.css'

// eslint-disable-next-line no-unused-vars
const GeschaefteLinkContainer = styled(({ showGeschaefteNavs, children, ...rest }) => <LinkContainer {...rest}>{children}</LinkContainer>)`
  border-left: ${props => (props.showGeschaefteNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
  border-right: ${props => (props.showGeschaefteNavs ? 'none' : 'dotted #505050 1px')};
`

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const {
      store,
      routing,
    } = props
    const {
      showPagesModal,
      showMessageModal,
      configGet,
    } = store
    const {
      geschaefteGefilterteIds,
      geschaeftePlus: geschaefte,
      willDelete,
    } = store.geschaefte
    const path = routing.locationBeforeTransitions.pathname
    return {
      geschaefte,
      geschaefteGefilterteIds,
      willDeleteGeschaeft: willDelete,
      path,
      showMessageModal,
      showPagesModal,
      configGet,
    }
  }),
  observer
)

class NavbarComponent extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    showPagesModal: PropTypes.bool.isRequired,
    configGet: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { configGet } = this.props
    configGet()
  }

  render() {
    const {
      geschaefte,
      geschaefteGefilterteIds,
      showMessageModal,
      showPagesModal,
      willDeleteGeschaeft,
      path,
    } = this.props

    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const classNameBadge = dataIsFiltered ? styles.active : null
    const showBerichteNavs = path === '/pages' || path === '/geschaeftPdf'
    const showGeschaefteNavs = (
      path === '/geschaefte' ||
      path === '/filterFields'
    )
    const showGeschaefteAndPrint = showBerichteNavs || showGeschaefteNavs
    const showTableNavs = path === '/table'

    return (
      <div>
        {
          willDeleteGeschaeft &&
          <ModalGeschaeftDelete />
        }
        {
          showMessageModal &&
          <ModalMessage />
        }
        {
          showPagesModal &&
          <PagesModal />
        }
        <Navbar
          inverse
          fluid
          className={styles.navbar}
        >
          <Nav>
            <GeschaefteLinkContainer
              to={{ pathname: '/geschaefte' }}
              showGeschaefteNavs={showGeschaefteNavs}
            >
              <NavItem
                href="#"
              >
                Geschäfte <sup className={classNameBadge}>{geschaefteGefilterteIds.length}</sup>
              </NavItem>
            </GeschaefteLinkContainer>
            {
              showGeschaefteNavs &&
              <GeschaeftNeuNav />
            }
            {
              showGeschaefteNavs &&
              <GeschaeftLoeschenNav showGeschaefteNavs={showGeschaefteNavs} />
            }
            {
              showGeschaefteAndPrint &&
              <ExportGeschaefteNav />
            }
            {
              showGeschaefteAndPrint &&
              <BerichteNav showBerichteNavs={showBerichteNavs} />
            }
            {
              showBerichteNavs &&
              <PrintNav />
            }
            {
              showBerichteNavs &&
              <PrintToPdfNav showBerichteNavs={showBerichteNavs} />
            }
            <StammdatenNav showTableNavs={showTableNavs} />
            {
              showTableNavs &&
              <TableRowNeuNav />
            }
            {
              showTableNavs &&
              <TableRowDeleteNav showTableNavs={showTableNavs} />
            }
          </Nav>
          <Nav pullRight>
            {
              !showTableNavs &&
              <FilterNav />
            }
            <OptionsNav />
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default enhance(NavbarComponent)
