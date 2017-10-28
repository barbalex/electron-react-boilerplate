import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, Radio } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import regularStyles from './areaParlVorstoss.css'
import pdfStyles from './areaParlVorstossPdf.css'
import createOptions from '../../src/createOptions'

const enhance = compose(inject('store'), observer)

const parlVorstossStufe = (isPdf, geschaeft, change, nrOfFieldsBeforePv) => {
  if (!isPdf) {
    return (
      <div>
        <ControlLabel>Stufe</ControlLabel>
        <Radio
          data-value="1"
          checked={geschaeft.parlVorstossStufe === '1'}
          onChange={change}
          bsSize="small"
          name="parlVorstossStufe"
          tabIndex={2 + nrOfFieldsBeforePv}
        >
          1: nicht überwiesen
        </Radio>
        <Radio
          data-value="2"
          checked={geschaeft.parlVorstossStufe === '2'}
          name="parlVorstossStufe"
          onChange={change}
          bsSize="small"
          tabIndex={3 + nrOfFieldsBeforePv}
        >
          2: überwiesen
        </Radio>
      </div>
    )
  }
  let value = ''
  if (geschaeft.parlVorstossStufe === '1') value = '1: nicht überwiesen'
  if (geschaeft.parlVorstossStufe === '2') value = '2: überwiesen'
  return (
    <div>
      <ControlLabel>Stufe</ControlLabel>
      <FormControl
        type="text"
        defaultValue={value}
        bsSize="small"
        tabIndex={2 + nrOfFieldsBeforePv}
      />
    </div>
  )
}

const parlVorstossZustaendigkeit = (
  isPdf,
  geschaeft,
  change,
  nrOfFieldsBeforePv
) => {
  if (!isPdf) {
    return (
      <div>
        <ControlLabel>Zuständigkeit</ControlLabel>
        <Radio
          data-value="hauptzuständig"
          checked={
            geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'
          }
          name="parlVorstossZustaendigkeitAwel"
          onChange={change}
          bsSize="small"
          tabIndex={6 + nrOfFieldsBeforePv}
        >
          haupt
        </Radio>
        <Radio
          data-value="mitberichtzuständig"
          checked={
            geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'
          }
          name="parlVorstossZustaendigkeitAwel"
          onChange={change}
          bsSize="small"
          tabIndex={7 + nrOfFieldsBeforePv}
        >
          mitbericht
        </Radio>
      </div>
    )
  }
  const value = geschaeft.parlVorstossZustaendigkeitAwel
    ? geschaeft.parlVorstossZustaendigkeitAwel.replace('zuständig', '')
    : ''
  return (
    <div>
      <ControlLabel>Zuständigkeit</ControlLabel>
      <FormControl
        type="text"
        defaultValue={value}
        bsSize="small"
        tabIndex={6 + nrOfFieldsBeforePv}
      />
    </div>
  )
}

const Container = styled.div`
  grid-area: areaForGeschaeftsart;
  background-color: rgb(255, 237, 199);
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: auto;
  grid-template-areas: 'areaParlVorstTitle areaParlVorstTitle'
    'fieldParlVorstossTyp fieldParlVorstossTyp' 'fieldStufe fieldZustaendigkeit';
  grid-gap: 15px 8px;
  padding: 8px;
  padding-right: 15px;
  border: ${props => (props['data-isPdf'] ? '1px solid #ccc' : 'none')};
  border-bottom: none;
  border-left: none;
`

const AreaParlVorstoss = ({ store, nrOfFieldsBeforePv, change }) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
    parlVorstossTypOptions,
  } = store.geschaefte
  const path = store.history.location.pathname
  const isPdf = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g => g.idGeschaeft === activeId) || {}
  const styles = isPdf ? pdfStyles : regularStyles

  return (
    <Container data-isPdf={isPdf}>
      <div className={styles.areaParlVorstTitle}>
        Parlamentarischer Vorstoss
      </div>
      {!(isPdf && !geschaeft.parlVorstossTyp) && (
        <div className={styles.fieldParlVorstossTyp}>
          <ControlLabel>Typ</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.parlVorstossTyp || ''}
            name="parlVorstossTyp"
            onChange={change}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePv}
          >
            {createOptions(parlVorstossTypOptions)}
          </FormControl>
        </div>
      )}
      {!(isPdf && !geschaeft.parlVorstossStufe) && (
        <div className={styles.fieldStufe}>
          {parlVorstossStufe(isPdf, geschaeft, change, nrOfFieldsBeforePv)}
        </div>
      )}
      {!(isPdf && !geschaeft.parlVorstossZustaendigkeitAwel) && (
        <div className={styles.fieldZustaendigkeit}>
          {parlVorstossZustaendigkeit(
            isPdf,
            geschaeft,
            change,
            nrOfFieldsBeforePv
          )}
        </div>
      )}
    </Container>
  )
}

AreaParlVorstoss.displayName = 'AreaParlVorstoss'

AreaParlVorstoss.propTypes = {
  store: PropTypes.object.isRequired,
  nrOfFieldsBeforePv: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
}

export default enhance(AreaParlVorstoss)
