/*
 * This component builds and displays a single page
 */

import React, { PropTypes } from 'react'
import styles from './vernehmlassungen.css'

function isOdd(num) {
  return num % 2
}

const PageFristenRows = ({
  geschaeft,
  rowIndex,
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
  const maxStringLength = 2000
  let gegenstand = geschaeft.gegenstand
  if (gegenstand && gegenstand.length > maxStringLength) {
    gegenstand = gegenstand.substring(0, maxStringLength)
    gegenstand += '... (Text für die Ausgabe gekürzt)'
  }
  let ausloeser = geschaeft.ausloeser
  if (ausloeser && ausloeser.length > maxStringLength) {
    ausloeser = ausloeser.substring(0, maxStringLength)
    ausloeser += '... (Text für die Ausgabe gekürzt)'
  }
  let naechsterSchritt = ''
  if (
    geschaeft.naechsterSchritt &&
    geschaeft.naechsterSchritt.length > 0 &&
    geschaeft.naechsterSchritt.replace(/ /g, '')
  ) {
    naechsterSchritt += '=> '
    if (naechsterSchritt.length > maxStringLength) {
      naechsterSchritt += naechsterSchritt.substring(0, maxStringLength)
      naechsterSchritt += '... (Text für die Ausgabe gekürzt)'
    } else {
      naechsterSchritt += geschaeft.naechsterSchritt
    }
  }
  let details = geschaeft.details
  if (details && details.length > maxStringLength) {
    details = details.substring(0, maxStringLength)
    details += '... (Text für die Ausgabe gekürzt)'
  }
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
        <div className={styles.fieldGegenstand}>
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
          {geschaeft.verantwortlichVornameName}
        </div>
      </div>
    </div>
  )
}

PageFristenRows.displayName = 'PageFristenRows'

PageFristenRows.propTypes = {
  geschaeft: PropTypes.object,
  rowIndex: PropTypes.number,
}

export default PageFristenRows
