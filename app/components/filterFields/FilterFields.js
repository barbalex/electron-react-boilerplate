import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import $ from 'jquery'
import styles from './filterFields.css'
import AreaGeschaeft from '../../containers/filterFields/AreaGeschaeft'
import AreaNummern from '../../containers/filterFields/AreaNummern'
import AreaFristen from '../../containers/filterFields/AreaFristen'
import AreaParlVorstoss from '../../containers/filterFields/AreaParlVorstoss'
import AreaRechtsmittel from '../../containers/filterFields/AreaRechtsmittel'
import AreaPersonen from '../../containers/filterFields/AreaPersonen'
import AreaHistory from '../../containers/filterFields/AreaHistory'
import AreaZuletztMutiert from '../../containers/filterFields/AreaZuletztMutiert'
import isDateField from '../../src/isDateField'

moment.locale('de')

class FilterFields extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    filterFields: PropTypes.arrayOf(
      PropTypes.shape({
        comparator: PropTypes.oneOf(['=', '===', '!==', '<', '>', '']),
        field: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    ).isRequired,
    geschaefteFilterByFields: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  }

  changeComparator = (value, name) => {
    const { filterFields, geschaefteFilterByFields } = this.props
    const newFilterFields = []
    let changedField = {
      comparator: '=',
      field: name,
      value: null,
    }
    if (filterFields.forEach) {
      filterFields.forEach((f) => {
        if (f.field !== name) {
          newFilterFields.push(f)
        } else {
          changedField = f
        }
      })
    }
    changedField.comparator = value
    newFilterFields.push(changedField)
    geschaefteFilterByFields(newFilterFields)
  }

  change = (e) => {
    const {
      filterFields,
      geschaefteFilterByFields,
    } = this.props
    const {
      type,
      name,
      dataset,
    } = e.target
    const newFilterFields = []
    let changedField = {
      comparator: '=',
      field: name,
      value: null,
    }
    if (filterFields.forEach) {
      filterFields.forEach((f) => {
        if (f.field !== name) {
          newFilterFields.push(f)
        } else if (f.comparator) {
          changedField = f
        }
      })
    }
    let { value } = e.target
    // console.log('FilterFields, value on change:', value)
    if (isDateField(name) && value) {
      value = moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD')
    }
    if (type === 'radio') {
      // need to set null if existing value was clicked
      if (changedField.value === dataset.value) {
        value = null
      } else {
        value = dataset.value
      }
    }
    changedField.value = value
    newFilterFields.push(changedField)
    geschaefteFilterByFields(newFilterFields)
  }

  render = () => {
    const {
      values,
      config,
    } = this.props

    const showAreaParlVorstoss = (
      values.geschaeftsart &&
      values.geschaeftsart === 'Parlament. Vorstoss'
    )
    const showAreaRechtsmittel = (
      values.geschaeftsart &&
      values.geschaeftsart === 'Rekurs/Beschwerde'
    )
    const showAreaForGeschaeftsart = (
      showAreaParlVorstoss ||
      showAreaRechtsmittel
    )

    // need width to adapt layout to differing widths
    const windowWidth = $(window).width()
    const areaFilterFieldsWidth = windowWidth - config.geschaefteColumnWidth
    const wrapperClassBaseString = (
      areaFilterFieldsWidth < 980 ?
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
    const nrOfNrFields = 14
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7
    const nrOfFieldsBeforeHistory = nrOfFieldsBeforePersonen + 3
    const nrOfFieldsBeforeZuletztMutiert = nrOfFieldsBeforeHistory + 1

    return (
      <div className={styles.scrollContainer}>
        <div className={wrapperClass}>
          <AreaGeschaeft
            firstTabIndex={wrapperClassBaseString === 'wrapperNarrow' ? nrOfNrFields : 0}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaNummern
            firstTabIndex={wrapperClassBaseString === 'wrapperNarrow' ? 0 : nrOfGFields}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          {
            showAreaParlVorstoss &&
            <AreaParlVorstoss
              firstTabIndex={nrOfFieldsBeforePv}
              change={this.change}
              changeComparator={this.changeComparator}
              values={values}
            />
          }
          {
            showAreaRechtsmittel &&
            <AreaRechtsmittel
              firstTabIndex={nrOfFieldsBeforePv}
              change={this.change}
              changeComparator={this.changeComparator}
              values={values}
            />
          }
          <AreaFristen
            firstTabIndex={nrOfFieldsBeforeFristen}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaPersonen
            firstTabIndex={nrOfFieldsBeforePersonen}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaHistory
            firstTabIndex={nrOfFieldsBeforeHistory}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaZuletztMutiert
            firstTabIndex={nrOfFieldsBeforeZuletztMutiert}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
        </div>
      </div>
    )
  }
}

export default FilterFields
