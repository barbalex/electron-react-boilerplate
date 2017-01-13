import React, { PropTypes } from 'react'
import {
  FormControl,
  ControlLabel,
  Radio,
} from 'react-bootstrap'
import regularStyles from './areaParlVorstoss.css'
import pdfStyles from './areaParlVorstossPdf.css'
import createOptions from '../../src/createOptions'

const AreaParlVorstoss = ({
  geschaeft,
  parlVorstossTypOptions,
  nrOfFieldsBeforePv,
  change,
  blur,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaForGeschaeftsart}>
      <div className={styles.areaParlVorstTitle}>
        Parlamentarischer Vorstoss
      </div>
      <div className={styles.fieldParlVorstossTyp}>
        <ControlLabel>
          Typ
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.parlVorstossTyp || ''}
          name="parlVorstossTyp"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={1 + nrOfFieldsBeforePv}
        >
          {createOptions(parlVorstossTypOptions)}
        </FormControl>
      </div>
      <div className={styles.fieldStufe}>
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
      <div className={styles.fieldZustaendigkeit}>
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
    </div>
  )
}

AreaParlVorstoss.displayName = 'AreaParlVorstoss'

AreaParlVorstoss.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  parlVorstossTypOptions: PropTypes.array.isRequired,
  nrOfFieldsBeforePv: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaParlVorstoss
