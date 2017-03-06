import React, { PropTypes } from 'react'
import { ControlLabel } from 'react-bootstrap'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import styles from './areaGeschaeft.css'
import SelectInput from './SelectInput'
import Input from './Input'

const enhance = compose(
  inject('store'),
  observer
)

const AreaGeschaeft = ({
  store,
  change,
  values,
  firstTabIndex,
  changeComparator,
}) => {
  const {
    statusOptions,
    geschaeftsartOptions,
    abteilungOptions,
  } = store.geschaefte

  return (
    <div className={styles.areaGeschaeft}>
      <div className={styles.areaGeschaeftTitle}>
        Geschäft
      </div>
      <div className={styles.fieldGegenstand}>
        <ControlLabel>
          Gegenstand
        </ControlLabel>
        <Input
          name="gegenstand"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={1 + firstTabIndex}
        />
      </div>
      <div className={styles.fieldAusloeser}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <Input
          name="ausloeser"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={2 + firstTabIndex}
        />
      </div>
      <div className={styles.fieldOrt}>
        <ControlLabel>
          Ort
        </ControlLabel>
        <Input
          name="ort"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={3 + firstTabIndex}
        />
      </div>
      <div className={styles.fieldGeschaeftsart}>
        <ControlLabel>
          Geschäftsart
        </ControlLabel>
        <SelectInput
          name="geschaeftsart"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={4 + firstTabIndex}
          options={toJS(geschaeftsartOptions)}
        />
      </div>
      <div className={styles.fieldStatus}>
        <ControlLabel>
          Status
        </ControlLabel>
        <SelectInput
          name="status"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={5 + firstTabIndex}
          options={toJS(statusOptions)}
        />
      </div>
      <div className={styles.fieldAbteilung}>
        <ControlLabel>
          Abteilung
        </ControlLabel>
        <SelectInput
          name="abteilung"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={6 + firstTabIndex}
          options={toJS(abteilungOptions)}
        />
      </div>
      <div className={styles.fieldDetails}>
        <ControlLabel>
          Details
        </ControlLabel>
        <Input
          name="details"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={7 + firstTabIndex}
        />
      </div>
      <div className={styles.fieldNaechsterSchritt}>
        <ControlLabel>
          Nächster Schritt
        </ControlLabel>
        <Input
          name="naechsterSchritt"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={8 + firstTabIndex}
        />
      </div>
      <div className={styles.fieldVermerk}>
        <ControlLabel>
          Vermerk
        </ControlLabel>
        <Input
          name="vermerk"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={9 + firstTabIndex}
        />
      </div>
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <Input
          name="vermerkIntern"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={10 + firstTabIndex}
        />
      </div>
    </div>
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
  values: PropTypes.object.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(AreaGeschaeft)