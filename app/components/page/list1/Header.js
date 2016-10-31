/*
 * This component builds and displays a single page header for page List1
 */

import React from 'react'
import styles from './List1.css'

const PageList1Header = () =>
  <div className={styles.tableHeader}>
    <div className={styles.tableHeaderRow}>
      <div
        className={[
          styles.columnGegenstand,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        Gegenstand, Auslöser
      </div>
      <div
        className={[
          styles.columnGeschaeftsart,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        Geschäftsart
      </div>
      <div
        className={[
          styles.columnStatus,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        Status
      </div>
      <div
        className={[
          styles.columnVerantwortlich,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        Verant- wortlich
      </div>
      <div
        className={[
          styles.columnFristMitarbeiter,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        Frist
      </div>
      <div
        className={[
          styles.columnIdVorgeschaeft,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        Vorge- schäft
      </div>
      <div
        className={[
          styles.columnIdGeschaeft,
          styles.tableHeaderCell,
        ].join(' ')}
      >
        ID
      </div>
    </div>
  </div>

PageList1Header.displayName = 'PageList1Header'

export default PageList1Header
