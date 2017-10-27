import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import Textarea from 'react-textarea-autosize'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import regularStyles from './areaGeschaeft.css'
import pdfStyles from './areaGeschaeftPdf.css'
import createOptions from '../../src/createOptions'

const Container = styled.div`
  grid-area: areaGeschaeft;
  background-color: ${props => (props.isPdf ? 'white' : 'rgb(255, 186, 137)')};
  display: grid;
  grid-template-columns: repeat(12, calc((100% - 55px) / 12));
  grid-template-rows: auto;
  grid-template-areas: 'areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle areaGeschaeftTitle'
    'fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand fieldGegenstand'
    'fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser fieldAusloeser'
    'fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt fieldOrt'
    'fieldGeschaeftsart fieldGeschaeftsart fieldGeschaeftsart fieldGeschaeftsart fieldGeschaeftsart fieldStatus fieldStatus fieldStatus fieldStatus fieldStatus fieldAbteilung fieldAbteilung'
    'fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails fieldDetails'
    'fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt fieldNaechsterSchritt'
    'fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk fieldVermerk'
    'fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern fieldVermerkIntern';
  grid-column-gap: 5px;
  grid-row-gap: 2px;
  padding: 8px;
  border: ${props => (props.isPdf ? '1px solid #ccc' : 'none')};
  border-bottom: none;
`

const enhance = compose(inject('store'), observer)

const AreaGeschaeft = ({ store, blur, change, nrOfGFields, viewIsNarrow }) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
    statusOptions,
    abteilungOptions,
    geschaeftsartOptions,
  } = store.geschaefte
  const path = store.history.location.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g => g.idGeschaeft === activeId) || {}
  const styles = isPrintPreview ? pdfStyles : regularStyles
  const tabsToAdd = viewIsNarrow ? nrOfGFields : 0

  return (
    <Container>
      <div className={styles.areaGeschaeftTitle}>Geschäft</div>
      <div className={styles.fieldGegenstand}>
        <ControlLabel>Gegenstand</ControlLabel>
        <Textarea
          value={geschaeft.gegenstand || ''}
          name="gegenstand"
          onChange={change}
          onBlur={blur}
          tabIndex={1 + tabsToAdd}
          autoFocus={!viewIsNarrow && !isPrintPreview}
          className={styles.textarea}
        />
      </div>
      {!(!geschaeft.ausloeser && isPrintPreview) && (
        <div className={styles.fieldAusloeser}>
          <ControlLabel>Auslöser</ControlLabel>
          <Textarea
            value={geschaeft.ausloeser || ''}
            name="ausloeser"
            onChange={change}
            onBlur={blur}
            tabIndex={2 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      )}
      {!(!geschaeft.ort && isPrintPreview) && (
        <div className={styles.fieldOrt}>
          <ControlLabel>Ort</ControlLabel>
          <FormControl
            type="text"
            value={geschaeft.ort || ''}
            name="ort"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={3 + tabsToAdd}
          />
        </div>
      )}
      {!(!geschaeft.geschaeftsart && isPrintPreview) && (
        <div className={styles.fieldGeschaeftsart}>
          <ControlLabel>Geschäftsart</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.geschaeftsart || ''}
            name="geschaeftsart"
            onChange={change}
            bsSize="small"
            tabIndex={4 + tabsToAdd}
          >
            {createOptions(geschaeftsartOptions)}
          </FormControl>
        </div>
      )}
      {!(!geschaeft.status && isPrintPreview) && (
        <div className={styles.fieldStatus}>
          <ControlLabel>Status</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.status || ''}
            name="status"
            onChange={change}
            bsSize="small"
            tabIndex={5 + tabsToAdd}
          >
            {createOptions(statusOptions)}
          </FormControl>
        </div>
      )}
      {!(!geschaeft.abteilung && isPrintPreview) && (
        <div className={styles.fieldAbteilung}>
          <ControlLabel>Abteilung</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.abteilung || ''}
            name="abteilung"
            onChange={change}
            bsSize="small"
            tabIndex={6 + tabsToAdd}
          >
            {createOptions(abteilungOptions)}
          </FormControl>
        </div>
      )}
      {!(!geschaeft.details && isPrintPreview) && (
        <div className={styles.fieldDetails}>
          <ControlLabel>Details</ControlLabel>
          <Textarea
            value={geschaeft.details || ''}
            name="details"
            onChange={change}
            onBlur={blur}
            tabIndex={7 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      )}
      {!(!geschaeft.naechsterSchritt && isPrintPreview) && (
        <div className={styles.fieldNaechsterSchritt}>
          <ControlLabel>Nächster Schritt</ControlLabel>
          <Textarea
            value={geschaeft.naechsterSchritt || ''}
            name="naechsterSchritt"
            onChange={change}
            onBlur={blur}
            tabIndex={8 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      )}
      {!(!geschaeft.vermerk && isPrintPreview) && (
        <div className={styles.fieldVermerk}>
          <ControlLabel>Vermerk</ControlLabel>
          <Textarea
            value={geschaeft.vermerk || ''}
            name="vermerk"
            onChange={change}
            onBlur={blur}
            tabIndex={9 + tabsToAdd}
            className={styles.textarea}
          />
        </div>
      )}
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <Textarea
          value={geschaeft.vermerkIntern || ''}
          name="vermerkIntern"
          onChange={change}
          onBlur={blur}
          tabIndex={9 + tabsToAdd}
          className={styles.textarea}
        />
      </div>
    </Container>
  )
}

AreaGeschaeft.displayName = 'AreaGeschaeft'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaGeschaeft.propTypes = {
  store: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  viewIsNarrow: PropTypes.bool.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
}

export default enhance(AreaGeschaeft)
