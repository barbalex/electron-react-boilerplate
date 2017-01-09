import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'

import regularStyles from './areaPersonen.css'
import pdfStyles from './areaPersonenPdf.css'
import KontakteIntern from '../../containers/geschaeft/KontakteIntern'
import KontakteExtern from '../../containers/geschaeft/KontakteExtern'

const verwantwortlichOptions = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptions, o => {
    const sort = `${o.name || 'zz'} ${o.vorname || 'zz'} (${o.kurzzeichen})`
    return sort.toLowerCase()
  })
  const options = interneOptionsSorted.map((o) => {
    const name = `${o.name || '(kein Name)'} ${o.vorname || '(kein Vorname)'} (${o.kurzzeichen})`
    return (
      <option
        key={o.id}
        value={o.kurzzeichen}
      >
        {name}
      </option>
    )
  })
  options.unshift(<option key={0} value="" />)
  return options
}

const verantwortlichData = (geschaeft, interneOptions) => {
  const data = interneOptions.find(o =>
    o.kurzzeichen === geschaeft.verantwortlich
  )
  if (!data) return ''
  const abt = data.abteilung ? `${data.abteilung}` : ''
  const emailHtml = (
    <a
      href={`mailto:${data.eMail}`}
    >
      {data.eMail}
    </a>
  )
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  if (data.eMail) {
    return (
      <span>{`${abt}, `}{emailHtml}{`${telefon}`}</span>
    )
  }
  return <span>{`${abt}${telefon}`}</span>
}

const AreaPersonen = ({
  geschaeft,
  nrOfFieldsBeforePersonen = 0,
  change,
  blur,
  interneOptions,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles
  return (
    <div className={styles.container}>
      <div className={styles.areaPersonen}>
        <div className={styles.areaPersonenTitle}>
          Personen
        </div>
        <div className={styles.areaVerantwortlichSubTitle}>
          Verantwortlich
        </div>
        <div className={styles.fieldVerantwortlich}>
          <FormControl
            componentClass="select"
            value={geschaeft.verantwortlich || ''}
            name="verantwortlich"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePersonen}
          >
            {verwantwortlichOptions(interneOptions)}
          </FormControl>
        </div>
        <div className={styles.fieldVerantwortlichName}>
          <FormControl.Static>
            {verantwortlichData(geschaeft, interneOptions)}
          </FormControl.Static>
        </div>
        <div className={styles.areaInterneKontakteSubTitle}>
          Interne Kontakte
        </div>
        <KontakteIntern
          tabIndex={nrOfFieldsBeforePersonen + 1}
        />
        <div className={styles.areaExterneKontakteSubTitle}>
          Externe Kontakte
        </div>
        <KontakteExtern
          tabIndex={nrOfFieldsBeforePersonen + 2}
        />
      </div>
    </div>
  )
}

AreaPersonen.displayName = 'AreaPersonen'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaPersonen.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  interneOptions: PropTypes.array,
  nrOfFieldsBeforePersonen: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaPersonen
