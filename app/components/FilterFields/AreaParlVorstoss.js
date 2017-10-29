import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, Radio, InputGroup } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import ComparatorSelector from './ComparatorSelector'
import styles from './areaParlVorstoss.css'
import createOptions from '../../src/createOptions'

const enhance = compose(inject('store'), observer)

const AreaParlVorstoss = ({ store, values, firstTabIndex, change, changeComparator }) => (
  <div className={styles.areaForGeschaeftsart}>
    <div className={styles.areaParlVorstTitle}>Parlamentarischer Vorstoss</div>
    <div className={styles.fieldParlVorstossTyp}>
      <ControlLabel>Typ</ControlLabel>
      <InputGroup>
        <ComparatorSelector name="parlVorstossTyp" changeComparator={changeComparator} />
        <FormControl
          componentClass="select"
          value={values.parlVorstossTyp || ''}
          name="parlVorstossTyp"
          onChange={change}
          bsSize="small"
          tabIndex={1 + firstTabIndex}
        >
          {createOptions(store.geschaefte.parlVorstossTypOptions)}
        </FormControl>
      </InputGroup>
    </div>
    <div className={styles.fieldStufe}>
      <ControlLabel>Stufe</ControlLabel>
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
      <ControlLabel>Zuständigkeit</ControlLabel>
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
)

AreaParlVorstoss.displayName = 'AreaParlVorstoss'

AreaParlVorstoss.propTypes = {
  store: PropTypes.object.isRequired,
  values: PropTypes.object,
  firstTabIndex: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(AreaParlVorstoss)
