/*
 * This component builds and displays a single page
 */

import React, { PropTypes } from 'react'

import styles from './vernehmlassungen.css'
import shorten from '../../../src/shortenGegenstandField'

const isOdd = (num) =>
  num % 2


const PageVernehmlassungenRows = ({
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
  const totalString = `
    ${geschaeft.gegenstand || ''}
    ${geschaeft.ausloeser || ''}
    ${geschaeft.details || ''}
    ${geschaeft.vermerk || ''}
    ${geschaeft.naechsterSchritt || ''}
  `
  const maxStringLength = totalString.length > 2000 ? 700 : 2000
  const gegenstand = shorten(geschaeft.gegenstand, '', maxStringLength)
  const ausloeser = shorten(geschaeft.ausloeser, 'Auslöser', maxStringLength)
  const naechsterSchritt = shorten(geschaeft.naechsterSchritt, 'Nächster Schritt', maxStringLength)
  const details = shorten(geschaeft.details, 'Details', maxStringLength)
  const vermerk = shorten(geschaeft.vermerk, 'Vermerk', maxStringLength)

  let faelligkeitText = geschaeft.faelligkeitText
  if (faelligkeitText && faelligkeitText.length > maxStringLength) {
    faelligkeitText = faelligkeitText.substring(0, maxStringLength)
    faelligkeitText += '... (Text gekürzt)'
  }
  const rowClassName = (
    !isOdd(rowIndex) ?
    styles.tableBodyRowShaded :
    styles.tableBodyRow
  )
  const geko = geschaeft.geko || []
  const gekoValue = geko
    .map(g => g.gekoNr)
    .map(val =>
      <div key={val}>
        {val}
      </div>
    )
  const verantwortlichName = `${geschaeft.verantwortlichName}${geschaeft.verantwortlich ? ` (${geschaeft.verantwortlich})` : ''}`

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
        <div className={styles.fieldBold}>
          {geschaeft.idGeschaeft}
        </div>
        {
          gekoValue.length > 0 &&
          <div className={styles.verticallyStackedFields}>
            {gekoValue}
          </div>
        }
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
        {
          ausloeser &&
          <div className={styles.verticallyStackedFields}>
            {ausloeser}
          </div>
        }
        {
          details &&
          <div className={styles.verticallyStackedFields}>
            {details}
          </div>
        }
        {
          vermerk &&
          <div className={styles.verticallyStackedFields}>
            {vermerk}
          </div>
        }
        {
          naechsterSchritt &&
          <div className={styles.verticallyStackedFields}>
            {naechsterSchritt}
          </div>
        }
      </div>
      <div
        className={[
          styles.columnStatus,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div className={styles.fieldBold}>
          {geschaeft.status}
        </div>
        {
          fristMitarbeiter &&
          <div className={styles.verticallyStackedFields}>
            {fristMitarbeiter}
          </div>
        }
        {
          faelligkeitText &&
          <div className={styles.verticallyStackedFields}>
            {faelligkeitText}
          </div>
        }
      </div>
      <div
        className={[
          styles.columnKontaktIntern,
          styles.tableBodyCell,
        ].join(' ')}
      >
        <div className={styles.fieldBold}>
          {verantwortlichName}
        </div>
        {
          geschaeft.abteilung &&
          <div className={styles.verticallyStackedFields}>
            {geschaeft.abteilung}
          </div>
        }
      </div>
    </div>
  )
}

PageVernehmlassungenRows.displayName = 'PageVernehmlassungenRows'

PageVernehmlassungenRows.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
}

export default PageVernehmlassungenRows
