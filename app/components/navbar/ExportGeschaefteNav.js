/* eslint-disable no-param-reassign */

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import moment from 'moment'
import _ from 'lodash'

import exportGeschaefte from '../../src/exportGeschaefte'
import getHistoryOfGeschaeft from '../../src/getHistoryOfGeschaeft'
import getHistoryIdArray from '../../src/getHistoryIdArray'

const exportGeschaefteRechtsmittelVorjahre = (
  e,
  geschaefte,
  messageShow,
) => {
  e.preventDefault()
  const thisYear = moment().year()
  const firstDate = moment(`01.01.${thisYear - 2}`, 'DD.MM.YYYY')
  const lastDate = moment(`31.12.${thisYear - 1}`, 'DD.MM.YYYY')
  function isInPreviousTwoYears(date) {
    return moment(date, 'DD.MM.YYYY').isBetween(firstDate, lastDate, 'days', '[]')
  }
  const geschaefteGefiltert = geschaefte.filter(g => (
    g.geschaeftsart === 'Rekurs/Beschwerde' &&
    !!g.datumEingangAwel &&
    isInPreviousTwoYears(g.datumEingangAwel)
  ))
  const fieldsWanted = [
    'datumEingangAwel',
    'ausloeser',
    'gegenstand',
    'rechtsmittelInstanz',
    'abteilung',
    'rechtsmittelErledigung',
    'rechtsmittelEntscheidDatum',
    'rechtsmittelEntscheidNr',
    'rechtsmittelTxt',
    'idGeschaeft',
  ]
  // now reduce fields to wanted
  geschaefteGefiltert.forEach((g, index) => {
    geschaefteGefiltert[index] = _.pick(geschaefteGefiltert[index], fieldsWanted)
  })
  exportGeschaefte(geschaefteGefiltert, messageShow)
}

const exportGeschaefteAll = (
  e,
  geschaefteGefilterteIds,
  geschaefte,
  messageShow,
) => {
  e.preventDefault()
  const geschaefteGefiltert = geschaefte.filter(g =>
    geschaefteGefilterteIds.includes(g.idGeschaeft)
  )
  // need to make geko, interne and externe readable
  const geschaefteReadable = _.clone(geschaefteGefiltert).map((g) => {
    // make readable
    g.geko = (
      g.geko && g.geko.map ?
      g.geko
        .map(geko => geko.gekoNr)
        .join(', ') :
      null
    )
    g.interne = (
      g.interne && g.interne.map ?
      g.interne
        .map(i => {
          const name = `${i.name} ${i.vorname}, ${i.kurzzeichen}`
          const abt = i.abteilung ? `, ${i.abteilung}` : ''
          const eMail = i.eMail ? `, ${i.eMail}` : ''
          const telefon = i.telefon ? `, ${i.telefon}` : ''
          return `${name}${abt}${eMail}${telefon}`
        })
        .join('; ') :
      null
    )
    g.externe = (
      g.externe && g.externe.map ?
      g.externe
        .map(i => {
          const name = `${i.name} ${i.vorname}`
          const firma = i.firma ? `, ${i.firma}` : ''
          const eMail = i.eMail ? `, ${i.eMail}` : ''
          const telefon = i.telefon ? `, ${i.telefon}` : ''
          return `${name}${firma}${eMail}${telefon}`
        })
        .join('; ') :
      null
    )
    g.links = (
      g.links && g.links.map ?
      g.links
        .map(l => l.url)
        .join(', ') :
      null
    )
    // creates problems when calculating too many
    g.history = getHistoryIdArray(g).join(', ')
    return g
  })
  exportGeschaefte(geschaefteReadable, messageShow)
}

const NavbarExportGeschaefteNav = ({
  geschaefte,
  messageShow,
  geschaefteGefilterteIds,
}) =>
  <NavDropdown
    title="Exporte"
    id="exportGeschaefteNavDropdown"
  >
    <MenuItem
      onClick={e =>
        exportGeschaefteAll(
          e,
          geschaefteGefilterteIds,
          geschaefte,
          messageShow,
        )
      }
    >
      Gefilterte Geschäfte mit allen Feldern
    </MenuItem>
    <MenuItem
      onClick={e =>
        exportGeschaefteRechtsmittelVorjahre(
          e,
          geschaefte,
          messageShow,
        )
      }
    >
      Rekurse und Beschwerden, Vergleich der letzten zwei Jahre
    </MenuItem>
  </NavDropdown>

NavbarExportGeschaefteNav.displayName = 'NavbarExportGeschaefteNav'

NavbarExportGeschaefteNav.propTypes = {
  geschaefte: PropTypes.array.isRequired,
  geschaefteGefilterteIds: PropTypes.array.isRequired,
  messageShow: PropTypes.func.isRequired,
}

export default NavbarExportGeschaefteNav
