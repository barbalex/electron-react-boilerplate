/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import $ from 'jquery'
import styled from 'styled-components'

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

const ScrollContainerRegular = styled.div`
  height: calc(100vh - 52px);
  overflow-y: auto;
  overflow-x: hidden;
`
const ScrollContainerPdf = styled.div`
  overflow: visible;
  height: 26cm;
`
const WrapperNarrow = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  grid-template-rows: auto;
  grid-template-areas:
    "areaNummern"
    "areaGeschaeft"
    "areaForGeschaeftsart"
    "areaFristen"
    "areaPersonen"
    "areaLinks"
    "areaHistory"
    "areaZuletztMutiert";
`
const WrapperNarrowNoAreaForGeschaeftsart = styled(WrapperNarrow)`
  grid-template-areas:
    "areaNummern"
    "areaGeschaeft"
    "areaFristen"
    "areaPersonen"
    "areaLinks"
    "areaHistory"
    "areaZuletztMutiert";
`
const WrapperWide = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 8.33333%);
  grid-template-rows: auto;
  grid-template-areas:
    "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaNummern areaNummern areaNummern areaNummern"
    "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaForGeschaeftsart areaForGeschaeftsart areaForGeschaeftsart areaForGeschaeftsart"
    "areaFristen areaFristen areaFristen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen"
    "areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks"
    "areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory"
    "areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert";
`
const WrapperPdf = styled(WrapperWide)`
  max-height: 26cm;
  overflow: hidden;
  max-width: 180mm;
  grid-template-columns: repeat(12, 15mm);
`
const WrapperWidePdf = styled(WrapperPdf)`
  grid-template-areas:
    "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaNummern areaNummern areaNummern areaNummern"
    "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaForGeschaeftsart areaForGeschaeftsart areaForGeschaeftsart areaForGeschaeftsart"
    "areaFristen areaFristen areaFristen areaFristen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen"
    "areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks"
    "areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory"
    "areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert";
`
const WrapperWideNoAreaForGeschaeftsart = styled(WrapperWide)`
  grid-template-areas:
    "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaNummern areaNummern areaNummern areaNummern"
    "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaNummern areaNummern areaNummern areaNummern"
    "areaFristen areaFristen areaFristen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen"
    "areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks"
    "areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory"
    "areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert";
`
const WrapperWideNoAreaForGeschaeftsartPdf = styled(WrapperPdf)`
    grid-template-areas:
      "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaNummern areaNummern areaNummern areaNummern"
      "areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaGeschaeft areaNummern areaNummern areaNummern areaNummern"
      "areaFristen areaFristen areaFristen areaFristen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen areaPersonen"
      "areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks areaLinks"
      "areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory areaHistory"
      "areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert areaZuletztMutiert";
`

class Geschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object.isRequired,
    activeId: PropTypes.number.isRequired,
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
      geschaeft,
      activeId,
      geschaefteChangeState,
      changeGeschaeftInDb,
    } = this.props
    const {
      type,
      name,
      dataset,
    } = e.target
    let { value } = e.target
    if (type === 'radio') {
      // need to set null if existing value was clicked
      if (geschaeft[name] === dataset.value) {
        value = null
      } else {
        value = dataset.value
      }
      // blur does not occur in radio
      changeGeschaeftInDb(activeId, name, value)
    }
    if (type === 'select-one') {
      changeGeschaeftInDb(activeId, name, value)
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
    } = e.target
    const { value } = e.target
    if (type !== 'radio' && type !== 'select-one') {
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
  }

  render = () => {
    const {
      geschaeft,
      config,
      isPrintPreview,
    } = this.props

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

    // prepare tab indexes
    const nrOfGFields = 10
    const nrOfNrFields = 13
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7
    const viewIsNarrow = areaGeschaefteWidth < 860
    let ScrollContainer = ScrollContainerRegular
    if (isPrintPreview) ScrollContainer = ScrollContainerPdf
    let Wrapper
    if (isPrintPreview) {
      if (showAreaForGeschaeftsart) {
        Wrapper = WrapperWidePdf
      } else {
        Wrapper = WrapperWideNoAreaForGeschaeftsartPdf
      }
    } else if (viewIsNarrow) {
      if (showAreaForGeschaeftsart) {
        Wrapper = WrapperNarrow
      } else {
        Wrapper = WrapperNarrowNoAreaForGeschaeftsart
      }
    } else if (showAreaForGeschaeftsart) {
      Wrapper = WrapperWide
    } else {
      Wrapper = WrapperWideNoAreaForGeschaeftsart
    }

    return (
      <ScrollContainer>
        <Wrapper isPrintPreview={isPrintPreview}>
          <AreaGeschaeft
            viewIsNarrow={viewIsNarrow}
            nrOfGFields={nrOfGFields}
            change={this.change}
            blur={this.blur}
          />
          <AreaNummern
            viewIsNarrow={viewIsNarrow}
            nrOfGFields={nrOfGFields}
            change={this.change}
            blur={this.blur}
          />
          {
            showAreaParlVorstoss &&
            <AreaParlVorstoss
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              blur={this.blur}
            />
          }
          {
            showAreaRechtsmittel &&
            <AreaRechtsmittel
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
        </Wrapper>
      </ScrollContainer>
    )
  }
}

export default Geschaeft
