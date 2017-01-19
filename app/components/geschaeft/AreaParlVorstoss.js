import React, { PropTypes } from 'react'
import {
  FormControl,
  ControlLabel,
  Radio,
} from 'react-bootstrap'
import regularStyles from './areaParlVorstoss.css'
import pdfStyles from './areaParlVorstossPdf.css'
import createOptions from '../../src/createOptions'

const parlVorstossStufe = ({ isPrintPreview, geschaeft, change, nrOfFieldsBeforePv }) => {
  if (!isPrintPreview) {
    return (
      <div>
        <ControlLabel>
          Stufe
        </ControlLabel>
        <Radio
          data-value="1"
          checked={geschaeft.parlVorstossStufe === '1'}
          onChange={change}
          bsSize="small"
          name="parlVorstossStufe"
          tabIndex={2 + nrOfFieldsBeforePv}
        >
          1: nicht überwiesen
        </Radio>
        <Radio
          data-value="2"
          checked={geschaeft.parlVorstossStufe === '2'}
          name="parlVorstossStufe"
          onChange={change}
          bsSize="small"
          tabIndex={3 + nrOfFieldsBeforePv}
        >
          2: überwiesen
        </Radio>
      </div>
    )
  }
  let value = ''
  if (geschaeft.parlVorstossStufe === '1') value = '1: nicht überwiesen'
  if (geschaeft.parlVorstossStufe === '2') value = '2: überwiesen'
  return (
    <div>
      <ControlLabel>
        Stufe
      </ControlLabel>
      <FormControl
        type="text"
        defaultValue={value}
        bsSize="small"
        tabIndex={2 + nrOfFieldsBeforePv}
      />
    </div>
  )
}

const parlVorstossZustaendigkeit = ({ isPrintPreview, geschaeft, change, nrOfFieldsBeforePv }) => {
  if (!isPrintPreview) {
    return (
      <div>
        <ControlLabel>
          Zuständigkeit
        </ControlLabel>
        <Radio
          data-value="hauptzuständig"
          checked={geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
          name="parlVorstossZustaendigkeitAwel"
          onChange={change}
          bsSize="small"
          tabIndex={6 + nrOfFieldsBeforePv}
        >
          haupt
        </Radio>
        <Radio
          data-value="mitberichtzuständig"
          checked={geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
          name="parlVorstossZustaendigkeitAwel"
          onChange={change}
          bsSize="small"
          tabIndex={7 + nrOfFieldsBeforePv}
        >
          mitbericht
        </Radio>
      </div>
    )
  }
  const value = (
    geschaeft.parlVorstossZustaendigkeitAwel ?
    geschaeft.parlVorstossZustaendigkeitAwel.replace('zuständig', '') :
    ''
  )
  return (
    <div>
      <ControlLabel>
        Zuständigkeit
      </ControlLabel>
      <FormControl
        type="text"
        defaultValue={value}
        bsSize="small"
        tabIndex={6 + nrOfFieldsBeforePv}
      />
    </div>
  )
}

const AreaParlVorstoss = ({
  geschaeft,
  parlVorstossTypOptions,
  nrOfFieldsBeforePv,
  change,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaForGeschaeftsart}>
      <div className={styles.areaParlVorstTitle}>
        Parlamentarischer Vorstoss
      </div>
      {
        !(isPrintPreview && !geschaeft.parlVorstossTyp) &&
        <div className={styles.fieldParlVorstossTyp}>
          <ControlLabel>
            Typ
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.parlVorstossTyp || ''}
            name="parlVorstossTyp"
            onChange={change}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePv}
          >
            {createOptions(parlVorstossTypOptions)}
          </FormControl>
        </div>
      }
      {
        !(isPrintPreview && !geschaeft.parlVorstossStufe) &&
        <div className={styles.fieldStufe}>
          {parlVorstossStufe({ isPrintPreview, geschaeft, change, nrOfFieldsBeforePv })}
        </div>
      }
      {
        !(isPrintPreview && !geschaeft.parlVorstossZustaendigkeitAwel) &&
        <div className={styles.fieldZustaendigkeit}>
          {parlVorstossZustaendigkeit({ isPrintPreview, geschaeft, change, nrOfFieldsBeforePv })}
        </div>
      }
    </div>
  )
}

AreaParlVorstoss.displayName = 'AreaParlVorstoss'

AreaParlVorstoss.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  parlVorstossTypOptions: PropTypes.array.isRequired,
  nrOfFieldsBeforePv: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaParlVorstoss
