import React, { PropTypes } from 'react'
import { ControlLabel } from 'react-bootstrap'
import Input from '../../containers/filterFields/Input'
import styles from './areaHistory.css'

const AreaHistory = ({
  values,
  change,
  changeComparator,
  firstTabIndex,
}) =>
  <div className={styles.areaHistory}>
    <div className={styles.areaHistoryTitle}>
      Historie
    </div>
    <ControlLabel>
      Vorgeschäft
    </ControlLabel>
    <div className={styles.fieldVorgeschaeft}>
      <Input
        name="idVorgeschaeft"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={1 + firstTabIndex}
      />
    </div>
  </div>

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
}

export default AreaHistory
