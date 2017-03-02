import React, { PropTypes } from 'react'
import moment from 'moment'
import $ from 'jquery'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './filterFields.css'
import AreaGeschaeft from './AreaGeschaeft'
import AreaNummern from './AreaNummern'
import AreaFristen from './AreaFristen'
import AreaParlVorstoss from './AreaParlVorstoss'
import AreaRechtsmittel from './AreaRechtsmittel'
import AreaPersonen from './AreaPersonen'
import AreaHistory from './AreaHistory'
import AreaZuletztMutiert from './AreaZuletztMutiert'
import isDateField from '../../src/isDateField'

moment.locale('de')

const enhance = compose(
  inject('store'),
  withHandlers({
    changeComparator: props => (value, name) => {
      const { geschaefteFilterByFields } = props.store
      const { filterFields } = props.store.geschaefte
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
    },
    change: props => (e) => {
      const { geschaefteFilterByFields } = props.store
      const { filterFields } = props.store.geschaefte
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
    },
  }),
  observer
)

const FilterFields = ({
  store,
  changeComparator,
  change,
}) => {
  let { filterFields } = store.geschaefte
  const { config } = store.app
  // build a fields hash for the values
  const values = {}
  if (filterFields.forEach) {
    filterFields.forEach((field) => {
      values[field.field] = field.value
    })
  } else {
    filterFields = []
  }
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
          change={change}
          changeComparator={changeComparator}
          values={values}
        />
        <AreaNummern
          firstTabIndex={wrapperClassBaseString === 'wrapperNarrow' ? 0 : nrOfGFields}
          change={change}
          changeComparator={changeComparator}
          values={values}
        />
        {
          showAreaParlVorstoss &&
          <AreaParlVorstoss
            firstTabIndex={nrOfFieldsBeforePv}
            change={change}
            changeComparator={changeComparator}
            values={values}
          />
        }
        {
          showAreaRechtsmittel &&
          <AreaRechtsmittel
            firstTabIndex={nrOfFieldsBeforePv}
            change={change}
            changeComparator={changeComparator}
            values={values}
          />
        }
        <AreaFristen
          firstTabIndex={nrOfFieldsBeforeFristen}
          change={change}
          changeComparator={changeComparator}
          values={values}
        />
        <AreaPersonen
          firstTabIndex={nrOfFieldsBeforePersonen}
          change={change}
          changeComparator={changeComparator}
          values={values}
        />
        <AreaHistory
          firstTabIndex={nrOfFieldsBeforeHistory}
          change={change}
          changeComparator={changeComparator}
          values={values}
        />
        <AreaZuletztMutiert
          firstTabIndex={nrOfFieldsBeforeZuletztMutiert}
          change={change}
          changeComparator={changeComparator}
          values={values}
        />
      </div>
    </div>
  )
}

FilterFields.propTypes = {
  store: PropTypes.object.isRequired,
  changeComparator: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
}

export default enhance(FilterFields)
