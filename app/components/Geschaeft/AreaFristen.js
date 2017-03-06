import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import regularStyles from './areaFristen.css'
import pdfStyles from './areaFristenPdf.css'
import DateField from './DateField'

moment.locale('de')

const statusFristInStyle = (dauerBisFristMitarbeiter, styles) => {
  if (dauerBisFristMitarbeiter < 0) {
    return [styles.fieldWarnungFaellig, 'formControlStatic'].join(' ')
  }
  if (dauerBisFristMitarbeiter === 0) {
    return [styles.fieldWarnungHeute, 'formControlStatic'].join(' ')
  }
  return 'formControlStatic'
}

const fieldFristDauerBisMitarbeiter = (geschaeft, styles) => (
  <div className={regularStyles.fieldFristDauerBisMitarbeiter}>
    <ControlLabel>
      Tage bis Frist Mitarbeiter
    </ControlLabel>
    <FormControl.Static
      style={{
        paddingTop: 0,
        marginTop: 0,
      }}
      className={statusFristInStyle(geschaeft.dauerBisFristMitarbeiter, styles)}
    >
      {geschaeft.dauerBisFristMitarbeiter}
    </FormControl.Static>
  </div>
)

const enhance = compose(
  inject('store'),
  observer
)

const AreaFristen = ({
  store,
  blur,
  change,
  nrOfFieldsBeforeFristen,
  onChangeDatePicker,
}) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const path = store.history.location.pathname
  const isPrintPreview = path === '/geschaeftPdf'
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === activeId
  ) || {}
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaFristen}>
      <div className={styles.areaFristenTitle}>
        Fristen
      </div>
      {
        !(!geschaeft.datumEingangAwel && isPrintPreview) &&
        <DateField
          name="datumEingangAwel"
          label="Datum des Eingangs im AWEL"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={1 + nrOfFieldsBeforeFristen}
        />
      }
      {
        !(!geschaeft.fristAwel && isPrintPreview) &&
        <DateField
          name="fristAwel"
          label="Frist für Erledigung durch AWEL"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={2 + nrOfFieldsBeforeFristen}
        />
      }
      {
        !(!geschaeft.fristAmtschef && isPrintPreview) &&
        <DateField
          name="fristAmtschef"
          label="Frist Vorlage an Amtschef"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={3 + nrOfFieldsBeforeFristen}
        />
      }
      {
        !(!geschaeft.fristAbteilung && isPrintPreview) &&
        <DateField
          name="fristAbteilung"
          label="Frist für Erledigung durch Abteilung"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={4 + nrOfFieldsBeforeFristen}
        />
      }
      {
        !(!geschaeft.fristMitarbeiter && isPrintPreview) &&
        <DateField
          name="fristMitarbeiter"
          label="Frist Erledigung nächster Schritt Re"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={5 + nrOfFieldsBeforeFristen}
        />
      }
      {
        !!geschaeft.dauerBisFristMitarbeiter &&
        fieldFristDauerBisMitarbeiter(geschaeft, styles)
      }
      {
        !(!geschaeft.datumAusgangAwel && isPrintPreview) &&
        <DateField
          name="datumAusgangAwel"
          label="Datum Ausgang AWEL (erledigt)"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={6 + nrOfFieldsBeforeFristen}
        />
      }
      {
        !(!geschaeft.fristDirektion && isPrintPreview) &&
        <DateField
          name="fristDirektion"
          label="Frist für Erledigung durch Direktion"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={7 + nrOfFieldsBeforeFristen}
        />
      }
    </div>
  )
}

AreaFristen.displayName = 'AreaFristen'

AreaFristen.propTypes = {
  store: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  nrOfFieldsBeforeFristen: PropTypes.number.isRequired,
}

export default enhance(AreaFristen)