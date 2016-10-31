import React, { PropTypes } from 'react'
import {
  FormControl,
  ControlLabel,
} from 'react-bootstrap'
import moment from 'moment'
import regularStyles from './areaFristen.css'
import pdfStyles from './areaFristenPdf.css'
import DateField from '../../containers/geschaeft/DateField'

moment.locale('de')

const statusFristInStyle = (dauerBisFristMitarbeiter, styles) => {
  if (dauerBisFristMitarbeiter < 0) {
    return [styles.fieldFristInFaellig, 'formControlStatic'].join(' ')
  }
  if (dauerBisFristMitarbeiter === 0) {
    return [styles.fieldFristInHeute, 'formControlStatic'].join(' ')
  }
  return 'formControlStatic'
}

const fristDauerBisMitarbeiter = (geschaeft) => {
  const now = moment()
  const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
  const duration = moment.duration(end.diff(now))
  const days = duration.asDays()
  return days ? Math.ceil(days) : ''
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
      className={statusFristInStyle(fristDauerBisMitarbeiter(geschaeft), styles)}
    >
      {fristDauerBisMitarbeiter(geschaeft)}
    </FormControl.Static>
  </div>
)

const AreaFristen = ({
  geschaeft,
  nrOfFieldsBeforeFristen,
  change,
  blur,
  onChangeDatePicker,
  isPrintPreview,
}) => {
  const styles = isPrintPreview ? pdfStyles : regularStyles

  return (
    <div className={styles.areaFristen}>
      <div className={styles.areaFristenTitle}>
        Fristen
      </div>
      {
        !(!geschaeft.datumEingangAwel && isPrintPreview) &&
        <DateField  // eslint-disable-line react/jsx-indent
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
        <DateField  // eslint-disable-line react/jsx-indent
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
        <DateField  // eslint-disable-line react/jsx-indent
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
        <DateField  // eslint-disable-line react/jsx-indent
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
        <DateField  // eslint-disable-line react/jsx-indent
          name="fristMitarbeiter"
          label="Frist Erledigung nächster Schritt Re"
          change={change}
          blur={blur}
          onChangeDatePicker={onChangeDatePicker}
          tabIndex={5 + nrOfFieldsBeforeFristen}
        />
      }
      {!!geschaeft.fristMitarbeiter && fieldFristDauerBisMitarbeiter(geschaeft, styles)}
      {
        !(!geschaeft.datumAusgangAwel && isPrintPreview) &&
        <DateField  // eslint-disable-line react/jsx-indent
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
        <DateField  // eslint-disable-line react/jsx-indent
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
  geschaeft: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  nrOfFieldsBeforeFristen: PropTypes.number.isRequired,
  isPrintPreview: PropTypes.bool.isRequired,
}

export default AreaFristen
