import React, { PropTypes } from 'react'
import {
  FormControl,
  ControlLabel,
  InputGroup,
} from 'react-bootstrap'
import moment from 'moment'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import styles from './areaRechtsmittel.css'
import createOptions from '../../src/createOptions'
import DateField from '../../containers/filterFields/DateField'

moment.locale('de')

const AreaRechtsmittel = ({
  values,
  rechtsmittelErledigungOptions,
  rechtsmittelInstanzOptions,
  firstTabIndex,
  change,
  changeComparator,
}) =>
  <div className={styles.areaForGeschaeftsart}>
    <div className={styles.areaRechtsmittelTitle}>
      Rekurs / Beschwerde
    </div>
    <div className={styles.fieldInstanz}>
      <ControlLabel>
        Instanz
      </ControlLabel>
      <InputGroup>
        <ComparatorSelector
          name="rechtsmittelInstanz"
          changeComparator={changeComparator}
        />
        <FormControl
          componentClass="select"
          value={values.rechtsmittelInstanz || ''}
          name="rechtsmittelInstanz"
          onChange={change}
          bsSize="small"
          tabIndex={1 + firstTabIndex}
        >
          {createOptions(rechtsmittelInstanzOptions)}
        </FormControl>
      </InputGroup>
    </div>
    <div className={styles.fieldEntscheidNr}>
      <ControlLabel>
        Entscheid Nr.
      </ControlLabel>
      <InputGroup>
        <ComparatorSelector
          name="rechtsmittelEntscheidNr"
          changeComparator={changeComparator}
        />
        <FormControl
          type="number"
          value={values.rechtsmittelEntscheidNr || ''}
          name="rechtsmittelEntscheidNr"
          onChange={change}
          bsSize="small"
          tabIndex={2 + firstTabIndex}
        />
      </InputGroup>
    </div>
    <DateField
      name="rechtsmittelEntscheidDatum"
      label="Entscheid Datum"
      tabIndex={3 + firstTabIndex}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <div className={styles.fieldErledigung}>
      <ControlLabel>
        Erledigung
      </ControlLabel>
      <InputGroup>
        <ComparatorSelector
          name="rechtsmittelErledigung"
          changeComparator={changeComparator}
        />
        <FormControl
          componentClass="select"
          value={values.rechtsmittelErledigung || ''}
          name="rechtsmittelErledigung"
          onChange={change}
          bsSize="small"
          tabIndex={4 + firstTabIndex}
        >
          {createOptions(rechtsmittelErledigungOptions)}
        </FormControl>
      </InputGroup>
    </div>
  </div>

AreaRechtsmittel.displayName = 'AreaRechtsmittel'

AreaRechtsmittel.propTypes = {
  values: PropTypes.object,
  rechtsmittelErledigungOptions: PropTypes.array.isRequired,
  rechtsmittelInstanzOptions: PropTypes.array.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default AreaRechtsmittel
