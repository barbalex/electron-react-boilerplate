import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import styles from './Navbar.css'

const stammdatenTitle = (table, rows) => {
  const tableNameObject = {
    interne: 'Stammdaten: Interne',
    externe: 'Stammdaten: Externe',
    geschaeftsart: 'Stammdaten: Geschäftsart',
    parlVorstossTyp: 'Stammdaten: Parl. Vorstoss Typ',
    rechtsmittelInstanz: 'Stammdaten: Rechtsmittel-Instanz',
    rechtsmittelErledigung: 'Stammdaten: Rechtsmittel-Erledigung',
    status: 'Stammdaten: Status',
  }
  const tableName = tableNameObject[table] || table
  if (table) {
    return (
      <span>
        {tableName} <sup>{rows.length}</sup>
      </span>
    )
  }
  return <span>Stammdaten</span>
}

const NavbarStammdatenNav = ({
  getTable,
  table,
  rows,
}) => {
  /**
   * does not work - should keep menu active when table is loaded
   * probably a bug in react-bootstrap
   * see: https://github.com/react-bootstrap/react-bootstrap/issues/1878
   */
  const isStammdatenMenuActive = !!table

  return (
    <NavDropdown
      title={stammdatenTitle(table, rows)}
      id="stammdaten-nav-dropdown"
      active={isStammdatenMenuActive}
      className={isStammdatenMenuActive ? styles.navActive : null}
    >
      <MenuItem
        onClick={() => getTable('interne')}
        active={table === 'interne'}
      >
        Interne
      </MenuItem>
      <MenuItem
        onClick={() => getTable('externe')}
        active={table === 'externe'}
      >
        Externe
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>
        Auswahllisten:
      </MenuItem>
      <MenuItem
        onClick={() => getTable('geschaeftsart')}
        active={table === 'geschaeftsart'}
      >
        Geschäftsart
      </MenuItem>
      <MenuItem
        onClick={() => getTable('parlVorstossTyp')}
        active={table === 'parlVorstossTyp'}
      >
        Parlament. Vorstoss Typ
      </MenuItem>
      <MenuItem
        onClick={() => getTable('rechtsmittelInstanz')}
        active={table === 'rechtsmittelInstanz'}
      >
        Rechtsmittel-Instanz
      </MenuItem>
      <MenuItem
        onClick={() => getTable('rechtsmittelErledigung')}
        active={table === 'rechtsmittelErledigung'}
      >
        Rechtsmittel-Erledigung
      </MenuItem>
      <MenuItem
        onClick={() => getTable('status')}
        active={table === 'status'}
      >
        Status
      </MenuItem>
    </NavDropdown>
  )
}

NavbarStammdatenNav.displayName = 'NavbarStammdatenNav'

NavbarStammdatenNav.propTypes = {
  getTable: PropTypes.func.isRequired,
  table: PropTypes.string,
  rows: PropTypes.array,
}

export default NavbarStammdatenNav
