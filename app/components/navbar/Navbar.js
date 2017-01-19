import React, { Component, PropTypes } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'

import ModalGeschaeftDelete from '../../containers/ModalGeschaeftDelete'
import ModalMessage from '../../containers/ModalMessage'
import PagesModal from '../../containers/PagesModal'
import BerichteNav from '../../containers/navbar/BerichteNav'
import GeschaeftNeuNav from '../../containers/navbar/GeschaeftNewNav'
import GeschaeftLoeschenNav from '../../containers/navbar/GeschaeftDeleteNav'
import TableRowNeuNav from '../../containers/navbar/TableRowNewNav'
import TableRowDeleteNav from '../../containers/navbar/TableRowDeleteNav'
import ExportGeschaefteNav from '../../containers/navbar/ExportGeschaefteNav'
import PrintToPdfNav from '../../containers/navbar/PrintToPdfNav'
import PrintNav from '../../containers/navbar/PrintNav'
import StammdatenNav from '../../containers/navbar/StammdatenNav'
import FilterNav from '../../containers/navbar/FilterNav'
import OptionsNav from '../../containers/navbar/OptionsNav'
import styles from './Navbar.css'

// eslint-disable-next-line no-unused-vars
const GeschaefteLinkContainer = styled(({ showGeschaefteNavs, children, ...rest }) => <LinkContainer {...rest}>{children}</LinkContainer>)`
  border-left: ${props => (props.showGeschaefteNavs ? 'solid grey 1px' : 'dotted #505050 1px')};
  border-right: ${props => (props.showGeschaefteNavs ? 'none' : 'dotted #505050 1px')};
`

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

export default NavbarComponent
