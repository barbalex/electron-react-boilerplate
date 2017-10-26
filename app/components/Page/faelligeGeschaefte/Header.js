import React from 'react'
import styled from 'styled-components'
import styles from './FaelligeGeschaefte.css'

const PageFristenHeader = () => (
  <div className={styles.tableHeader}>
    <div className={styles.tableHeaderRow}>
      <div className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}>
        <b>ID</b>
        <br />KR Nr.
      </div>
      <div className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}>
        <b>Gegenstand</b>
        <br />Auslöser / Details / nächster Schritt
      </div>
      <div className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}>
        <b>Status</b>
        <br />Frist
      </div>
      <div className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}>
        <b>Verantwortlich</b>
      </div>
    </div>
  </div>
)

PageFristenHeader.displayName = 'PageFristenHeader'

export default PageFristenHeader
