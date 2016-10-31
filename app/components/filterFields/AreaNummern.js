import React, { PropTypes } from 'react'
import { ControlLabel } from 'react-bootstrap'
import Input from '../../containers/filterFields/Input'
import styles from './areaNummern.css'

const AreaNummern = ({
  values,
  firstTabIndex,
  change,
  changeComparator,
}) =>
  <div className={styles.areaNummern}>
    <div className={styles.areaNummernTitle}>
      Nummern
    </div>
    <ControlLabel className={styles.labelNr}>
      <div className={styles.labelNrDiv}>
        Nr.
      </div>
    </ControlLabel>
    <ControlLabel className={styles.labelIdGeschaeft}>
      ID
    </ControlLabel>
    <div className={styles.fieldIdGeschaeft}>
      <Input
        type="number"
        name="idGeschaeft"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={1 + firstTabIndex}
      />
    </div>
    <ControlLabel className={styles.labelGekoNr}>
      Geko
    </ControlLabel>
    <div className={styles.fieldGekoNr}>
      <Input
        type="number"
        name="gekoNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={2 + firstTabIndex}
      />
    </div>
    <div className={styles.labelJahre}>
      <div className={styles.labelNrDiv}>
        Jahr
      </div>
    </div>
    <ControlLabel className={styles.labelEntscheidAwel}>
      AWEL
    </ControlLabel>
    <div className={styles.fieldEntscheidAwelNr}>
      <Input
        type="number"
        name="entscheidAwelNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={3 + firstTabIndex}
      />
    </div>
    <div className={styles.slashAwel}>
      <div>/</div>
    </div>
    <div className={styles.fieldEntscheidAwelJahr}>
      <Input
        type="number"
        name="entscheidAwelJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={4 + firstTabIndex}
      />
    </div>
    <ControlLabel className={styles.labelEntscheidBdv}>
      BDV
    </ControlLabel>
    <div className={styles.fieldEntscheidBdvNr}>
      <Input
        type="number"
        name="entscheidBdvNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={5 + firstTabIndex}
      />
    </div>
    <div className={styles.slashBdv}>
      <div>/</div>
    </div>
    <div className={styles.fieldEntscheidBdvJahr}>
      <Input
        type="number"
        name="entscheidBdvJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={6 + firstTabIndex}
      />
    </div>
    <ControlLabel className={styles.labelEntscheidKr}>
      KR
    </ControlLabel>
    <div className={styles.fieldEntscheidKrNr}>
      <Input
        type="number"
        name="entscheidKrNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={7 + firstTabIndex}
      />
    </div>
    <div className={styles.slashKr}>
      <div>/</div>
    </div>
    <div className={styles.fieldEntscheidKrJahr}>
      <Input
        type="number"
        name="entscheidKrJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={8 + firstTabIndex}
      />
    </div>
    <ControlLabel className={styles.labelEntscheidRrb}>
      RRB
    </ControlLabel>
    <div className={styles.fieldEntscheidRrbNr}>
      <Input
        type="number"
        name="entscheidRrbNr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={9 + firstTabIndex}
      />
    </div>
    <div className={styles.slashRrb}>
      <div>/</div>
    </div>
    <div className={styles.fieldEntscheidRrbJahr}>
      <Input
        type="number"
        name="entscheidRrbJahr"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={10 + firstTabIndex}
      />
    </div>
    <div className={styles.fieldAktenstandort}>
      <ControlLabel>
        Aktenstandort
      </ControlLabel>
      <Input
        type="text"
        name="aktenstandort"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={11 + firstTabIndex}
      />
    </div>
    <div className={styles.fieldAktennummer}>
      <ControlLabel>
        Nr.
      </ControlLabel>
      <Input
        type="text"
        name="aktennummer"
        change={change}
        values={values}
        changeComparator={changeComparator}
        tabIndex={12 + firstTabIndex}
      />
    </div>
  </div>

AreaNummern.displayName = 'AreaNummern'

AreaNummern.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default AreaNummern
