/*
 * This component builds and displays a single page header for page FaelligeGeschaefte
 */

import React from 'react'
import styles from './FaelligeGeschaefte.css'

const PageFristenHeader = () =>
  <div className={styles.tableHeader}>
    <div className={styles.tableHeaderRow}>
      <div
        className={[
          styles.columnIdGeschaeft,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>ID</b>
      </div>
      <div
        className={[
          styles.columnGegenstand,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>Gegenstand</b> / Auslöser / Details / <em>nächster Schritt</em>
      </div>
      <div
        className={[
          styles.columnKrNr,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>KR Nr.</b>
      </div>
      <div
        className={[
          styles.columnStatus,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>Status</b>
      </div>
      <div
        className={[
          styles.columnKontaktIntern,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        <b>Verantwortlich</b>
      </div>
    </div>
  </div>

PageFristenHeader.displayName = 'PageFristenHeader'

export default PageFristenHeader
