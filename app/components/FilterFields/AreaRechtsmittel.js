import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, InputGroup } from 'react-bootstrap'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import ComparatorSelector from './ComparatorSelector'
import createOptions from '../../src/createOptions'
import DateField from './DateField'
import Input from './Input'

moment.locale('de')

const Container = styled.div`
  grid-area: areaForGeschaeftsart;
  background-color: white;
  box-shadow: inset 1em 1em 2em rgb(255, 237, 199), inset -1em -1em 2em rgb(255, 237, 199);
  outline: 1px solid #efefef;
  display: grid;
  grid-template-columns: calc((100% - 8px) * 0.4) calc((100% - 8px) * 0.6);
  grid-template-rows: auto;
  grid-template-areas: 'areaRechtsmittelTitle areaRechtsmittelTitle' 'fieldInstanz fieldInstanz' 'fieldEntscheidNr fieldEntscheidDatum'
    'fieldErledigung fieldErledigung' 'fieldRechtsmittelTxt fieldRechtsmittelTxt';
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  padding: 8px;
`
const Title = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: areaRechtsmittelTitle;
`
const FieldInstanz = styled.div`grid-area: fieldInstanz;`
const FieldEntscheidNr = styled.div`grid-area: fieldEntscheidNr;`
const FieldEntscheidDatum = styled.div`grid-area: fieldEntscheidDatum;`
const FieldErledigung = styled.div`grid-area: fieldErledigung;`
const FieldRechtsmittelTxt = styled.div`grid-area: fieldRechtsmittelTxt;`

const enhance = compose(inject('store'), observer)

const AreaRechtsmittel = ({ store, values, firstTabIndex, change, changeComparator }) => (
  <Container>
    <Title>Rekurs / Beschwerde</Title>
    <FieldInstanz>
      <ControlLabel>Instanz</ControlLabel>
      <InputGroup>
        <ComparatorSelector name="rechtsmittelInstanz" changeComparator={changeComparator} />
        <FormControl
          componentClass="select"
          value={values.rechtsmittelInstanz || ''}
          name="rechtsmittelInstanz"
          onChange={change}
          bsSize="small"
          tabIndex={1 + firstTabIndex}
        >
          {createOptions(store.geschaefte.rechtsmittelInstanzOptions)}
        </FormControl>
      </InputGroup>
    </FieldInstanz>
    <FieldEntscheidNr>
      <ControlLabel>Entscheid Nr.</ControlLabel>
      <InputGroup>
        <ComparatorSelector name="rechtsmittelEntscheidNr" changeComparator={changeComparator} />
        <FormControl
          type="number"
          value={values.rechtsmittelEntscheidNr || ''}
          name="rechtsmittelEntscheidNr"
          onChange={change}
          bsSize="small"
          tabIndex={2 + firstTabIndex}
        />
      </InputGroup>
    </FieldEntscheidNr>
    <FieldEntscheidDatum>
      <DateField
        name="rechtsmittelEntscheidDatum"
        label="Entscheid Datum"
        tabIndex={3 + firstTabIndex}
        values={values}
        change={change}
        changeComparator={changeComparator}
      />
    </FieldEntscheidDatum>
    <FieldErledigung>
      <ControlLabel>Erledigung</ControlLabel>
      <InputGroup>
        <ComparatorSelector name="rechtsmittelErledigung" changeComparator={changeComparator} />
        <FormControl
          componentClass="select"
          value={values.rechtsmittelErledigung || ''}
          name="rechtsmittelErledigung"
          onChange={change}
          bsSize="small"
          tabIndex={4 + firstTabIndex}
        >
          {createOptions(store.geschaefte.rechtsmittelErledigungOptions)}
        </FormControl>
      </InputGroup>
    </FieldErledigung>
    <FieldRechtsmittelTxt>
      <ControlLabel>Bemerkungen</ControlLabel>
      <Input name="rechtsmittelTxt" change={change} values={values} changeComparator={changeComparator} tabIndex={5 + firstTabIndex} />
    </FieldRechtsmittelTxt>
  </Container>
)

AreaRechtsmittel.displayName = 'AreaRechtsmittel'

AreaRechtsmittel.propTypes = {
  store: PropTypes.object.isRequired,
  values: PropTypes.object,
  firstTabIndex: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(AreaRechtsmittel)
