import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import $ from 'jquery'
import regularStyles from './geschaeft.css'
import pdfStyles from './geschaeftPdf.css'
import isDateField from '../../src/isDateField'
import validateDate from '../../src/validateDate'
import AreaGeschaeft from '../../containers/geschaeft/AreaGeschaeft'
import AreaNummern from '../../containers/geschaeft/AreaNummern'
import AreaFristen from '../../containers/geschaeft/AreaFristen'
import AreaParlVorstoss from '../../containers/geschaeft/AreaParlVorstoss'
import AreaRechtsmittel from '../../containers/geschaeft/AreaRechtsmittel'
import AreaPersonen from '../../containers/geschaeft/AreaPersonen'
import AreaHistory from '../../containers/geschaeft/AreaHistory'
import AreaLinks from '../../containers/geschaeft/AreaLinks'
import AreaZuletztMutiert from '../../containers/geschaeft/AreaZuletztMutiert'

moment.locale('de')

class Geschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    activeId: PropTypes.number,
    geschaefteChangeState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    isPrintPreview: PropTypes.bool.isRequired,
  }

  onChangeDatePicker = (name, e, picker) => {
    const rVal = {
      target: {
        type: 'text',
        name,
        value: picker.startDate,
      }
    }
    this.blur(rVal)
  }

  change = (e) => {
    const {
      activeId,
      geschaefteChangeState,
    } = this.props
    const {
      type,
      name,
      dataset,
    } = e.target
    let { value } = e.target
    if (type === 'radio') {
      value = dataset.value
      // blur does not occur in radio
      this.blur(e)
    }
    geschaefteChangeState(activeId, name, value)
  }

  blur = (e) => {
    const {
      activeId,
      changeGeschaeftInDb,
      geschaefteChangeState,
    } = this.props
    const {
      type,
      name,
      dataset,
    } = e.target
    let { value } = e.target
    if (type === 'radio') value = dataset.value
    if (isDateField(name)) {
      if (validateDate(value)) {
        // if correct date, save to db
        changeGeschaeftInDb(activeId, name, value)
      }
      // else: give user hint
      let value2 = ''
      if (value) value2 = moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY')
      if (value2.includes('Invalid date')) {
        value2 = value2.replace('Invalid date', 'Format: DD.MM.YYYY')
      }
      geschaefteChangeState(activeId, name, value2)
    } else {
      changeGeschaeftInDb(activeId, name, value)
    }
  }

  render = () => {
    const {
      geschaeft,
      config,
      isPrintPreview,
    } = this.props

    const styles = isPrintPreview ? pdfStyles : regularStyles

    // return immediately if no geschaeft
    const showGeschaeft = geschaeft && geschaeft.idGeschaeft
    if (!showGeschaeft) return null

    const showAreaParlVorstoss = geschaeft.geschaeftsart === 'Parlament. Vorstoss'
    const showAreaRechtsmittel = geschaeft.geschaeftsart === 'Rekurs/Beschwerde'
    const showAreaForGeschaeftsart = (
      showAreaParlVorstoss ||
      showAreaRechtsmittel
    )

    // need width to adapt layout to differing widths
    const windowWidth = $(window).width()
    const areaGeschaefteWidth = windowWidth - config.geschaefteColumnWidth
    const wrapperClassBaseString = (
      areaGeschaefteWidth < 750 && !isPrintPreview ?
      'wrapperNarrow' :
      'wrapperWide'
    )

    // layout needs to work with or without area for geschaeftsart
    const wrapperClassString = (
      showAreaForGeschaeftsart ?
      wrapperClassBaseString :
      `${wrapperClassBaseString}NoAreaForGeschaeftsart`
    )
    const wrapperClass = styles[wrapperClassString]

    // prepare tab indexes
    const nrOfGFields = 10
    const nrOfNrFields = 10
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7

    return (
      <div className={styles.scrollContainer}>
        <div className={wrapperClass}>
          <AreaGeschaeft
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={this.change}
            blur={this.blur}
          />
          <AreaNummern
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={this.change}
            blur={this.blur}
          />
          {
            showAreaParlVorstoss &&
            <AreaParlVorstoss  // eslint-disable-line react/jsx-indent
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              blur={this.blur}
            />
          }
          {
            showAreaRechtsmittel &&
            <AreaRechtsmittel  // eslint-disable-line react/jsx-indent
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              blur={this.blur}
              onChangeDatePicker={this.onChangeDatePicker}
            />
          }
          <AreaFristen
            nrOfFieldsBeforeFristen={nrOfFieldsBeforeFristen}
            change={this.change}
            blur={this.blur}
            onChangeDatePicker={this.onChangeDatePicker}
          />
          <AreaPersonen
            nrOfFieldsBeforePersonen={nrOfFieldsBeforePersonen}
            change={this.change}
            blur={this.blur}
          />
          <AreaLinks
            blur={this.blur}
            change={this.change}
          />
          <AreaHistory
            blur={this.blur}
            change={this.change}
          />
          <AreaZuletztMutiert />
        </div>
      </div>
    )
  }
}

export default Geschaeft
