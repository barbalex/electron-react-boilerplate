import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import styles from './Navbar.css'
import filterForVernehmlAngek from '../../src/filterForVernehmlAngek'
import filterForVernehmlLaeuft from '../../src/filterForVernehmlLaeuft'

const BerichteNav = ({
  pagesInitiate,
  geschaeftPdfShow,
  path,
  pages,
  geschaefteFilterByFields,
  geschaefteSortByFields,
  geschaefteResetSort,
  activeId,
}) => {
  const isActive = path === '/pages'
  const nameObject = {
    typFaelligeGeschaefte: 'Bericht: Typ "fällige Geschäfte"',
    list1: 'Bericht: Einfache Liste',
    typVernehmlassungen: 'Bericht: Typ "Vernehmlassungen"',
    angekVernehml: 'Bericht: angekündigte Vernehmlassungen',
    laufendeVernehml: 'Bericht: laufende Vernehmlassungen'
  }
  const name = nameObject[pages.reportType] || 'Berichte'
  const title = isActive ? name : 'Berichte'
  return (
    <NavDropdown
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
        if (eventKey === 7.1) {
          setTimeout(() => {
            pagesInitiate('typFaelligeGeschaefte')
          }, 0)
        }
        if (eventKey === 7.2) {
          setTimeout(() => {
            pagesInitiate('typVernehmlassungen')
          }, 0)
        }
        if (eventKey === 7.3) {
          setTimeout(() => {
            pagesInitiate('list1')
          }, 0)
        }
        if (eventKey === 7.4) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForVernehmlAngek(), 'angekündigte Vernehmlassungen')
            pagesInitiate('angekVernehml')
            geschaefteResetSort()
            geschaefteSortByFields('idGeschaeft', 'DESCENDING')
          }, 0)
        }
        if (eventKey === 7.5) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForVernehmlLaeuft(), 'laufende Vernehmlassungen')
            pagesInitiate('laufendeVernehml')
            geschaefteResetSort()
            geschaefteSortByFields('fristMitarbeiter', 'DESCENDING')
            geschaefteSortByFields('idGeschaeft', 'DESCENDING')
          }, 0)
        }
        if (eventKey === 7.6) {
          setTimeout(() => {
            geschaeftPdfShow()
          }, 0)
        }
      }}
    >
      <MenuItem header>
        Vorlagen,<br />übernehmen den gesetzten Filter:
      </MenuItem>
      <MenuItem eventKey={7.1}>
        {'Vorlage "fällige Geschäfte"'}
      </MenuItem>
      <MenuItem eventKey={7.2}>
        {'Vorlage "Vernehmlassungen"'}
      </MenuItem>
      <MenuItem eventKey={7.3}>
        {'Vorlage "einfache Liste"'}
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>
        Pfannenfertige,<br />setzen einen eigenen Filter:
      </MenuItem>
      <MenuItem eventKey={7.4}>
        angekündigte Vernehmlassungen
      </MenuItem>
      <MenuItem eventKey={7.5}>
        laufende Vernehmlassungen
      </MenuItem>
      {
        activeId &&
        <MenuItem divider />  // eslint-disable-line react/jsx-indent
      }
      {
        activeId &&
        <MenuItem header>
          Für das aktive Geschäft:
        </MenuItem>
      }
      {
        activeId &&
        <MenuItem  // eslint-disable-line react/jsx-indent
          eventKey={7.6}
        >
          Deckblatt
        </MenuItem>
      }
    </NavDropdown>
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
  activeId: PropTypes.number
}

export default BerichteNav
