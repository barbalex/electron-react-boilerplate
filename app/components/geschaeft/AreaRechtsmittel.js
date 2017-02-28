import React, { PropTypes } from 'react'
import {
  FormControl,
  ControlLabel,
} from 'react-bootstrap'
import Textarea from 'react-textarea-autosize'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import regularStyles from './areaRechtsmittel.css'
import pdfStyles from './areaRechtsmittelPdf.css'
import DateField from './DateField'
import createOptions from '../../src/createOptions'

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const {
      store,
      routing,
      blur,
      change,
      nrOfFieldsBeforePv,
      onChangeDatePicker,
    } = props
    const {
      activeId,
      geschaefte,
      rechtsmittelErledigungOptions,
      rechtsmittelInstanzOptions,
    } = store.geschaefte
    const path = routing.locationBeforeTransitions.pathname
    const isPrintPreview = path === '/geschaeftPdf'
    const geschaeft = geschaefte.find(g =>
      g.idGeschaeft === activeId
    )
    return {
      geschaeft,
      rechtsmittelErledigungOptions,
      rechtsmittelInstanzOptions,
      change,
      blur,
      nrOfFieldsBeforePv,
      onChangeDatePicker,
      isPrintPreview,
    }
  }),
  observer
)

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

export default enhance(AreaRechtsmittel)
