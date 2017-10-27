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
const Title = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: areaGeschaeftTitle;
`
const Gegenstand = styled.div`grid-area: fieldGegenstand;`
const StyledTextarea = styled(Textarea)`
  display: block;
  width: 100%;
  padding: 6px 12px;
  line-height: 1.42857143;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
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
      <Title>Geschäft</Title>
      <Gegenstand>
        <ControlLabel>Gegenstand</ControlLabel>
        <StyledTextarea
          value={geschaeft.gegenstand || ''}
          name="gegenstand"
          onChange={change}
          onBlur={blur}
          tabIndex={1 + tabsToAdd}
          autoFocus={!viewIsNarrow && !isPrintPreview}
        />
      </Gegenstand>
      {!(!geschaeft.ausloeser && isPrintPreview) && (
        <div className={styles.fieldAusloeser}>
          <ControlLabel>Auslöser</ControlLabel>
          <StyledTextarea
            value={geschaeft.ausloeser || ''}
            name="ausloeser"
            onChange={change}
            onBlur={blur}
            tabIndex={2 + tabsToAdd}
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
          <StyledTextarea
            value={geschaeft.details || ''}
            name="details"
            onChange={change}
            onBlur={blur}
            tabIndex={7 + tabsToAdd}
          />
        </div>
      )}
      {!(!geschaeft.naechsterSchritt && isPrintPreview) && (
        <div className={styles.fieldNaechsterSchritt}>
          <ControlLabel>Nächster Schritt</ControlLabel>
          <StyledTextarea
            value={geschaeft.naechsterSchritt || ''}
            name="naechsterSchritt"
            onChange={change}
            onBlur={blur}
            tabIndex={8 + tabsToAdd}
          />
        </div>
      )}
      {!(!geschaeft.vermerk && isPrintPreview) && (
        <div className={styles.fieldVermerk}>
          <ControlLabel>Vermerk</ControlLabel>
          <StyledTextarea
            value={geschaeft.vermerk || ''}
            name="vermerk"
            onChange={change}
            onBlur={blur}
            tabIndex={9 + tabsToAdd}
          />
        </div>
      )}
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <StyledTextarea
          value={geschaeft.vermerkIntern || ''}
          name="vermerkIntern"
          onChange={change}
          onBlur={blur}
          tabIndex={9 + tabsToAdd}
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
