/*
 * This component builds and displays a single page header for page FaelligeGeschaefte
 */

import React from 'react'
import styles from './vernehmlassungen.css'

const PageFristenHeader = () =>
  <div className={styles.tableHeader}>
    <div className={styles.tableHeaderRow}>
      <div
        className={[
          styles.columnIdGeschaeft,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>ID</b><br />GekoNr
      </div>
      <div
        className={[
          styles.columnGegenstand,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>Gegenstand</b><br />Auslöser / Details / Vermerk / nächster Schritt
      </div>
      <div
        className={[
          styles.columnStatus,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>Status</b><br />Frist
      </div>
      <div
        className={[
          styles.columnKontaktIntern,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>Verantwortlich</b><br />Abteilung
      </div>
    </div>
  </div>

PageFristenHeader.displayName = 'PageFristenHeader'

export default PageFristenHeader
