/*
 * This component builds and displays a single page header for page FaelligeGeschaefte
 */

import React from 'react'
import styled from 'styled-components'

import styles from './vernehmlassungen.css'

const Container = styled.div`border-bottom: 2px solid #717171;`
const StyledHeaderRow = styled.div`
  display: flex;
  padding: 3px;
`
const StyledHeaderCell = styled.div`
  flex: 1;
  padding: 2px;
`
const StyledHeaderId = styled.div`
  flex: 1;
  padding: 2px;
  min-width: 65px;
  max-width: 65px;
`

const PageFristenHeader = () => (
  <Container>
    <StyledHeaderRow>
      <StyledHeaderId>
        <b>ID</b>
        <br />Geko Nr.
      </StyledHeaderId>
      <div className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}>
        <b>Gegenstand</b>
        <br />Auslöser / Details / Vermerk / nächster Schritt
      </div>
      <div className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}>
        <b>Status</b>
        <br />Frist
      </div>
      <div className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}>
        <b>Verantwortlich</b>
        <br />Abteilung
      </div>
    </StyledHeaderRow>
  </Container>
)

PageFristenHeader.displayName = 'PageFristenHeader'

export default PageFristenHeader
