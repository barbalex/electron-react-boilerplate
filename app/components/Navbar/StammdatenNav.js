import React from 'react'
import PropTypes from 'prop-types'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

const stammdatenTitle = (table, rows) => {
  const tableNameObject = {
    interne: 'Stammdaten: Interne',
    externe: 'Stammdaten: Externe',
    aktenstandort: 'Stammdaten: Aktenstandort',
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

// eslint-disable-next-line no-unused-vars
const StyledNavDropdown = styled(NavDropdown)`
  border-left: ${props => (props['data-showtablenavs'] ? 'solid grey 1px' : 'dotted #505050 1px')};
  border-right: ${props => (props['data-showtablenavs'] ? 'none' : 'dotted #505050 1px')};
`

const enhance = compose(inject('store'), observer)

const NavbarStammdatenNav = ({ store, showTableNavs }) => {
  const { getTable } = store
  const { table, rows } = store.table

  return (
    <StyledNavDropdown title={stammdatenTitle(table, rows)} id="stammdaten-nav-dropdown" data-showtablenavs={showTableNavs}>
      <MenuItem onClick={() => getTable('interne')} active={table === 'interne'}>
        Interne
      </MenuItem>
      <MenuItem onClick={() => getTable('externe')} active={table === 'externe'}>
        Externe
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>Auswahllisten:</MenuItem>
      <MenuItem onClick={() => getTable('aktenstandort')} active={table === 'aktenstandort'}>
        Aktenstandort
      </MenuItem>
      <MenuItem onClick={() => getTable('geschaeftsart')} active={table === 'geschaeftsart'}>
        Geschäftsart
      </MenuItem>
      <MenuItem onClick={() => getTable('parlVorstossTyp')} active={table === 'parlVorstossTyp'}>
        Parlament. Vorstoss Typ
      </MenuItem>
      <MenuItem onClick={() => getTable('rechtsmittelInstanz')} active={table === 'rechtsmittelInstanz'}>
        Rechtsmittel-Instanz
      </MenuItem>
      <MenuItem onClick={() => getTable('rechtsmittelErledigung')} active={table === 'rechtsmittelErledigung'}>
        Rechtsmittel-Erledigung
      </MenuItem>
      <MenuItem onClick={() => getTable('status')} active={table === 'status'}>
        Status
      </MenuItem>
    </StyledNavDropdown>
  )
}

NavbarStammdatenNav.displayName = 'NavbarStammdatenNav'

NavbarStammdatenNav.propTypes = {
  store: PropTypes.object.isRequired,
  showTableNavs: PropTypes.bool.isRequired,
}

export default enhance(NavbarStammdatenNav)
