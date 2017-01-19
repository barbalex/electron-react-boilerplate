import React, { PropTypes } from 'react'
import {
  FormControl,
  ControlLabel,
} from 'react-bootstrap'
import Textarea from 'react-textarea-autosize'
import regularStyles from './areaRechtsmittel.css'
import pdfStyles from './areaRechtsmittelPdf.css'
import DateField from '../../containers/geschaeft/DateField'
import createOptions from '../../src/createOptions'

const AreaRechtsmittel = ({
  geschaeft,
  rechtsmittelErledigungOptions,
  rechtsmittelInstanzOptions,
  nrOfFieldsBeforePv,
  change,
  blur,
  onChangeDatePicker,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaForGeschaeftsart}>
      <div className={styles.areaRechtsmittelTitle}>
        Rekurs / Beschwerde
      </div>
      {
        !(isPrintPreview && !geschaeft.rechtsmittelInstanz) &&
        <div className={styles.fieldInstanz}>
          <ControlLabel>
            Instanz
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.rechtsmittelInstanz || ''}
            name="rechtsmittelInstanz"
            onChange={change}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePv}
          >
            {createOptions(rechtsmittelInstanzOptions)}
          </FormControl>
        </div>
      }
      {
        !(isPrintPreview && !geschaeft.rechtsmittelEntscheidNr) &&
        <div className={styles.fieldEntscheidNr}>
          <ControlLabel>
            Entscheid Nr.
          </ControlLabel>
          <FormControl
            type="number"
            value={geschaeft.rechtsmittelEntscheidNr || ''}
            name="rechtsmittelEntscheidNr"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={2 + nrOfFieldsBeforePv}
          />
        </div>
      }
      {
        !(isPrintPreview && !geschaeft.rechtsmittelEntscheidDatum) &&
        <div className={styles.fieldEntscheidDatum}>
          <DateField
            name="rechtsmittelEntscheidDatum"
            label="Entscheid Datum"
            change={change}
            blur={blur}
            onChangeDatePicker={onChangeDatePicker}
            tabIndex={3 + nrOfFieldsBeforePv}
          />
        </div>
      }
      {
        !(isPrintPreview && !geschaeft.rechtsmittelErledigung) &&
        <div className={styles.fieldErledigung}>
          <ControlLabel>
            Erledigung
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.rechtsmittelErledigung || ''}
            name="rechtsmittelErledigung"
            onChange={change}
            bsSize="small"
            tabIndex={4 + nrOfFieldsBeforePv}
          >
            {createOptions(rechtsmittelErledigungOptions)}
          </FormControl>
        </div>
      }
      {
        !(isPrintPreview && !geschaeft.rechtsmittelTxt) &&
        <div className={styles.fieldRechtsmittelTxt}>
          <ControlLabel>
            Bemerkungen
          </ControlLabel>
          <Textarea
            value={geschaeft.rechtsmittelTxt || ''}
            name="rechtsmittelTxt"
            onChange={change}
            onBlur={blur}
            tabIndex={5 + nrOfFieldsBeforePv}
            className={styles.textarea}
          />
        </div>
      }
    </div>
  )
}

AreaRechtsmittel.displayName = 'AreaRechtsmittel'

AreaRechtsmittel.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  rechtsmittelErledigungOptions: PropTypes.array.isRequired,
  rechtsmittelInstanzOptions: PropTypes.array.isRequired,
  nrOfFieldsBeforePv: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaRechtsmittel
