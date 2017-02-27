import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import styled from 'styled-components'

import styles from './Navbar.css'
import filterForVernehmlAngek from '../../src/filterForVernehmlAngek'
import filterForVernehmlLaeuft from '../../src/filterForVernehmlLaeuft'
import filterForFaelligeGeschaefte from '../../src/filterForFaelligeGeschaefte'

// eslint-disable-next-line no-unused-vars
const StyledNavDropdown = styled(({ showBerichteNavs, children, ...rest }) => <NavDropdown {...rest}>{children}</NavDropdown>)`
  border-left: ${props => (props.showBerichteNavs ? 'solid grey 1px' : 'dotted #505050 1px')}
  border-right: ${props => (props.showBerichteNavs ? 'none' : 'dotted #505050 1px')};
`

const BerichteNav = ({
  pagesInitiate,
  geschaeftPdfShow,
  path,
  pages,
  geschaefteFilterByFields,
  geschaefteSortByFields,
  geschaefteResetSort,
  activeId,
  showBerichteNavs,
}) => {
  const isActive = path === '/pages'
  const nameObject = {
    typFaelligeGeschaefte: 'Bericht: Typ "fällige Geschäfte"',
    list1: 'Bericht: Einfache Liste',
    angekVernehml: 'Bericht: angekündigte Vernehmlassungen',
    laufendeVernehml: 'Bericht: laufende Vernehmlassungen'
  }
  const name = nameObject[pages.reportType] || 'Berichte'
  const title = isActive ? name : 'Berichte'
  return (
    <StyledNavDropdown
      showBerichteNavs={showBerichteNavs}
      eventKey={7}
      title={title}
      id="reports-nav-dropdown"
      active={isActive}
      className={isActive ? styles.navActive : null}
      onSelect={(eventKey) => {
        /*
         * react-bootstrap has an error causing the dropdown to stay open
         * and the message modal not to show!!!!
         *
         * this is an elaborate hack
         * to get the menu item to close immediately
         */
        if (eventKey === 7.2) {
          setTimeout(() => {
            pagesInitiate('list1')
          }, 0)
        }
        if (eventKey === 7.7) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige')
            // only do this after former is finished
            setTimeout(() => {
              pagesInitiate('typFaelligeGeschaefte')
              geschaefteResetSort()
              geschaefteSortByFields('idGeschaeft', 'DESCENDING')
            }, 0)
          }, 0)
        }
        if (eventKey === 7.3) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForVernehmlAngek(), 'angekündigte Vernehmlassungen')
            // only do this after former is finished
            setTimeout(() => {
              pagesInitiate('angekVernehml')
              geschaefteResetSort()
              geschaefteSortByFields('idGeschaeft', 'DESCENDING')
            }, 0)
          }, 0)
        }
        if (eventKey === 7.4) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForVernehmlLaeuft(), 'laufende Vernehmlassungen')
            // only do this after former is finished
            setTimeout(() => {
              pagesInitiate('laufendeVernehml')
              geschaefteResetSort()
              geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
              geschaefteSortByFields('idGeschaeft', 'DESCENDING')
            })
          }, 0)
        }
        if (eventKey === 7.5) {
          setTimeout(() => {
            geschaeftPdfShow()
          }, 0)
        }
      }}
    >
      <MenuItem header>
        Vorlagen,<br />übernehmen den gesetzten Filter:
      </MenuItem>
      <MenuItem eventKey={7.2}>
        {'Vorlage "einfache Liste"'}
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>
        Vorbereitete,<br />setzen einen eigenen Filter:
      </MenuItem>
      <MenuItem eventKey={7.7}>
        fällige Geschäfte
      </MenuItem>
      <MenuItem eventKey={7.3}>
        angekündigte Vernehmlassungen
      </MenuItem>
      <MenuItem eventKey={7.4}>
        laufende Vernehmlassungen
      </MenuItem>
      {
        activeId &&
        <MenuItem divider />
      }
      {
        activeId &&
        <MenuItem header>
          Für das aktive Geschäft:
        </MenuItem>
      }
      {
        activeId &&
        <MenuItem
          eventKey={7.5}
        >
          Deckblatt
        </MenuItem>
      }
    </StyledNavDropdown>
  )
}

BerichteNav.displayName = 'BerichteNav'

BerichteNav.propTypes = {
  geschaefteFilterByFields: PropTypes.func.isRequired,
  geschaefteSortByFields: PropTypes.func.isRequired,
  geschaefteResetSort: PropTypes.func.isRequired,
  pagesInitiate: PropTypes.func.isRequired,
  geschaeftPdfShow: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  activeId: PropTypes.number,
  showBerichteNavs: PropTypes.bool.isRequired,
}

BerichteNav.defaultProps = {
  activeId: null,
}

export default BerichteNav
