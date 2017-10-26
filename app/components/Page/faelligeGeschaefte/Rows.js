import React, { PropTypes } from 'react'
import styled from 'styled-components'

import styles from './FaelligeGeschaefte.css'
import shorten from '../../../src/shortenGegenstandField'

function isOdd(num) {
  return num % 2
}

const PageFristenRows = ({ geschaeft, rowIndex }) => {
  const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : ''
  /**
   * need to enforce max string length
   * if a field contains more text than fits on a page
   * the page is (re-)created infinitely...
   */
  const totalString = `
    ${geschaeft.gegenstand || ''}
    ${geschaeft.ausloeser || ''}
    ${geschaeft.details || ''}
    ${geschaeft.naechsterSchritt || ''}
  `
  const maxStringLength = totalString.length > 2000 ? 700 : 2000
  const gegenstand = shorten(geschaeft.gegenstand, '', maxStringLength)
  const ausloeser = shorten(geschaeft.ausloeser, 'Auslöser', maxStringLength)
  const naechsterSchritt = shorten(geschaeft.naechsterSchritt, 'Nächster Schritt', maxStringLength)
  const details = shorten(geschaeft.details, 'Details', maxStringLength)
  const faelligkeitText = shorten(geschaeft.faelligkeitText, '', 200)

  const rowClassName = !isOdd(rowIndex) ? styles.tableBodyRowShaded : styles.tableBodyRow
  const verantwortlichName = `${geschaeft.verantwortlichName}${geschaeft.verantwortlich ? ` (${geschaeft.verantwortlich})` : ''}`

  return (
    <div key={geschaeft.idGeschaeft} className={rowClassName}>
      <div className={[styles.columnIdGeschaeft, styles.tableBodyCell].join(' ')}>
        <div className={styles.fieldBold}>{geschaeft.idGeschaeft}</div>
        {geschaeft.entscheidKrNr && <div className={styles.verticallyStackedFields}>{geschaeft.entscheidKrNr}</div>}
      </div>
      <div className={[styles.columnGegenstand, styles.tableBodyCell].join(' ')}>
        <div className={styles.fieldBold}>{gegenstand}</div>
        {ausloeser && <div className={styles.verticallyStackedFields}>{ausloeser}</div>}
        {details && <div className={styles.verticallyStackedFields}>{details}</div>}
        {naechsterSchritt && <div className={styles.verticallyStackedFields}>{naechsterSchritt}</div>}
      </div>
      <div className={[styles.columnStatus, styles.tableBodyCell].join(' ')}>
        <div className={styles.fieldBold}>{geschaeft.status}</div>
        <div className={styles.verticallyStackedFields}>{fristMitarbeiter}</div>
        <div className={styles.verticallyStackedFields}>{faelligkeitText}</div>
      </div>
      <div className={[styles.columnKontaktIntern, styles.tableBodyCell].join(' ')}>
        <div className={styles.fieldBold}>{verantwortlichName}</div>
      </div>
    </div>
  )
}

PageFristenRows.displayName = 'PageFristenRows'

PageFristenRows.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
}

export default PageFristenRows
