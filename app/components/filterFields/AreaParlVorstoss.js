import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, Radio, InputGroup } from 'react-bootstrap'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import styles from './areaParlVorstoss.css'
import createOptions from '../../src/createOptions'

const AreaParlVorstoss = ({
  values,
  parlVorstossTypOptions,
  firstTabIndex,
  change,
  changeComparator,
}) =>
  <div className={styles.areaForGeschaeftsart}>
    <div className={styles.areaParlVorstTitle}>
      Parlamentarischer Vorstoss
    </div>
    <div className={styles.fieldParlVorstossTyp}>
      <ControlLabel>
        Typ
      </ControlLabel>
      <InputGroup>
        <ComparatorSelector
          name="parlVorstossTyp"
          changeComparator={changeComparator}
        />
        <FormControl
          componentClass="select"
          value={values.parlVorstossTyp || ''}
          name="parlVorstossTyp"
          onChange={change}
          bsSize="small"
          tabIndex={1 + firstTabIndex}
        >
          {createOptions(parlVorstossTypOptions)}
        </FormControl>
      </InputGroup>
    </div>
    <div className={styles.fieldStufe}>
      <ControlLabel>
        Stufe
      </ControlLabel>
      <Radio
        data-value={1}
        checked={values.parlVorstossStufe === 1}
        onChange={change}
        bsSize="small"
        name="parlVorstossStufe"
        tabIndex={2 + firstTabIndex}
      >
        1: nicht überwiesen
      </Radio>
      <Radio
        data-value={2}
        checked={values.parlVorstossStufe === 2}
        name="parlVorstossStufe"
        onChange={change}
        bsSize="small"
        tabIndex={3 + firstTabIndex}
      >
        2: überwiesen
      </Radio>
    </div>
    <div className={styles.fieldEbene}>
      <ControlLabel>
        Ebene
      </ControlLabel>
      <Radio
        data-value="Kanton"
        checked={values.parlVorstossEbene === 'Kanton'}
        name="parlVorstossEbene"
        onChange={change}
        bsSize="small"
        tabIndex={4 + firstTabIndex}
      >
        Kanton
      </Radio>
      <Radio
        data-value="Bund"
        checked={values.parlVorstossEbene === 'Bund'}
        onChange={change}
        name="parlVorstossEbene"
        bsSize="small"
        tabIndex={5 + firstTabIndex}
      >
        Bund
      </Radio>
    </div>
    <div className={styles.fieldZustaendigkeit}>
      <ControlLabel>
        Zuständigkeit
      </ControlLabel>
      <Radio
        data-value="hauptzuständig"
        checked={values.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
        name="parlVorstossZustaendigkeitAwel"
        onChange={change}
        bsSize="small"
        tabIndex={6 + firstTabIndex}
      >
        haupt
      </Radio>
      <Radio
        data-value="mitberichtzuständig"
        checked={values.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
        name="parlVorstossZustaendigkeitAwel"
        onChange={change}
        bsSize="small"
        tabIndex={7 + firstTabIndex}
      >
        mitbericht
      </Radio>
    </div>
    <div className={styles.fieldErlassform}>
      <ControlLabel>
        Erlassform
      </ControlLabel>
      <Radio
        data-value="Gesetz"
        checked={values.erlassform === 'Gesetz'}
        name="erlassform"
        onChange={change}
        bsSize="small"
        tabIndex={8 + firstTabIndex}
      >
        Gesetz
      </Radio>
      <Radio
        data-value="Verordnung"
        checked={values.erlassform === 'Verordnung'}
        name="erlassform"
        onChange={change}
        bsSize="small"
        tabIndex={9 + firstTabIndex}
      >
        Verordnung
      </Radio>
    </div>
  </div>

AreaParlVorstoss.displayName = 'AreaParlVorstoss'

AreaParlVorstoss.propTypes = {
  values: PropTypes.object,
  parlVorstossTypOptions: PropTypes.array.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default AreaParlVorstoss
