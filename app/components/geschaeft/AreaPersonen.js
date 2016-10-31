import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import regularStyles from './areaPersonen.css'
import pdfStyles from './areaPersonenPdf.css'
import KontakteIntern from '../../containers/geschaeft/KontakteIntern'
import KontakteExtern from '../../containers/geschaeft/KontakteExtern'

const verwantwortlichOptions = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptions, o =>
    o.kurzzeichen.toLowerCase()
  )
  const options = interneOptionsSorted.map((o, index) => {
    let times = 5 - o.kurzzeichen.length
    // make sure, times is never < 0
    if (times < 0) {
      times = 0
    }
    const space = '\xa0'.repeat(times)
    const name = `${o.vorname || ''} ${o.name || ''}`
    return (
      <option
        key={index + 1}
        value={o.kurzzeichen}
      >
        {`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${name}`}
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
  const name = `${data.vorname || ''} ${data.name || ''}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
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
            className={styles.verantwDropdown}
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
