/*
 * This component builds and displays a single page
 */

import React, { PropTypes } from 'react'

import styles from './FaelligeGeschaefte.css'
import shorten from '../../../src/shortenGegenstandField'

function isOdd(num) {
  return num % 2
}

const PageFristenRows = ({
  geschaeft,
  rowIndex,
  interneOptions,
}) => {
  const fristMitarbeiter = (
    geschaeft.fristMitarbeiter ?
    `Frist: ${geschaeft.fristMitarbeiter}` :
    ''
  )
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

  let faelligkeitText = geschaeft.faelligkeitText
  if (faelligkeitText && faelligkeitText.length > maxStringLength) {
    faelligkeitText = faelligkeitText.substring(0, maxStringLength)
    faelligkeitText += '... (Text für die Ausgabe gekürzt)'
  }

  const rowClassName = (
    !isOdd(rowIndex) ?
    styles.tableBodyRowShaded :
    styles.tableBodyRow
  )

  const verantwortlichRow = interneOptions.find(o => o.kurzzeichen === geschaeft.verantwortlich)
  const verantwortlichName = verantwortlichRow && verantwortlichRow.name ? `${verantwortlichRow.vorname} ${verantwortlichRow.name}` : ''

  return (
    <div
      key={geschaeft.idGeschaeft}
      className={rowClassName}
    >
      <div
        className={[
          styles.columnIdGeschaeft,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div>
          {geschaeft.idGeschaeft}
        </div>
      </div>
      <div
        className={[
          styles.columnGegenstand,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div className={styles.fieldBold}>
          {gegenstand}
        </div>
        <div>
          {ausloeser}
        </div>
        <div>
          {details}
        </div>
        <div className={styles.fieldNaechserSchritt}>
          {naechsterSchritt}
        </div>
      </div>
      <div
        className={[
          styles.columnKrNr,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div>
          {geschaeft.entscheidKrNr}
        </div>
      </div>
      <div
        className={[
          styles.columnStatus,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div>
          {geschaeft.status}
        </div>
        <div>
          {fristMitarbeiter}
        </div>
        <div>
          {faelligkeitText}
        </div>
      </div>
      <div
        className={[
          styles.columnKontaktIntern,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div>
          {geschaeft.verantwortlich}
        </div>
        <div>
          {verantwortlichName}
        </div>
      </div>
    </div>
  )
}

PageFristenRows.displayName = 'PageFristenRows'

PageFristenRows.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  interneOptions: PropTypes.array.isRequired,
}

export default PageFristenRows
