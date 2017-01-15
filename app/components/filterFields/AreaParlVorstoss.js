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
        checked={values.parlVorstossStufe === '1'}
        onChange={change}
        bsSize="small"
        name="parlVorstossStufe"
        tabIndex={2 + firstTabIndex}
      >
        1: nicht überwiesen
      </Radio>
      <Radio
        data-value={2}
        checked={values.parlVorstossStufe === '2'}
        name="parlVorstossStufe"
        onChange={change}
        bsSize="small"
        tabIndex={3 + firstTabIndex}
      >
        2: überwiesen
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
