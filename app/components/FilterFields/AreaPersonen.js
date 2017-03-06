import React, { PropTypes } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import _ from 'lodash'
import Linkify from 'react-linkify'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import ComparatorSelector from './ComparatorSelector'
import SortSelector from './SortSelector'
import styles from './areaPersonen.css'

const interneOptionsList = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptions, o => {
    const sort = `${o.name || 'zz'} ${o.vorname || 'zz'} (${o.kurzzeichen})`
    return sort.toLowerCase()
  })
  const options = interneOptionsSorted.map((o, index) => {
    const name = `${o.vorname || ''} ${o.name || ''}`
    return (
      <option
        key={index + 1}
        value={name}
      >
        {`${o.name || '(kein Name)'} ${o.vorname || '(kein Vorname)'} (${o.kurzzeichen})`}
      </option>
    )
  })
  options.unshift(<option key={0} value="" />)
  return options
}

const verantwortlichOptionsList = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptions, o => {
    const sort = `${o.name || 'zz'} ${o.vorname || 'zz'} (${o.kurzzeichen})`
    return sort.toLowerCase()
  })
  const options = interneOptionsSorted.map((o, index) => (
    <option
      key={index + 1}
      value={o.kurzzeichen}
    >
      {`${o.name || '(kein Name)'} ${o.vorname || '(kein Vorname)'} (${o.kurzzeichen})`}
    </option>
  ))
  options.unshift(<option key={0} value="" />)
  return options
}

const externeOptionsList = (externeOptions) => {
  // sort externeOptions by nameVorname
  const externeOptionsSorted = _.sortBy(externeOptions, o =>
    o.nameVorname.toLowerCase()
  )
  const options = externeOptionsSorted.map((o, index) =>
    <option
      key={index + 1}
      value={o.nameVorname}
    >
      {o.nameVorname}
    </option>
  )
  options.unshift(
    <option
      key={0}
      value=""
    />
  )
  return options
}

const verantwortlichData = (values, interneOptions) => {
  const data = interneOptions.find(o =>
    o.kurzzeichen === values.verantwortlich
  )
  if (!data) return ''
  const abt = data.abteilung ? `${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return <Linkify>{`${abt}${eMail}${telefon}`}</Linkify>
}

const interneData = (values, interneOptions) => {
  const data = interneOptions.find((o) => {
    const name = `${o.vorname || ''} ${o.name || ''}`
    return name === values.kontaktInternVornameName
  })
  if (!data) return ''
  const abt = data.abteilung ? `${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return <Linkify>{`${abt}${eMail}${telefon}`}</Linkify>
}

const externeData = (values, externeOptions) => {
  function addValueToInfo(info, value) {
    if (!value) return info
    if (info) return `${info}, ${value}`
    return value
  }
  const data = externeOptions.find(o =>
    o.nameVorname === values.kontaktExternNameVorname
  )
  if (!data) return ''
  let info = ''
  info = addValueToInfo(info, data.firma)
  info = addValueToInfo(info, data.email)
  info = addValueToInfo(info, data.telefon)
  return <Linkify>{info}</Linkify>
}

const enhance = compose(
  inject('store'),
  observer
)

const AreaPersonen = ({
  store,
  values,
  firstTabIndex = 0,
  change,
  changeComparator,
}) =>
  <div className={styles.container}>
    <div className={styles.areaPersonen}>
      <div className={styles.areaPersonenTitle}>
        Personen
      </div>
      <div className={styles.areaVerantwortlichSubTitle}>
        Verantwortlich
      </div>
      <div className={styles.KontaktInternVornameName}>
        <InputGroup>
          <SortSelector
            name="verantwortlich"
          />
          <ComparatorSelector
            name="verantwortlich"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.verantwortlich || ''}
            name="verantwortlich"
            onChange={change}
            bsSize="small"
            tabIndex={1 + firstTabIndex}
            className={styles.narrowVerantwDropdown}
          >
            {verantwortlichOptionsList(store.geschaefte.interneOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldVerantwortlichName}>
        <FormControl.Static>
          {verantwortlichData(values, store.geschaefte.interneOptions)}
        </FormControl.Static>
      </div>
      <div className={styles.areaInterneKontakteSubTitle}>
        Interne Kontakte
      </div>
      <div className={styles.KontaktInternVornameName}>
        <InputGroup>
          <SortSelector
            name="kontaktInternVornameName"
          />
          <ComparatorSelector
            name="kontaktInternVornameName"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.kontaktInternVornameName || ''}
            name="kontaktInternVornameName"
            onChange={change}
            bsSize="small"
            tabIndex={2 + firstTabIndex}
            className={styles.narrowVerantwDropdown}
          >
            {interneOptionsList(store.geschaefte.interneOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldVerantwortlichName}>
        <FormControl.Static>
          {interneData(values, store.geschaefte.interneOptions)}
        </FormControl.Static>
      </div>

      <div className={styles.areaExterneKontakteSubTitle}>
        Externe Kontakte
      </div>
      <div className={styles.KontaktExternVornameName}>
        <InputGroup>
          <SortSelector
            name="kontaktExternNameVorname"
          />
          <ComparatorSelector
            name="kontaktExternNameVorname"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.kontaktExternNameVorname || ''}
            name="kontaktExternNameVorname"
            onChange={change}
            bsSize="small"
            tabIndex={3 + firstTabIndex}
            className={styles.verantwDropdown}
          >
            {externeOptionsList(store.geschaefte.externeOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldVerantwortlichName}>
        <FormControl.Static>
          {externeData(values, store.geschaefte.externeOptions)}
        </FormControl.Static>
      </div>
    </div>
  </div>

AreaPersonen.displayName = 'AreaPersonen'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaPersonen.propTypes = {
  store: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default enhance(AreaPersonen)