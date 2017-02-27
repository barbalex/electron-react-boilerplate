import React, { PropTypes } from 'react'
import {
  FormGroup,
  InputGroup,
  FormControl,
  ControlLabel,
  Glyphicon,
} from 'react-bootstrap'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'

import styles from './dateField.css'
import getDateValidationStateDate from '../../src/getDateValidationStateDate'

moment.locale('de')

const enhance = compose(
  inject('store'),
  withProps((props) => {
    const { store, routing } = props
    const {
      activeId,
      geschaefteGefilterteIds,
      geschaefte,
      filterFields,
      filterFulltext,
    } = store.geschaefte
    const path = routing.locationBeforeTransitions.pathname
    return {
      activeId,
      geschaefteGefilterteIds,
      geschaefte,
      filterFields,
      filterFulltext,
      path,
    }
  }),
  withHandlers({
    onChange: props => size =>
      props.store.configSetKey('geschaefteColumnWidth', size),
  }),
  observer
)

const DateField = ({
  geschaeft,
  name,
  label,
  change,
  blur,
  onChangeDatePicker,
  tabIndex,
}) => {
  /**
   * need to give addon no padding
   * and the originally addon's padding to the glyphicon
   * to make entire addon clickable
   * for opening calendar
   */
  const datePickerAddonStyle = {
    padding: 0,
  }
  const datePickerCalendarStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  }

  return (
    <FormGroup
      className={styles.field}
      validationState={getDateValidationStateDate(geschaeft[name])}
    >
      <ControlLabel>
        {label}
      </ControlLabel>
      <InputGroup>
        <FormControl
          type="text"
          value={geschaeft[name] || ''}
          name={name}
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={tabIndex}
        />
        <InputGroup.Addon style={datePickerAddonStyle}>
          <DateRangePicker
            singleDatePicker
            drops="up"
            opens="left"
            onApply={onChangeDatePicker.bind(this, name)}
            className={styles.datePicker}
          >
            <Glyphicon
              glyph="calendar"
              style={datePickerCalendarStyle}
            />
          </DateRangePicker>
        </InputGroup.Addon>
      </InputGroup>
    </FormGroup>
  )
}

DateField.displayName = 'DateField'

DateField.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
}

export default enhance(DateField)
